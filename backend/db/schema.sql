-- CapMaster — modele V1, treize tables.
-- Licence : source, competence, ue, ue_competence.
-- Maquette : etablissement, parcours, ue_parcours.
-- Masters : master, regle_prerequis, regle_competence.
-- Profil modifiable : parcours_personnalise, parcours_personnalise_ue,
-- parcours_personnalise_competence.
-- Pas de compte etudiant : le profil est un exemple, sans nom ni identite.
-- On stocke des competences, jamais une comparaison de noms d'UE.
-- Chaque lien reste tracable (source + confiance). Le calcul est deterministe.

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
      'declaration_etudiant',
      'autre'
    )
  )
);

COMMENT ON TABLE source IS
  'Origine tracable d''une information (page, syllabus, maquette, mail, MonMaster, RNCP, declaration etudiant).';

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
-- etablissement
-- Une universite. La V1 n'en remplit qu'une, l'UT2J. La V2 ajoute des lignes.
-- ---------------------------------------------------------------------------
CREATE TABLE etablissement (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  sigle TEXT NOT NULL,
  CONSTRAINT etablissement_sigle_unique UNIQUE (sigle)
);

COMMENT ON TABLE etablissement IS
  'Universite qui porte une licence ou un master.';

COMMENT ON CONSTRAINT etablissement_sigle_unique ON etablissement IS
  'Le sigle (UT2J, UT1, UT3) identifie l''etablissement.';

-- Une UE appartient a une universite. NULL reste possible pour les lignes
-- d'exemple deja chargees avant cette colonne.
ALTER TABLE ue
  ADD COLUMN etablissement_id INTEGER,
  ADD CONSTRAINT ue_etablissement_id_fkey
    FOREIGN KEY (etablissement_id) REFERENCES etablissement (id) ON DELETE SET NULL;

COMMENT ON CONSTRAINT ue_etablissement_id_fkey ON ue IS
  'Si l''etablissement est supprime, l''UE reste et etablissement_id passe a NULL.';

-- ---------------------------------------------------------------------------
-- parcours
-- Tronc commun ou parcours de la licence, pour une annee de maquette.
-- ---------------------------------------------------------------------------
CREATE TABLE parcours (
  id SERIAL PRIMARY KEY,
  etablissement_id INTEGER NOT NULL,
  nom TEXT NOT NULL,
  nature TEXT NOT NULL,
  annee_maquette TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT parcours_identite_unique UNIQUE (etablissement_id, nom, annee_maquette),
  CONSTRAINT parcours_nature_valide CHECK (
    nature IN ('tronc_commun', 'parcours')
  ),
  CONSTRAINT parcours_etablissement_id_fkey
    FOREIGN KEY (etablissement_id) REFERENCES etablissement (id),
  CONSTRAINT parcours_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL
);

COMMENT ON TABLE parcours IS
  'Tronc commun ou parcours officiel d''une licence, pour une annee de maquette.';

COMMENT ON CONSTRAINT parcours_nature_valide ON parcours IS
  'nature vaut tronc_commun ou parcours.';

-- ---------------------------------------------------------------------------
-- ue_parcours
-- UE proposees par un parcours. C'est ce lien qui preremplit le profil.
-- ---------------------------------------------------------------------------
CREATE TABLE ue_parcours (
  parcours_id INTEGER NOT NULL,
  ue_id INTEGER NOT NULL,
  statut TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT ue_parcours_pkey PRIMARY KEY (parcours_id, ue_id),
  CONSTRAINT ue_parcours_parcours_id_fkey
    FOREIGN KEY (parcours_id) REFERENCES parcours (id) ON DELETE CASCADE,
  CONSTRAINT ue_parcours_ue_id_fkey
    FOREIGN KEY (ue_id) REFERENCES ue (id) ON DELETE CASCADE,
  CONSTRAINT ue_parcours_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL,
  CONSTRAINT ue_parcours_statut_valide CHECK (
    statut IN ('obligatoire', 'option')
  )
);

CREATE INDEX ue_parcours_ue_id_idx ON ue_parcours (ue_id);

COMMENT ON TABLE ue_parcours IS
  'UE rattachee a un parcours officiel, en obligatoire ou en option.';

COMMENT ON CONSTRAINT ue_parcours_statut_valide ON ue_parcours IS
  'statut vaut obligatoire ou option.';

-- ---------------------------------------------------------------------------
-- master
-- Formation visee. Le nom distingue deux MIAGE de deux universites.
-- ---------------------------------------------------------------------------
CREATE TABLE master (
  id SERIAL PRIMARY KEY,
  etablissement_id INTEGER NOT NULL,
  nom TEXT NOT NULL,
  annee_maquette TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT master_identite_unique UNIQUE (etablissement_id, nom, annee_maquette),
  CONSTRAINT master_etablissement_id_fkey
    FOREIGN KEY (etablissement_id) REFERENCES etablissement (id),
  CONSTRAINT master_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL
);

COMMENT ON TABLE master IS
  'Master vise, rattache a une universite et a une annee.';

-- ---------------------------------------------------------------------------
-- regle_prerequis
-- Phrase officielle gardee telle quelle. Le Match% ne lit pas cette phrase :
-- il lit les lignes de regle_competence qui en sont tirees.
-- ---------------------------------------------------------------------------
CREATE TABLE regle_prerequis (
  id SERIAL PRIMARY KEY,
  master_id INTEGER NOT NULL,
  citation TEXT NOT NULL,
  portee TEXT NOT NULL,
  confiance TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT regle_prerequis_master_id_fkey
    FOREIGN KEY (master_id) REFERENCES master (id) ON DELETE CASCADE,
  CONSTRAINT regle_prerequis_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL,
  CONSTRAINT regle_prerequis_portee_valide CHECK (
    portee IN ('exigence', 'souhait', 'critere_dossier')
  ),
  CONSTRAINT regle_prerequis_confiance_valide CHECK (
    confiance IN ('fiche_officielle', 'confirme_responsable', 'estimation')
  ),
  CONSTRAINT regle_prerequis_source_si_confirme CHECK (
    (
      confiance IN ('fiche_officielle', 'confirme_responsable')
      AND source_id IS NOT NULL
    )
    OR confiance = 'estimation'
  )
);

COMMENT ON TABLE regle_prerequis IS
  'Citation officielle d''un attendu de master, sans la reecrire.';

COMMENT ON CONSTRAINT regle_prerequis_portee_valide ON regle_prerequis IS
  'exigence et souhait entrent dans le diagnostic. critere_dossier en reste dehors.';

COMMENT ON CONSTRAINT regle_prerequis_source_si_confirme ON regle_prerequis IS
  'fiche_officielle et confirme_responsable exigent une source. estimation peut s''en passer.';

-- ---------------------------------------------------------------------------
-- regle_competence
-- Competence de la grille commune exigee ou souhaitee par un master.
-- Une competence n'apparait qu'une fois par master.
-- ---------------------------------------------------------------------------
CREATE TABLE regle_competence (
  id SERIAL PRIMARY KEY,
  master_id INTEGER NOT NULL,
  competence_id INTEGER NOT NULL,
  regle_prerequis_id INTEGER,
  portee TEXT NOT NULL,
  confiance TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT regle_competence_master_competence_unique UNIQUE (master_id, competence_id),
  CONSTRAINT regle_competence_master_id_fkey
    FOREIGN KEY (master_id) REFERENCES master (id) ON DELETE CASCADE,
  CONSTRAINT regle_competence_competence_id_fkey
    FOREIGN KEY (competence_id) REFERENCES competence (id) ON DELETE CASCADE,
  CONSTRAINT regle_competence_regle_prerequis_id_fkey
    FOREIGN KEY (regle_prerequis_id) REFERENCES regle_prerequis (id) ON DELETE SET NULL,
  CONSTRAINT regle_competence_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL,
  CONSTRAINT regle_competence_portee_valide CHECK (
    portee IN ('exigee', 'souhaitee')
  ),
  CONSTRAINT regle_competence_confiance_valide CHECK (
    confiance IN ('fiche_officielle', 'confirme_responsable', 'estimation')
  ),
  CONSTRAINT regle_competence_source_si_confirme CHECK (
    (
      confiance IN ('fiche_officielle', 'confirme_responsable')
      AND source_id IS NOT NULL
    )
    OR confiance = 'estimation'
  )
);

CREATE INDEX regle_competence_competence_id_idx ON regle_competence (competence_id);

COMMENT ON TABLE regle_competence IS
  'Competence de la grille attendue par un master. C''est cette table que le Match% lit.';

COMMENT ON CONSTRAINT regle_competence_portee_valide ON regle_competence IS
  'exigee compte dans le Match%. souhaitee est affichee sans le faire baisser.';

COMMENT ON CONSTRAINT regle_competence_source_si_confirme ON regle_competence IS
  'fiche_officielle et confirme_responsable exigent une source. estimation peut s''en passer.';

-- ---------------------------------------------------------------------------
-- parcours_personnalise
-- Selection partie d'un parcours officiel. Pas d'identite d'etudiant.
-- ---------------------------------------------------------------------------
CREATE TABLE parcours_personnalise (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  parcours_id INTEGER NOT NULL,
  CONSTRAINT parcours_personnalise_parcours_id_fkey
    FOREIGN KEY (parcours_id) REFERENCES parcours (id)
);

COMMENT ON TABLE parcours_personnalise IS
  'Profil construit a partir d''un parcours officiel, sans nom d''etudiant.';

-- ---------------------------------------------------------------------------
-- parcours_personnalise_ue
-- UE gardees ou retirees par rapport au preremplissage.
-- ---------------------------------------------------------------------------
CREATE TABLE parcours_personnalise_ue (
  parcours_personnalise_id INTEGER NOT NULL,
  ue_id INTEGER NOT NULL,
  retenue BOOLEAN NOT NULL,
  note NUMERIC(4, 2),
  statut TEXT NOT NULL,
  CONSTRAINT parcours_personnalise_ue_pkey
    PRIMARY KEY (parcours_personnalise_id, ue_id),
  CONSTRAINT parcours_personnalise_ue_profil_fkey
    FOREIGN KEY (parcours_personnalise_id) REFERENCES parcours_personnalise (id) ON DELETE CASCADE,
  CONSTRAINT parcours_personnalise_ue_ue_id_fkey
    FOREIGN KEY (ue_id) REFERENCES ue (id) ON DELETE CASCADE,
  CONSTRAINT parcours_personnalise_ue_note_valide CHECK (
    note IS NULL OR (note >= 0 AND note <= 20)
  ),
  CONSTRAINT parcours_personnalise_ue_statut_valide CHECK (
    statut IN ('acquis', 'en_cours', 'non_suivi')
  ),
  -- Une UE retiree n'est pas acquise. Une UE gardee a un statut de suivi.
  CONSTRAINT parcours_personnalise_ue_retenue_coherente CHECK (
    (retenue AND statut IN ('acquis', 'en_cours'))
    OR (NOT retenue AND statut = 'non_suivi' AND note IS NULL)
  )
);

COMMENT ON TABLE parcours_personnalise_ue IS
  'UE gardee ou retiree dans un profil, avec un statut et une note facultative.';

COMMENT ON CONSTRAINT parcours_personnalise_ue_retenue_coherente ON parcours_personnalise_ue IS
  'Une UE retenue est acquise ou en cours. Une UE retiree est non suivie, sans note.';

-- ---------------------------------------------------------------------------
-- parcours_personnalise_competence
-- Competence declaree en dehors de la maquette. Elle doit deja exister
-- dans la grille commune : une competence hors grille n'entre pas dans le Match%.
-- ---------------------------------------------------------------------------
CREATE TABLE parcours_personnalise_competence (
  parcours_personnalise_id INTEGER NOT NULL,
  competence_id INTEGER NOT NULL,
  confiance TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT parcours_personnalise_competence_pkey
    PRIMARY KEY (parcours_personnalise_id, competence_id),
  CONSTRAINT parcours_personnalise_competence_profil_fkey
    FOREIGN KEY (parcours_personnalise_id) REFERENCES parcours_personnalise (id) ON DELETE CASCADE,
  CONSTRAINT parcours_personnalise_competence_competence_id_fkey
    FOREIGN KEY (competence_id) REFERENCES competence (id) ON DELETE CASCADE,
  CONSTRAINT parcours_personnalise_competence_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL,
  CONSTRAINT parcours_personnalise_competence_confiance_valide CHECK (
    confiance IN ('fiche_officielle', 'confirme_responsable', 'estimation')
  ),
  CONSTRAINT parcours_personnalise_competence_source_si_confirme CHECK (
    (
      confiance IN ('fiche_officielle', 'confirme_responsable')
      AND source_id IS NOT NULL
    )
    OR confiance = 'estimation'
  )
);

COMMENT ON TABLE parcours_personnalise_competence IS
  'Competence de la grille declaree hors maquette, avec source et confiance.';

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
