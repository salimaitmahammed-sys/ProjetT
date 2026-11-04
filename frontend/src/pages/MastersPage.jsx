import { Link } from "react-router-dom"
import Stepper from "../components/Stepper"
import { useProfil } from "../state/ProfilContext"

export default function MastersPage() {
  const { evaluations, masterId, setMasterId } = useProfil()

  return (
    <section>
      <Stepper etape={3} />
      <h1 className="text-3xl font-bold mb-2">Quel master visez-vous ?</h1>
      <p className="text-slate-600 mb-6">Le pourcentage utilise seulement les compétences exigées.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {evaluations.map((item) => {
          const actif = item.master.id === masterId
          return (
            <button
              key={item.master.id}
              type="button"
              onClick={() => setMasterId(item.master.id)}
              className={`text-left rounded-2xl border bg-white shadow-sm p-5 ${actif ? "border-[#2563eb] ring-2 ring-blue-100 bg-blue-50/40" : "border-slate-200"}`}
            >
              <p className="font-semibold">{item.master.nom}</p>
              <p className="text-sm text-slate-500">{item.master.etablissement} · {item.master.annee}</p>
              <p className="text-3xl font-bold text-[#1e3a8a] mt-3">{item.match === null ? "—" : `${item.match} %`}</p>
              <p className="text-sm text-slate-500 mt-1">
                {item.lacunes.length === 0 ? "Compétences exigées couvertes" : `${item.lacunes.length} compétence${item.lacunes.length > 1 ? "s" : ""} manquante${item.lacunes.length > 1 ? "s" : ""}`}
              </p>
            </button>
          )
        })}
      </div>
      <div className="mt-8 flex justify-end">
        <Link to="/diagnostic" className="rounded-lg bg-[#1e3a8a] text-white px-4 py-2.5 text-sm font-medium">
          Voir le diagnostic
        </Link>
      </div>
    </section>
  )
}
