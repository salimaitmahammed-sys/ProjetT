export default function MethodePage() {
  return (
    <section className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Comment le diagnostic est calculé</h1>
      <div className="bg-white rounded-3xl shadow-sm p-6 text-sm leading-6">
        <p>
          Match% = compétences exigées couvertes ÷ compétences exigées. Une compétence est couverte
          si une UE cochée la porte, ou si elle est déclarée hors maquette.
        </p>
        <p className="mt-3">
          Les critères de dossier, le travail en équipe, le droit ou la simple poursuite d’études
          restent affichés et ne changent pas le pourcentage.
        </p>
      </div>
      <div className="bg-white rounded-3xl shadow-sm p-6 text-sm leading-6">
        <h2 className="font-semibold mb-2">Confiance</h2>
        <p>Fiche officielle : l’intitulé ou l’attendu nomme la compétence.</p>
        <p>Estimation : le lien est déduit, par exemple l’optimisation vers la recherche opérationnelle.</p>
        <p>Confirmé : un responsable a validé la ligne. Aucune ligne n’a encore ce niveau.</p>
      </div>
      <div className="bg-white rounded-3xl shadow-sm p-6 text-sm leading-6">
        <h2 className="font-semibold mb-2">Sources de cette V1</h2>
        <p>Catalogues UT2J 2021-2026, Informatique-SHS et Mathématiques-SHS.</p>
        <p>Fiche et syllabus ICE-LD, page et fiche Mon Master de l’ISM-AG.</p>
        <p>Attendus MIAGE UT Capitole 2022-2023, page de candidature MIAGE UT3, et la fiche Mon Master du parcours Ingénierie des données et de la protection.</p>
      </div>
    </section>
  )
}
