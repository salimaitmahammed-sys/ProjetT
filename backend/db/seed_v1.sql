-- Remplissage V1.
-- Licence : catalogues UT2J 2021-2026, Informatique-SHS et Mathematiques-SHS.
-- S1 et S2 sont le tronc commun. Chaque parcours les reprend, puis ses UE de S3 a S6.
-- MISH304T garde l'intitule du catalogue informatique. Le catalogue mathematiques ecrit
-- « Sociologie et Numerique » pour le meme code.
-- Une competence est en fiche_officielle seulement si l'intitule ou l'attendu la nomme.
-- L'optimisation est reliee a la recherche operationnelle en estimation.
-- Masters : ICE-LD, ISM-AG, MIAGE UT Capitole, MIAGE UT3.
-- La Mineure Professorat des ecoles est nommee dans le catalogue, sans liste d'UE.
-- Ne pas executer seed_exemple.sql sur la meme base : ce sont des UE fictives.

BEGIN;

INSERT INTO source (type, reference, date_consultation, notes) VALUES (
  'maquette_pdf',
  'Catalogue Licence 2021-2026, MIASHS parcours Informatique-SHS, UT2J, 03/02/2023',
  DATE '2026-11-04',
  'Fichier local : Catalogue Licence 2021-2026 - miashs - informatique-shs.pdf'
);

INSERT INTO etablissement (nom, sigle) VALUES
  ('Université Toulouse - Jean Jaurès', 'UT2J');

INSERT INTO competence (code, libelle, domaine, description) VALUES
  ('PROGRAMMATION', 'Programmation', 'developpement', 'Le mot programmation figure dans l''intitule.'),
  ('PROGRAMMATION_OBJET', 'Programmation orientée objet', 'developpement', 'Programmation orientée objet nommée dans l''intitulé.'),
  ('DEVELOPPEMENT', 'Développement logiciel', 'developpement', 'Développement logiciel nommé dans l''intitulé.'),
  ('ALGORITHMIQUE', 'Algorithmique', 'developpement', 'Algorithmique nommée dans l''intitulé.'),
  ('BASES_DE_DONNEES', 'Bases de données', 'donnees', 'Bases de données nommées dans l''intitulé.'),
  ('STATISTIQUE', 'Statistique', 'maths_stats', 'Statistique nommée dans l''intitulé.'),
  ('PROBABILITES', 'Probabilités', 'maths_stats', 'Probabilités nommées dans l''intitulé.'),
  ('ALGEBRE', 'Algèbre', 'maths_stats', 'Algèbre ou calcul algébrique nommé dans l''intitulé.'),
  ('INTELLIGENCE_ARTIFICIELLE', 'Intelligence artificielle', 'developpement', 'IA nommée dans l''intitulé.'),
  ('GRAPHES', 'Graphes', 'developpement', 'Graphes nommés dans l''intitulé.'),
  ('SYSTEMES', 'Systèmes', 'developpement', 'Système d''exploitation ou programmation système nommé dans l''intitulé.'),
  ('RESEAUX', 'Réseaux', 'developpement', 'Réseau nommé dans l''intitulé.'),
  ('CRYPTOGRAPHIE', 'Cryptographie', 'maths_stats', 'Cryptographie nommée dans l''intitulé.');

INSERT INTO parcours (etablissement_id, nom, nature, annee_maquette, source_id)
SELECT e.id, v.nom, v.nature, '2021-2026', s.id
FROM etablissement e
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Informatique-SHS, UT2J, 03/02/2023'
JOIN (VALUES
  ('Tronc commun', 'tronc_commun'),
  ('Informatique-SHS', 'parcours')
) AS v(nom, nature) ON TRUE
WHERE e.sigle = 'UT2J';

INSERT INTO ue (code, nom, semestre, ects, obligatoire, annee_maquette, source_id, etablissement_id)
SELECT v.code, v.nom, v.semestre, v.ects, v.obligatoire, '2021-2026', s.id, e.id
FROM source s
JOIN etablissement e ON e.sigle = 'UT2J'
JOIN (VALUES
  ('MI0A101T', 'Bases de données : modélisation et interrogation', 1::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0B101T', 'Calcul algébrique', 1::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0A102T', 'Statistique descriptive', 1::SMALLINT, 2::NUMERIC(3,1), TRUE),
  ('MI0B102T', 'Fonctions réelles', 1::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('GSMI103T', 'Comptabilité générale', 1::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('GSMI104T', 'Introduction à la gestion des organisations', 1::SMALLINT, 2::NUMERIC(3,1), TRUE),
  ('MI0A105T', 'Bases de l''algorithmique et de la programmation / Méthodologie', 1::SMALLINT, 4::NUMERIC(3,1), TRUE),
  (NULL, 'Langue vivante ou option (S1)', 1::SMALLINT, 3::NUMERIC(3,1), FALSE),
  ('MI0A201T', 'Concepts et mécanismes généraux / Algorithmique-Programmation', 2::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0B201T', 'Algèbre linéaire dans le plan et dans l''espace', 2::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0A202T', 'Etude locale de fonctions', 2::SMALLINT, 3::NUMERIC(3,1), TRUE),
  ('MI0B202T', 'Bases de données : normalisation et implémentation', 2::SMALLINT, 3::NUMERIC(3,1), TRUE),
  ('GSMI203T', 'De la comptabilité à la gestion financière', 2::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MISH204T', 'L''objectivation sociologique', 2::SMALLINT, 3::NUMERIC(3,1), TRUE),
  ('MI0A205T', 'Statistique descriptive - études de cas', 2::SMALLINT, 3::NUMERIC(3,1), TRUE),
  (NULL, 'Langue vivante ou option (S2)', 2::SMALLINT, 3::NUMERIC(3,1), FALSE),
  ('MI0A301T', 'Algorithmique-Programmation et bases de données avancées', 3::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0C301T', 'Structures de données et récursivité / Client Web', 3::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0C302T', 'Arithmétique des entiers et des polynômes', 3::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0A303T', 'Probabilités', 3::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MISH304T', 'Géographie des populations / Réseaux et Numérique', 3::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0C305T', 'Système d''exploitation / Réseau / Architecture des ordinateurs', 3::SMALLINT, 4::NUMERIC(3,1), TRUE),
  (NULL, 'Langue vivante ou option (S3)', 3::SMALLINT, 3::NUMERIC(3,1), FALSE),
  ('PIX0307T', 'Préparation à la certification informatique – partie 1', 3::SMALLINT, 2::NUMERIC(3,1), FALSE),
  ('MI0A401T', 'Ingénierie des systèmes interactifs / Programmation Web', 4::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0C401T', 'Programmation orientée objet', 4::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0C402T', 'Algèbre linéaire sur les réels et sur un corps fini', 4::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0A403T', 'Statistique inférentielle / Projet informatique-statistique', 4::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MISH404T', 'Développement et mondialisation / Introduction à l''étude du langage', 4::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0B404T', 'Professionnalisation', 4::SMALLINT, 1::NUMERIC(3,1), TRUE),
  ('MI0C405T', 'Introduction à l''IA / Projet Informatique-SHS', 4::SMALLINT, 4::NUMERIC(3,1), TRUE),
  (NULL, 'Langue vivante ou option (S4)', 4::SMALLINT, 3::NUMERIC(3,1), FALSE),
  ('PIX0407T', 'Préparation à la certification informatique – partie 2', 4::SMALLINT, 2::NUMERIC(3,1), FALSE),
  ('MI0C501T', 'Aspects statiques et dynamiques des langages', 5::SMALLINT, 6::NUMERIC(3,1), TRUE),
  ('MI0C502T', 'Développement logiciel - conception', 5::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0A503T', 'Statistique exploratoire multidimensionnelle', 5::SMALLINT, 6::NUMERIC(3,1), TRUE),
  ('MISH504T', 'Traitement automatique des langues / Enquête quantitative', 5::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0C505T', 'Développement logiciel - vérification', 5::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MIAN506T', 'Anglais', 5::SMALLINT, 3::NUMERIC(3,1), FALSE),
  ('MI0C601T', 'Cryptographie et codes correcteurs', 6::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0D601T', 'Programmation web et mobile / Projet humanités numériques', 6::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MI0C602T', 'Théorie des langages / Graphes / Complexité', 6::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0C603T', 'Programmation système et réseau', 6::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MISH604T', 'Management de l''organisation / Enquête qualitative', 6::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0C605T', 'Stage', 6::SMALLINT, 4::NUMERIC(3,1), TRUE),
  ('MIAN606T', 'Anglais (S6)', 6::SMALLINT, 3::NUMERIC(3,1), FALSE)
) AS v(code, nom, semestre, ects, obligatoire) ON TRUE
WHERE s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Informatique-SHS, UT2J, 03/02/2023';

INSERT INTO ue_parcours (parcours_id, ue_id, statut, source_id)
SELECT p.id, u.id,
       CASE WHEN u.obligatoire THEN 'obligatoire' ELSE 'option' END,
       s.id
FROM parcours p
JOIN ue u ON u.annee_maquette = '2021-2026'
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Informatique-SHS, UT2J, 03/02/2023'
WHERE (p.nom = 'Tronc commun' AND u.semestre <= 2)
   OR p.nom = 'Informatique-SHS';

INSERT INTO ue_competence (ue_id, competence_id, niveau, confiance, source_id)
SELECT u.id, c.id, v.niveau, 'fiche_officielle', s.id
FROM (VALUES
  ('MI0A101T', 'BASES_DE_DONNEES', 2::SMALLINT),
  ('MI0B101T', 'ALGEBRE', 1::SMALLINT),
  ('MI0A102T', 'STATISTIQUE', 1::SMALLINT),
  ('MI0A105T', 'ALGORITHMIQUE', 1::SMALLINT),
  ('MI0A105T', 'PROGRAMMATION', 1::SMALLINT),
  ('MI0A201T', 'ALGORITHMIQUE', 2::SMALLINT),
  ('MI0A201T', 'PROGRAMMATION', 2::SMALLINT),
  ('MI0B201T', 'ALGEBRE', 2::SMALLINT),
  ('MI0B202T', 'BASES_DE_DONNEES', 2::SMALLINT),
  ('MI0A205T', 'STATISTIQUE', 2::SMALLINT),
  ('MI0A301T', 'ALGORITHMIQUE', 2::SMALLINT),
  ('MI0A301T', 'PROGRAMMATION', 2::SMALLINT),
  ('MI0A301T', 'BASES_DE_DONNEES', 3::SMALLINT),
  ('MI0A303T', 'PROBABILITES', 2::SMALLINT),
  ('MI0C305T', 'SYSTEMES', 2::SMALLINT),
  ('MI0C305T', 'RESEAUX', 2::SMALLINT),
  ('MI0A401T', 'PROGRAMMATION', 2::SMALLINT),
  ('MI0C401T', 'PROGRAMMATION', 2::SMALLINT),
  ('MI0C401T', 'PROGRAMMATION_OBJET', 2::SMALLINT),
  ('MI0C402T', 'ALGEBRE', 2::SMALLINT),
  ('MI0A403T', 'STATISTIQUE', 2::SMALLINT),
  ('MI0C405T', 'INTELLIGENCE_ARTIFICIELLE', 1::SMALLINT),
  ('MI0C502T', 'DEVELOPPEMENT', 2::SMALLINT),
  ('MI0A503T', 'STATISTIQUE', 3::SMALLINT),
  ('MI0C505T', 'DEVELOPPEMENT', 2::SMALLINT),
  ('MI0C601T', 'CRYPTOGRAPHIE', 2::SMALLINT),
  ('MI0D601T', 'PROGRAMMATION', 2::SMALLINT),
  ('MI0C602T', 'GRAPHES', 2::SMALLINT),
  ('MI0C603T', 'PROGRAMMATION', 2::SMALLINT),
  ('MI0C603T', 'SYSTEMES', 2::SMALLINT),
  ('MI0C603T', 'RESEAUX', 2::SMALLINT)
) AS v(ue_code, competence_code, niveau)
JOIN ue u ON u.code = v.ue_code AND u.annee_maquette = '2021-2026'
JOIN competence c ON c.code = v.competence_code
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Informatique-SHS, UT2J, 03/02/2023';

INSERT INTO master (etablissement_id, nom, annee_maquette, source_id)
SELECT e.id,
       'M1 ICE-LD',
       '2021-2026',
       s.id
FROM etablissement e
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Informatique-SHS, UT2J, 03/02/2023'
WHERE e.sigle = 'UT2J';

INSERT INTO parcours_personnalise (nom, parcours_id)
SELECT 'Exemple — parcours Informatique-SHS', p.id
FROM parcours p
WHERE p.nom = 'Informatique-SHS' AND p.annee_maquette = '2021-2026';

INSERT INTO parcours_personnalise_ue (parcours_personnalise_id, ue_id, retenue, statut)
SELECT pp.id, up.ue_id, TRUE, 'acquis'
FROM parcours_personnalise pp
JOIN parcours p ON p.id = pp.parcours_id
JOIN ue_parcours up ON up.parcours_id = p.id
WHERE pp.nom = 'Exemple — parcours Informatique-SHS';

INSERT INTO source (type, reference, date_consultation, notes) VALUES
(
  'maquette_pdf',
  'Catalogue Licence 2021-2026, MIASHS parcours Mathematiques-SHS, UT2J',
  DATE '2026-11-04',
  'https://www.univ-tlse2.fr/medias/fichier/catalogue-licence-2021-2026-miashs-mathematiques-shs_1675675740848-pdf'
),
(
  'page_officielle',
  'Fiche descriptive Master ICE-LD, UT2J',
  DATE '2026-11-04',
  'Fichier local : Fiche descriptive Master ICE-LD.pdf. Phrase d''acces, pas une competence.'
),
(
  'syllabus',
  'Syllabus Master ICE-LD, accreditation 2021-2026, UE 702, UT2J',
  DATE '2026-11-04',
  'Fichier local : Syllabus_Master_ICE-LD.pdf. Phrase lue dans un objectif de cours du M1.'
),
(
  'page_officielle',
  'https://www.univ-tlse2.fr/accueil/formation-insertion/master-miashs-parcours-ingenierie-et-science-des-donnees-orientees-metiers-application-a-la-gestion-de-production-ism-ag',
  DATE '2026-11-04',
  'Page du M1 ISM-AG. L''acces y est decrit par le diplome.'
),
(
  'monmaster',
  'Fiche Mon Master, M1 ISM-AG, rubrique des prerequis',
  DATE '2026-11-04',
  'Phrase relevee pour le projet. L''URL precise de la fiche Mon Master reste a joindre.'
),
(
  'page_officielle',
  'https://www.ut-capitole.fr/medias/fichier/attendus-master-miage-2022-2023_1647014875599-pdf',
  DATE '2026-11-04',
  'Attendus M1 MIAGE 2022-2023, Faculte d''Informatique, mars 2023. Les parcours IM, IDA et 2IS formulent tous des connaissances en bases de donnees et en programmation.'
),
(
  'page_officielle',
  'https://www.miage.fr/toulouse/candidatures/',
  DATE '2026-11-04',
  'Page de candidature MIAGE Toulouse. Elle decrit l''acces par le parcours de licence, pas une liste de competences.'
),
(
  'declaration_etudiant',
  'Exemple de saisie, competence declaree hors maquette',
  DATE '2026-11-04',
  'Aucune personne reelle. Ligne presente pour que la table ne soit pas vide.'
);

INSERT INTO etablissement (nom, sigle) VALUES
  ('Université Toulouse Capitole', 'UT1'),
  ('Université Toulouse III - Paul Sabatier', 'UT3');

INSERT INTO competence (code, libelle, domaine, description) VALUES
  ('RECHERCHE_OPERATIONNELLE', 'Recherche opérationnelle', 'maths_stats', 'Nommee dans l''attendu ISM-AG. Reliee a une UE d''optimisation seulement par estimation.');

INSERT INTO parcours (etablissement_id, nom, nature, annee_maquette, source_id)
SELECT e.id, 'Mathématiques-SHS', 'parcours', '2021-2026', s.id
FROM etablissement e
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Mathematiques-SHS, UT2J'
WHERE e.sigle = 'UT2J';

INSERT INTO ue (code, nom, semestre, ects, obligatoire, annee_maquette, source_id, etablissement_id)
SELECT v.code, v.nom, v.semestre, v.ects, v.obligatoire, '2021-2026', s.id, e.id
FROM source s
JOIN etablissement e ON e.sigle = 'UT2J'
JOIN (VALUES
  ('MI0B301T', 'Algèbre linéaire', 3::SMALLINT, 5::NUMERIC(3,1), TRUE),
  ('MI0A302T', 'Suites, séries et intégrales', 3, 5, TRUE),
  ('MI0A305T', 'Introduction aux modèles de prévision', 3, 3, TRUE),
  ('MI0B401T', 'Optimisation linéaire / Espaces euclidiens', 4, 5, TRUE),
  ('MI0A402T', 'Séries entières et espaces vectoriels normés', 4, 4, TRUE),
  ('MI0A405T', 'Compléments de probabilités', 4, 3, TRUE),
  ('MI0A501T', 'Programmation événementielle / Gestion de projet / Projet / IA', 5, 5, TRUE),
  ('MI0A502T', 'Graphes / IA / Gestion de production', 5, 6, TRUE),
  ('MI0A505T', 'Analyse numérique / Calcul formel', 5, 5, TRUE),
  (NULL, 'Langue vivante (S5, Mathématiques-SHS)', 5, 3, FALSE),
  ('MI0A601T', 'Introduction à la POO / Extraction d''information', 6, 6, TRUE),
  ('MI0A602T', 'Calcul différentiel et optimisation', 6, 6, TRUE),
  ('MI0A603T', 'Sondages / Statistique et SHS', 6, 6, TRUE),
  ('MI0A605T', 'Stage (Mathématiques-SHS)', 6, 4, TRUE),
  (NULL, 'Langue vivante (S6, Mathématiques-SHS)', 6, 3, FALSE)
) AS v(code, nom, semestre, ects, obligatoire) ON TRUE
WHERE s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Mathematiques-SHS, UT2J';

INSERT INTO ue_parcours (parcours_id, ue_id, statut, source_id)
SELECT p.id, u.id,
       CASE WHEN u.obligatoire THEN 'obligatoire' ELSE 'option' END,
       s.id
FROM parcours p
JOIN ue u ON u.annee_maquette = '2021-2026'
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Mathematiques-SHS, UT2J'
WHERE p.nom = 'Mathématiques-SHS'
  AND (
    u.semestre <= 2
    OR u.code IN (
      'MI0A301T', 'MI0A303T', 'MISH304T', 'PIX0307T',
      'MI0A401T', 'MI0A403T', 'MISH404T', 'MI0B404T', 'PIX0407T',
      'MI0A503T', 'MISH504T', 'MISH604T',
      'MI0B301T', 'MI0A302T', 'MI0A305T', 'MI0B401T', 'MI0A402T', 'MI0A405T',
      'MI0A501T', 'MI0A502T', 'MI0A505T', 'MI0A601T', 'MI0A602T', 'MI0A603T', 'MI0A605T'
    )
    OR u.nom IN (
      'Langue vivante ou option (S3)',
      'Langue vivante ou option (S4)',
      'Langue vivante (S5, Mathématiques-SHS)',
      'Langue vivante (S6, Mathématiques-SHS)'
    )
  );

INSERT INTO ue_competence (ue_id, competence_id, niveau, confiance, source_id)
SELECT u.id, c.id, v.niveau, 'fiche_officielle', s.id
FROM (VALUES
  ('MI0B301T', 'ALGEBRE', 3::SMALLINT),
  ('MI0A405T', 'PROBABILITES', 2),
  ('MI0A501T', 'PROGRAMMATION', 2),
  ('MI0A501T', 'INTELLIGENCE_ARTIFICIELLE', 1),
  ('MI0A502T', 'GRAPHES', 2),
  ('MI0A502T', 'INTELLIGENCE_ARTIFICIELLE', 2),
  ('MI0A601T', 'PROGRAMMATION', 1),
  ('MI0A601T', 'PROGRAMMATION_OBJET', 1),
  ('MI0A603T', 'STATISTIQUE', 2)
) AS v(ue_code, competence_code, niveau)
JOIN ue u ON u.code = v.ue_code AND u.annee_maquette = '2021-2026'
JOIN competence c ON c.code = v.competence_code
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Mathematiques-SHS, UT2J';

INSERT INTO ue_competence (ue_id, competence_id, niveau, confiance, source_id)
SELECT u.id, c.id, v.niveau, 'estimation', s.id
FROM (VALUES
  ('MI0B401T', 'RECHERCHE_OPERATIONNELLE', 2::SMALLINT),
  ('MI0A602T', 'RECHERCHE_OPERATIONNELLE', 2)
) AS v(ue_code, competence_code, niveau)
JOIN ue u ON u.code = v.ue_code AND u.annee_maquette = '2021-2026'
JOIN competence c ON c.code = v.competence_code
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Mathematiques-SHS, UT2J';

INSERT INTO master (etablissement_id, nom, annee_maquette, source_id)
SELECT e.id, v.nom, v.annee, s.id
FROM (VALUES
  ('UT2J', 'M1 ISM-AG', '2021-2026', 'https://www.univ-tlse2.fr/accueil/formation-insertion/master-miashs-parcours-ingenierie-et-science-des-donnees-orientees-metiers-application-a-la-gestion-de-production-ism-ag'),
  ('UT1', 'M1 MIAGE', '2022-2023', 'https://www.ut-capitole.fr/medias/fichier/attendus-master-miage-2022-2023_1647014875599-pdf'),
  ('UT3', 'M1 MIAGE Ingénierie des données et de la protection', '2025-2026', 'https://www.miage.fr/toulouse/candidatures/')
) AS v(sigle, nom, annee, reference)
JOIN etablissement e ON e.sigle = v.sigle
JOIN source s ON s.reference = v.reference;

INSERT INTO regle_prerequis (master_id, citation, portee, confiance, source_id)
SELECT m.id, v.citation, v.portee, v.confiance, s.id
FROM (VALUES
  (
    'M1 ICE-LD', 'UT2J',
    'Titulaire d''une licence MIASHS (parcours informatique) ou d''une formation bac+3 équivalente',
    'critere_dossier', 'fiche_officielle',
    'Fiche descriptive Master ICE-LD, UT2J'
  ),
  (
    'M1 ICE-LD', 'UT2J',
    'Il s''agit de prolonger l''apprentissage du développement logiciel en partant du paradigme de la programmation orientée objet acquis en Licence vers des méthodes et techniques du Génie Logiciel.',
    'exigence', 'estimation',
    'Syllabus Master ICE-LD, accreditation 2021-2026, UE 702, UT2J'
  ),
  (
    'M1 ISM-AG', 'UT2J',
    'Cette formation est ouverte aux titulaires de la Licence mention MIASHS ou d''une formation bac+3 équivalente.',
    'critere_dossier', 'fiche_officielle',
    'https://www.univ-tlse2.fr/accueil/formation-insertion/master-miashs-parcours-ingenierie-et-science-des-donnees-orientees-metiers-application-a-la-gestion-de-production-ism-ag'
  ),
  (
    'M1 ISM-AG', 'UT2J',
    'Avoir des pré-requis solides en Développement informatique et base de donnée, en Statistique et en Recherche opérationnelle.',
    'exigence', 'fiche_officielle',
    'Fiche Mon Master, M1 ISM-AG, rubrique des prerequis'
  ),
  (
    'M1 MIAGE', 'UT1',
    'Justifier de connaissances en : Bases de données. Programmation.',
    'exigence', 'fiche_officielle',
    'https://www.ut-capitole.fr/medias/fichier/attendus-master-miage-2022-2023_1647014875599-pdf'
  ),
  (
    'M1 MIAGE', 'UT1',
    'Démontrer : une bonne capacité à travailler en groupe. Une aptitude à la communication écrite et orale.',
    'critere_dossier', 'fiche_officielle',
    'https://www.ut-capitole.fr/medias/fichier/attendus-master-miage-2022-2023_1647014875599-pdf'
  ),
  (
    'M1 MIAGE Ingénierie des données et de la protection', 'UT3',
    'L''entrée en Master 1 MIAGE de Toulouse est de droit pour tout titulaire d''une licence 3 MIAGE de Toulouse. L''accès en M1 est possible sur dossier et entretien pour tout autre parcours.',
    'critere_dossier', 'fiche_officielle',
    'https://www.miage.fr/toulouse/candidatures/'
  )
) AS v(master_nom, sigle, citation, portee, confiance, reference)
JOIN etablissement e ON e.sigle = v.sigle
JOIN master m ON m.nom = v.master_nom AND m.etablissement_id = e.id
JOIN source s ON s.reference = v.reference;

INSERT INTO regle_competence (master_id, competence_id, regle_prerequis_id, portee, confiance, source_id)
SELECT m.id, c.id, r.id, 'exigee', v.confiance, s.id
FROM (VALUES
  ('M1 ICE-LD', 'UT2J', 'PROGRAMMATION_OBJET', 'estimation', 'Syllabus Master ICE-LD, accreditation 2021-2026, UE 702, UT2J'),
  ('M1 ISM-AG', 'UT2J', 'DEVELOPPEMENT', 'estimation', 'Fiche Mon Master, M1 ISM-AG, rubrique des prerequis'),
  ('M1 ISM-AG', 'UT2J', 'BASES_DE_DONNEES', 'estimation', 'Fiche Mon Master, M1 ISM-AG, rubrique des prerequis'),
  ('M1 ISM-AG', 'UT2J', 'STATISTIQUE', 'estimation', 'Fiche Mon Master, M1 ISM-AG, rubrique des prerequis'),
  ('M1 ISM-AG', 'UT2J', 'RECHERCHE_OPERATIONNELLE', 'estimation', 'Fiche Mon Master, M1 ISM-AG, rubrique des prerequis'),
  ('M1 MIAGE', 'UT1', 'BASES_DE_DONNEES', 'fiche_officielle', 'https://www.ut-capitole.fr/medias/fichier/attendus-master-miage-2022-2023_1647014875599-pdf'),
  ('M1 MIAGE', 'UT1', 'PROGRAMMATION', 'fiche_officielle', 'https://www.ut-capitole.fr/medias/fichier/attendus-master-miage-2022-2023_1647014875599-pdf')
) AS v(master_nom, sigle, competence_code, confiance, reference)
JOIN etablissement e ON e.sigle = v.sigle
JOIN master m ON m.nom = v.master_nom AND m.etablissement_id = e.id
JOIN competence c ON c.code = v.competence_code
JOIN source s ON s.reference = v.reference
JOIN regle_prerequis r ON r.master_id = m.id AND r.source_id = s.id AND r.portee = 'exigence';

INSERT INTO parcours_personnalise_competence (parcours_personnalise_id, competence_id, confiance, source_id)
SELECT pp.id, c.id, 'estimation', s.id
FROM parcours_personnalise pp
JOIN competence c ON c.code = 'RECHERCHE_OPERATIONNELLE'
JOIN source s ON s.reference = 'Exemple de saisie, competence declaree hors maquette'
WHERE pp.nom = 'Exemple — parcours Informatique-SHS';

INSERT INTO competence (code, libelle, domaine, description) VALUES
  ('ANALYSE', 'Analyse', 'maths_stats', 'Fonctions, suites, séries, intégrales ou analyse numérique.');

INSERT INTO source (type, reference, date_consultation, notes) VALUES (
  'autre',
  'Relevé de compétences du parcours Mathématiques-SHS, transmis le 04/11/2026',
  DATE '2026-11-04',
  'Ce n''est pas un syllabus officiel. Les logiciels cités (Python, R, Excel, SQL) ne sont pas des compétences de la grille.'
);

INSERT INTO ue_competence (ue_id, competence_id, niveau, confiance, source_id)
SELECT u.id, c.id, 2, 'fiche_officielle', s.id
FROM ue u
JOIN competence c ON c.code = 'ANALYSE'
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Mathematiques-SHS, UT2J'
WHERE u.code = 'MI0A505T' AND u.annee_maquette = '2021-2026';

INSERT INTO ue_competence (ue_id, competence_id, niveau, confiance, source_id)
SELECT u.id, c.id, v.niveau, 'estimation', s.id
FROM (VALUES
  ('MI0B102T', 'ANALYSE', 2::SMALLINT),
  ('MI0A202T', 'ANALYSE', 2),
  ('MI0A302T', 'ANALYSE', 2),
  ('MI0A402T', 'ANALYSE', 2),
  ('MI0A602T', 'ANALYSE', 2),
  ('MI0A305T', 'STATISTIQUE', 2),
  ('MI0A502T', 'RECHERCHE_OPERATIONNELLE', 1)
) AS v(ue_code, competence_code, niveau)
JOIN ue u ON u.code = v.ue_code AND u.annee_maquette = '2021-2026'
JOIN competence c ON c.code = v.competence_code
JOIN source s ON s.reference = 'Relevé de compétences du parcours Mathématiques-SHS, transmis le 04/11/2026';

INSERT INTO source (type, reference, date_consultation, notes) VALUES (
  'monmaster',
  'Mon Master, M1 MIAGE UT3, parcours Ingénierie des données et de la protection, rubrique Attendus',
  DATE '2026-11-04',
  'Liste transmise depuis la fiche Mon Master. L''URL precise de la fiche reste a joindre.'
);

INSERT INTO competence (code, libelle, domaine, description) VALUES
  ('GESTION_PROJET', 'Gestion de projet', 'transversal', 'Organisation des tâches, des ressources et du déroulement d''un projet informatique.'),
  ('SYSTEME_INFORMATION', 'Système d''information', 'transversal', 'Maintien ou conception d''une partie d''un système d''information en entreprise.');

INSERT INTO ue_competence (ue_id, competence_id, niveau, confiance, source_id)
SELECT u.id, c.id, 2, 'fiche_officielle', s.id
FROM ue u
JOIN competence c ON c.code = 'GESTION_PROJET'
JOIN source s ON s.reference = 'Catalogue Licence 2021-2026, MIASHS parcours Mathematiques-SHS, UT2J'
WHERE u.code = 'MI0A501T' AND u.annee_maquette = '2021-2026';

INSERT INTO regle_prerequis (master_id, citation, portee, confiance, source_id)
SELECT m.id, v.citation, v.portee, 'fiche_officielle', s.id
FROM (VALUES
  ('Identifier, classer et structurer un modèle de données normalisé en fonction d''un cahier des charges client', 'exigence'),
  ('Exploiter un modèle de données au travers d''un SGBD en prenant compte les spécificités techniques du SGCD', 'exigence'),
  ('Construire une application Web dynamique sur la base de frameworks et basée sur une architecture trois tiers', 'exigence'),
  ('Mettre en oeuvre les étapes de développement de logiciels de l''analyse des besoins jusqu''à la conception et la réalisation', 'exigence'),
  ('Appliquer une analyse et une conception orientée objet sur des études de cas pour le développement d''un projet informatique', 'exigence'),
  ('Organiser les tâches dans le temps et l''affectation des ressources d''un projet', 'exigence'),
  ('Maintenir le fonctionnement d''une partie d''un Système d''Information dans un environnement d''entreprise en respectant la stratégie de l''entreprise', 'exigence'),
  ('Appréhender les outils mathématiques pour la modélisation des éléments dans le domaine des systèmes d''information et de l''informatique', 'exigence'),
  ('Établir un plan d''action pour la résolution d''un problème donné dans un contexte d''entreprise', 'exigence'),
  ('Organiser et mettre en œuvre les principes et outils de collaboration dans la construction d''une application', 'exigence'),
  ('Identifier et spécifier les besoins d''un client sous la forme d''un cahier des charges', 'exigence'),
  ('Différencier les différents types de projets informatiques du point de vue de leur organisation et déroulement', 'exigence'),
  ('Identifier les différents acteurs, leurs liaisons (notamment triptyque délai-qualité-coût) et leurs impacts sur un projet informatique', 'exigence'),
  ('Distinguer les principales solutions fonctionnelles en réponse aux besoins des métiers ou aux besoins communs', 'exigence'),
  ('Identifier et comparer les rôles des différents acteurs du numérique dans une entreprise', 'exigence'),
  ('Modéliser l''architecture d''une application dans ses composantes traitements, IHM et données', 'exigence'),
  ('Disposer des aptitudes au travail en équipe, à la communication orale ou écrite', 'critere_dossier'),
  ('Identifier les éléments de l''environnement économique et concurrentiel d''une entreprise', 'critere_dossier'),
  ('Décrire le fonctionnement général et la structure d''une entreprise ou organisation', 'critere_dossier'),
  ('Différencier le droit du travail, le droit des contrats et le droit de l''informatique', 'critere_dossier'),
  ('Décrire les éléments principaux constitutifs du droit du travail', 'critere_dossier')
) AS v(citation, portee)
JOIN master m ON m.nom = 'M1 MIAGE Ingénierie des données et de la protection'
JOIN source s ON s.reference = 'Mon Master, M1 MIAGE UT3, parcours Ingénierie des données et de la protection, rubrique Attendus';

INSERT INTO regle_competence (master_id, competence_id, regle_prerequis_id, portee, confiance, source_id)
SELECT m.id, c.id, r.id, 'exigee', v.confiance, s.id
FROM (VALUES
  ('BASES_DE_DONNEES', 'fiche_officielle', 'Identifier, classer et structurer un modèle de données normalisé en fonction d''un cahier des charges client'),
  ('DEVELOPPEMENT', 'fiche_officielle', 'Mettre en oeuvre les étapes de développement de logiciels de l''analyse des besoins jusqu''à la conception et la réalisation'),
  ('PROGRAMMATION_OBJET', 'fiche_officielle', 'Appliquer une analyse et une conception orientée objet sur des études de cas pour le développement d''un projet informatique'),
  ('PROGRAMMATION', 'estimation', 'Construire une application Web dynamique sur la base de frameworks et basée sur une architecture trois tiers'),
  ('GESTION_PROJET', 'fiche_officielle', 'Organiser les tâches dans le temps et l''affectation des ressources d''un projet'),
  ('SYSTEME_INFORMATION', 'fiche_officielle', 'Maintenir le fonctionnement d''une partie d''un Système d''Information dans un environnement d''entreprise en respectant la stratégie de l''entreprise')
) AS v(competence_code, confiance, citation)
JOIN master m ON m.nom = 'M1 MIAGE Ingénierie des données et de la protection'
JOIN competence c ON c.code = v.competence_code
JOIN source s ON s.reference = 'Mon Master, M1 MIAGE UT3, parcours Ingénierie des données et de la protection, rubrique Attendus'
JOIN regle_prerequis r ON r.master_id = m.id AND r.citation = v.citation;

COMMIT;

