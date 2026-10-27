-- CapMaster — cote Licence.
-- Quatre tables seulement : source, competence, ue, ue_competence.
-- Les tables Master (master, regle_prerequis, regle_competence) seront ajoutees plus tard.
-- Aucune table etudiant : le diagnostic v1 se calcule a la volee, sans donnee personnelle.
-- On stocke des competences, jamais une comparaison de noms d'UE.
-- Chaque lien UE-competence reste tracable (source + confiance). Le calcul applicatif est deterministe.

-- ---------------------------------------------------------------------------
-- source
-- Origine d'une information : page officielle, syllabus, maquette, mail, etc.
-- ---------------------------------------------------------------------------
CREATE TABLE source (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  reference TEXT NOT NULL,
  date_consultation DATE NOT NULL,
  notes TEXT,
  -- Liste fermee : une source hors de ces types n'est pas exploitable telle quelle.
  CONSTRAINT source_type_valide CHECK (
    type IN (
      'page_officielle',
      'syllabus',
      'maquette_pdf',
      'mail_responsable',
      'monmaster',
      'rncp',
      'autre'
    )
  )
);

COMMENT ON TABLE source IS
  'Origine tracable d''une information (page, syllabus, maquette, mail, MonMaster, RNCP).';

COMMENT ON CONSTRAINT source_type_valide ON source IS
  'Le type de source est limite aux valeurs convenues par l''equipe.';

-- ---------------------------------------------------------------------------
-- competence
-- Referentiel commun, une trentaine de libelles au maximum.
-- Tout le monde utilise exactement les memes codes et libelles.
-- ---------------------------------------------------------------------------
CREATE TABLE competence (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  libelle TEXT NOT NULL,
  domaine TEXT NOT NULL,
  description TEXT,
  CONSTRAINT competence_code_unique UNIQUE (code),
  -- Le domaine sert a regrouper le graphe. Une valeur libre casserait la comparaison.
  CONSTRAINT competence_domaine_valide CHECK (
    domaine IN ('developpement', 'donnees', 'maths_stats', 'transversal')
  )
);

COMMENT ON TABLE competence IS
  'Referentiel commun de competences. Les libelles sont fixes et partages.';

COMMENT ON CONSTRAINT competence_code_unique ON competence IS
  'Le code (ex. SQL, PROBABILITES) identifie une competence de facon stable.';

COMMENT ON CONSTRAINT competence_domaine_valide ON competence IS
  'Domaine limite a developpement, donnees, maths_stats ou transversal.';

-- ---------------------------------------------------------------------------
-- ue
-- Unite d'enseignement de la Licence MIASHS, pour une annee de maquette.
-- La meme UE peut changer d'une annee a l'autre : l'annee fait partie de l'identite.
-- ---------------------------------------------------------------------------
CREATE TABLE ue (
  id SERIAL PRIMARY KEY,
  -- NULL autorise : le code officiel n'est pas toujours connu.
  -- UNIQUE en PostgreSQL accepte plusieurs NULL, donc plusieurs UE sans code coexistent.
  code TEXT,
  nom TEXT NOT NULL,
  semestre SMALLINT NOT NULL,
  ects NUMERIC(3, 1) NOT NULL,
  obligatoire BOOLEAN NOT NULL DEFAULT TRUE,
  annee_maquette TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT ue_code_unique UNIQUE (code),
  -- Le nom seul ne suffit pas : « Probabilites » de 2025-2026 et de 2026-2027 sont deux lignes.
  CONSTRAINT ue_nom_annee_unique UNIQUE (nom, annee_maquette),
  CONSTRAINT ue_semestre_valide CHECK (semestre BETWEEN 1 AND 6),
  -- NUMERIC(3,1) va jusqu'a 99.9. On refuse 0 et les valeurs negatives.
  CONSTRAINT ue_ects_positif CHECK (ects > 0),
  CONSTRAINT ue_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL
);

COMMENT ON TABLE ue IS
  'Unite d''enseignement de la Licence MIASHS, rattachee a une annee de maquette.';

COMMENT ON CONSTRAINT ue_code_unique ON ue IS
  'Code officiel unique lorsqu''il est connu. Plusieurs NULL restent possibles.';

COMMENT ON CONSTRAINT ue_nom_annee_unique ON ue IS
  'Une UE est unique par nom et annee de maquette, pas par son nom seul.';

COMMENT ON CONSTRAINT ue_semestre_valide ON ue IS
  'Semestre de Licence : 1 a 6.';

COMMENT ON CONSTRAINT ue_ects_positif ON ue IS
  'Les ECTS sont strictement positifs.';

COMMENT ON CONSTRAINT ue_source_id_fkey ON ue IS
  'Si la source est supprimee, l''UE reste et source_id passe a NULL.';

-- ---------------------------------------------------------------------------
-- ue_competence
-- Correspondance remplie a la main : quelles competences une UE developpe.
-- Ce n'est pas une decision d'IA. niveau est indicatif (1 notions, 2 autonome, 3 confirme).
-- ---------------------------------------------------------------------------
CREATE TABLE ue_competence (
  ue_id INTEGER NOT NULL,
  competence_id INTEGER NOT NULL,
  niveau SMALLINT,
  confiance TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT ue_competence_pkey PRIMARY KEY (ue_id, competence_id),
  -- CASCADE : un lien n'a pas de sens sans son UE ou sans sa competence.
  CONSTRAINT ue_competence_ue_id_fkey
    FOREIGN KEY (ue_id) REFERENCES ue (id) ON DELETE CASCADE,
  CONSTRAINT ue_competence_competence_id_fkey
    FOREIGN KEY (competence_id) REFERENCES competence (id) ON DELETE CASCADE,
  -- SET NULL : on ne detruit pas le lien si la source disparait.
  -- La contrainte ue_competence_source_si_confirme peut toutefois refuser
  -- cette mise a NULL quand la confiance exige une source.
  CONSTRAINT ue_competence_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL,
  -- NULL est accepte : CHECK ne rejette que FALSE, pas UNKNOWN.
  -- Un niveau renseigne doit etre 1 (notions), 2 (autonome) ou 3 (confirme).
  CONSTRAINT ue_competence_niveau_valide CHECK (
    niveau IS NULL OR niveau BETWEEN 1 AND 3
  ),
  CONSTRAINT ue_competence_confiance_valide CHECK (
    confiance IN ('fiche_officielle', 'confirme_responsable', 'estimation')
  ),
  -- Tracabilite : une fiche officielle ou une confirmation de responsable
  -- doit citer une source. Une estimation peut rester sans source.
  CONSTRAINT ue_competence_source_si_confirme CHECK (
    (
      confiance IN ('fiche_officielle', 'confirme_responsable')
      AND source_id IS NOT NULL
    )
    OR confiance = 'estimation'
  )
);

-- La cle primaire commence par ue_id. Elle ne sert pas les requetes
-- « quelles UE couvrent cette competence ? ». Cet index couvre ce sens.
CREATE INDEX ue_competence_competence_id_idx ON ue_competence (competence_id);

COMMENT ON TABLE ue_competence IS
  'Lien manuel entre une UE et une competence, avec niveau et confiance.';

COMMENT ON CONSTRAINT ue_competence_niveau_valide ON ue_competence IS
  'Niveau facultatif : 1 notions, 2 autonome, 3 confirme.';

COMMENT ON CONSTRAINT ue_competence_confiance_valide ON ue_competence IS
  'Confiance limitee a fiche_officielle, confirme_responsable ou estimation.';

COMMENT ON CONSTRAINT ue_competence_source_si_confirme ON ue_competence IS
  'fiche_officielle et confirme_responsable exigent une source. estimation peut s''en passer.';

COMMENT ON INDEX ue_competence_competence_id_idx IS
  'Accelere la recherche des UE qui couvrent une competence.';

-- ---------------------------------------------------------------------------
-- Requete de controle
-- Pour une UE donnee, liste ses competences et le niveau de confiance du lien.
-- Remplacer le nom et l'annee de maquette.
-- ---------------------------------------------------------------------------
-- SELECT
--   u.nom,
--   u.annee_maquette,
--   c.code,
--   c.libelle,
--   uc.niveau,
--   uc.confiance
-- FROM ue AS u
-- JOIN ue_competence AS uc ON uc.ue_id = u.id
-- JOIN competence AS c ON c.id = uc.competence_id
-- WHERE u.nom = 'Bases de données SQL'
--   AND u.annee_maquette = '2026-2027'
-- ORDER BY c.code;
