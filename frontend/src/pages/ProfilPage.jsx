import { Link } from "react-router-dom"
import Stepper from "../components/Stepper"
import { useProfil } from "../state/ProfilContext"

export default function ProfilPage() {
  const { parcours, ues, cochees, toggleUe, data, hors, toggleHors, evaluations } = useProfil()
  const semestres = [...new Set(ues.map((ue) => ue.semestre))].sort((a, b) => a - b)

  return (
    <section>
      <Stepper etape={2} />
      <h1 className="text-3xl font-bold mb-2">Votre profil</h1>
      <p className="text-slate-600 mb-6">
        Parcours {parcours.nom}. Décochez une UE pour la retirer. Le Match% des quatre masters se recalcule aussitôt.
      </p>
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="order-2 space-y-6 lg:order-1">
          {semestres.map((semestre) => (
            <div key={semestre} className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="font-semibold mb-3">Semestre {semestre}</h2>
              <ul className="space-y-2">
                {ues
                  .filter((ue) => ue.semestre === semestre)
                  .map((ue) => (
                    <li key={ue.id}>
                      <label className="flex items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={cochees.has(ue.id)}
                          onChange={() => toggleUe(ue.id)}
                        />
                        <span>
                          <span className="font-medium">{ue.nom}</span>
                          <span className="block text-slate-500">
                            {ue.code ? `${ue.code} · ` : ""}
                            {Number(ue.ects)} ECTS
                            {ue.obligatoire ? "" : " · option"}
                          </span>
                        </span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="font-semibold mb-2">Compétence hors maquette</h2>
            <p className="text-sm text-slate-500 mb-3">Une compétence déclarée en dehors des UE. Elle compte comme une estimation.</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {data.competences.map((competence) => (
                <li key={competence.id}>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={hors.has(competence.id)}
                      onChange={() => toggleHors(competence.id)}
                    />
                    {competence.libelle}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="order-1 space-y-3 h-fit lg:order-2 lg:sticky lg:top-6">
          {evaluations.map((item) => (
            <div key={item.master.id} className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-sm font-medium">{item.master.nom}</p>
              <p className="text-xs text-slate-500">{item.master.etablissement}</p>
              <p className="text-2xl font-bold text-[#1e3a8a] mt-1" data-testid={`match-${item.master.id}`}>
                {item.match === null ? "—" : `${item.match} %`}
              </p>
            </div>
          ))}
          <Link to="/masters" className="block text-center rounded-lg bg-[#1e3a8a] text-white px-4 py-2.5 text-sm font-medium">
            Choisir un master
          </Link>
        </aside>
      </div>
    </section>
  )
}
