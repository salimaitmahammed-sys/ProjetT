import { Link } from "react-router-dom"
import Stepper from "../components/Stepper"
import { useProfil } from "../state/ProfilContext"

export default function ParcoursPage() {
  const { parcoursChoix, parcours, choisirParcours, data } = useProfil()

  return (
    <section>
      <Stepper etape={1} />
      <h1 className="text-3xl font-bold mb-2">Quel est votre parcours ?</h1>
      <p className="text-slate-600 mb-6">
        Université Toulouse - Jean Jaurès, maquette {data.ues[0] ? "2021-2026" : ""}. Le tronc commun de S1 et S2 est inclus.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {parcoursChoix.map((item) => {
          const nombre = data.ues.filter((ue) => ue.parcoursIds.includes(item.id)).length
          const actif = item.id === parcours.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => choisirParcours(item.id)}
              className={`text-left rounded-2xl border p-5 bg-white shadow-sm ${actif ? "border-[#2563eb] ring-2 ring-blue-100" : "border-slate-200"}`}
            >
              <p className="font-semibold">{item.nom}</p>
              <p className="text-sm text-slate-500 mt-2">{nombre} UE, tronc commun compris</p>
            </button>
          )
        })}
      </div>
      <div className="mt-8 flex justify-end">
        <Link to="/profil" className="rounded-lg bg-[#1e3a8a] text-white px-4 py-2.5 text-sm font-medium">
          Continuer
        </Link>
      </div>
    </section>
  )
}
