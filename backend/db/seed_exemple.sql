-- EXEMPLE FICTIF, à remplacer par les vraies données.
-- Aucune UE, competence officielle ou source reelle n'est decrite ici.
-- A executer une fois, sur une base vide, apres schema.sql.

BEGIN;

INSERT INTO source (type, reference, date_consultation, notes)
VALUES (
  'maquette_pdf',
  'Maquette fictive Licence MIASHS 2026-2027.pdf',
  DATE '2026-09-01',
  'Document invente pour la demonstration. Il ne correspond a aucune maquette officielle.'
);

INSERT INTO competence (code, libelle, domaine, description)
VALUES
  ('PYTHON', 'Programmation Python', 'developpement', 'Ecriture de programmes simples en Python.'),
  ('SQL', 'Bases de données SQL', 'donnees', 'Interrogation et modelisation relationnelle elementaire.'),
  ('PROBABILITES', 'Probabilités', 'maths_stats', 'Espace de probabilite, variables aleatoires, lois usuelles.'),
  ('STATISTIQUES', 'Statistiques', 'maths_stats', 'Statistique descriptive et introduction a l''inference.'),
  ('ALGEBRE_LINEAIRE', 'Algèbre linéaire', 'maths_stats', 'Matrices, systemes lineaires, espaces vectoriels.'),
  ('ECONOMETRIE', 'Économétrie', 'maths_stats', 'Modele lineaire applique a des donnees economiques.'),
  ('ALGORITHMIQUE', 'Algorithmique', 'developpement', 'Complexite, structures de donnees et algorithmes de base.');

-- source_id pointe vers l'unique source fictive inseree ci-dessus.
INSERT INTO ue (code, nom, semestre, ects, obligatoire, annee_maquette, source_id)
SELECT v.code, v.nom, v.semestre, v.ects, v.obligatoire, v.annee_maquette, s.id
FROM source AS s
CROSS JOIN (
  VALUES
    ('INF-S1-PROG'::TEXT, 'Introduction à la programmation'::TEXT, 1::SMALLINT, 6.0::NUMERIC(3, 1), TRUE, '2026-2027'::TEXT),
    ('MAT-S1-ALG', 'Algèbre linéaire', 1, 6.0, TRUE, '2026-2027'),
    ('MAT-S2-PROBA', 'Probabilités', 2, 6.0, TRUE, '2026-2027'),
    ('INF-S2-BDD', 'Bases de données SQL', 2, 3.0, TRUE, '2026-2027'),
    -- Code officiel volontairement inconnu.
    (NULL, 'Algorithmique', 2, 6.0, TRUE, '2026-2027'),
    ('MAT-S3-STAT', 'Statistiques', 3, 6.0, TRUE, '2026-2027'),
    ('ECO-S3-METR', 'Introduction à l''économétrie', 3, 6.0, TRUE, '2026-2027'),
    ('LAN-S1-ANG', 'Anglais', 1, 3.0, FALSE, '2026-2027')
) AS v (code, nom, semestre, ects, obligatoire, annee_maquette)
WHERE s.reference = 'Maquette fictive Licence MIASHS 2026-2027.pdf';

-- Anglais n'a pas de ligne ici : cette UE fictive ne developpe aucune competence du referentiel d'exemple.
INSERT INTO ue_competence (ue_id, competence_id, niveau, confiance, source_id)
SELECT u.id, c.id, v.niveau, v.confiance, s.id
FROM (
  VALUES
    ('Introduction à la programmation', 'PYTHON', 1::SMALLINT, 'fiche_officielle'),
    ('Algèbre linéaire', 'ALGEBRE_LINEAIRE', 2, 'fiche_officielle'),
    ('Probabilités', 'PROBABILITES', 2, 'confirme_responsable'),
    ('Bases de données SQL', 'SQL', 2, 'fiche_officielle'),
    ('Algorithmique', 'ALGORITHMIQUE', 2, 'fiche_officielle'),
    ('Algorithmique', 'PYTHON', 1, 'confirme_responsable'),
    ('Statistiques', 'STATISTIQUES', 2, 'fiche_officielle'),
    ('Introduction à l''économétrie', 'ECONOMETRIE', 1, 'confirme_responsable')
) AS v (ue_nom, competence_code, niveau, confiance)
JOIN ue AS u
  ON u.nom = v.ue_nom
 AND u.annee_maquette = '2026-2027'
JOIN competence AS c
  ON c.code = v.competence_code
JOIN source AS s
  ON s.reference = 'Maquette fictive Licence MIASHS 2026-2027.pdf';

-- Estimations : la source peut etre absente.
INSERT INTO ue_competence (ue_id, competence_id, niveau, confiance, source_id)
SELECT u.id, c.id, v.niveau, 'estimation', NULL
FROM (
  VALUES
    ('Introduction à la programmation', 'ALGORITHMIQUE', 1::SMALLINT),
    ('Probabilités', 'STATISTIQUES', 1),
    ('Statistiques', 'PROBABILITES', 2),
    ('Introduction à l''économétrie', 'STATISTIQUES', 2),
    ('Introduction à l''économétrie', 'ALGEBRE_LINEAIRE', 1)
) AS v (ue_nom, competence_code, niveau)
JOIN ue AS u
  ON u.nom = v.ue_nom
 AND u.annee_maquette = '2026-2027'
JOIN competence AS c
  ON c.code = v.competence_code;

COMMIT;
