import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react"
import { Link } from "react-router-dom"
import Stepper from "../components/Stepper"
import { useProfil } from "../state/ProfilContext"

export default function ParcoursPage() {
  const { parcoursChoix, parcours, choisirParcours, data } = useProfil()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Stepper etape={1} />

      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Quel est votre parcours ?</h1>
          <p className="text-gray-500 text-sm mt-1">
            Nous préremplissons votre profil selon votre parcours. Vous pourrez le modifier.
          </p>
        </div>
        <span className="text-xs font-semibold bg-blue-50 text-[#1e3a8a] px-3 py-1 rounded-md border border-blue-100 shrink-0">
          Étape 1 sur 4
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-base font-bold text-gray-800">Votre formation</h2>
            <p className="text-xs font-bold text-gray-700 mt-4 mb-2">Établissement</p>
            <div className="border border-blue-200 rounded-xl bg-blue-50/50 p-3.5 text-sm font-semibold text-[#1e3a8a]">
              Université Toulouse – Jean Jaurès
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-800">Choisissez votre parcours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parcoursChoix.map((item) => {
                const nombre = data.ues.filter((ue) => ue.parcoursIds.includes(item.id)).length
                const actif = item.id === parcours.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => choisirParcours(item.id)}
                    className={`p-6 rounded-2xl border-2 transition text-left bg-white ${
                      actif ? "border-[#1e3a8a] ring-1 ring-[#1e3a8a]" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-extrabold text-slate-900">{item.nom}</h3>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          actif ? "bg-[#1e3a8a] text-white border-[#1e3a8a]" : "border-gray-300"
                        }`}
                      >
                        {actif && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">Licence MIASHS · S1 à S6</p>
                    <div className="text-2xl font-black text-[#1e3a8a] mb-3">{nombre} UE</div>
                    <div className="text-xs font-semibold text-gray-700 mb-4">Tronc commun compris</div>
                    <div className="flex justify-between items-center text-[11px] text-gray-400 pt-3 border-t border-gray-100">
                      <span>Maquette 2021-2026</span>
                      {actif && <span className="font-bold text-[#1e3a8a]">Sélectionné</span>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#1e3a8a]">Votre profil sera prérempli</h3>
            <p className="text-xs text-gray-500">Licence MIASHS · {parcours.nom}</p>
            <div>
              <div className="text-3xl font-black text-[#1e3a8a]">
                {data.ues.filter((ue) => ue.parcoursIds.includes(parcours.id)).length}
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">UE cochées</div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed pt-3 border-t border-blue-100">
              Toutes les UE du parcours sont cochées. Vous pourrez en retirer à l’étape suivante.
            </p>
          </div>
          <div className="flex items-start space-x-3 text-xs text-gray-500 px-2">
            <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <span>À l’étape suivante, vérifiez vos UE et complétez les compétences acquises hors formation.</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200 gap-3">
        <Link
          to="/"
          className="bg-white border border-gray-300 text-gray-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Précédent</span>
        </Link>
        <Link
          to="/profil"
          className="bg-[#1e3a8a] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-3 shadow-sm hover:shadow-md transition"
        >
          <span>Continuer</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  )
}
