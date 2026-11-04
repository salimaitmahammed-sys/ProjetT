CREATE TABLE source (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  reference TEXT NOT NULL,
  date_consultation DATE NOT NULL,
  notes TEXT,
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

CREATE TABLE competence (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  libelle TEXT NOT NULL,
  domaine TEXT NOT NULL,
  description TEXT,
  CONSTRAINT competence_code_unique UNIQUE (code),
  CONSTRAINT competence_domaine_valide CHECK (
    domaine IN ('developpement', 'donnees', 'maths_stats', 'transversal')
  )
);

CREATE TABLE ue (
  id SERIAL PRIMARY KEY,
  code TEXT,
  nom TEXT NOT NULL,
  semestre SMALLINT NOT NULL,
  obligatoire BOOLEAN NOT NULL DEFAULT TRUE,
  annee_maquette TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT ue_code_unique UNIQUE (code),
  CONSTRAINT ue_nom_annee_unique UNIQUE (nom, annee_maquette),
  CONSTRAINT ue_semestre_valide CHECK (semestre BETWEEN 1 AND 6),
  CONSTRAINT ue_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL
);

CREATE TABLE ue_competence (
  ue_id INTEGER NOT NULL,
  competence_id INTEGER NOT NULL,
  niveau SMALLINT,
  confiance TEXT NOT NULL,
  source_id INTEGER,
  CONSTRAINT ue_competence_pkey PRIMARY KEY (ue_id, competence_id),
  CONSTRAINT ue_competence_ue_id_fkey
    FOREIGN KEY (ue_id) REFERENCES ue (id) ON DELETE CASCADE,
  CONSTRAINT ue_competence_competence_id_fkey
    FOREIGN KEY (competence_id) REFERENCES competence (id) ON DELETE CASCADE,
  CONSTRAINT ue_competence_source_id_fkey
    FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE SET NULL,
  CONSTRAINT ue_competence_niveau_valide CHECK (
    niveau IS NULL OR niveau BETWEEN 1 AND 3
  ),
  CONSTRAINT ue_competence_confiance_valide CHECK (
    confiance IN ('fiche_officielle', 'confirme_responsable', 'estimation')
  ),
  CONSTRAINT ue_competence_source_si_confirme CHECK (
    (
      confiance IN ('fiche_officielle', 'confirme_responsable')
      AND source_id IS NOT NULL
    )
    OR confiance = 'estimation'
  )
);

CREATE INDEX ue_competence_competence_id_idx ON ue_competence (competence_id);

CREATE TABLE etablissement (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  sigle TEXT NOT NULL,
  CONSTRAINT etablissement_sigle_unique UNIQUE (sigle)
);

ALTER TABLE ue
  ADD COLUMN etablissement_id INTEGER,
  ADD CONSTRAINT ue_etablissement_id_fkey
    FOREIGN KEY (etablissement_id) REFERENCES etablissement (id) ON DELETE SET NULL;

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

CREATE TABLE parcours_personnalise (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  parcours_id INTEGER NOT NULL,
  CONSTRAINT parcours_personnalise_parcours_id_fkey
    FOREIGN KEY (parcours_id) REFERENCES parcours (id)
);

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
  CONSTRAINT parcours_personnalise_ue_retenue_coherente CHECK (
    (retenue AND statut IN ('acquis', 'en_cours'))
    OR (NOT retenue AND statut = 'non_suivi' AND note IS NULL)
  )
);

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
