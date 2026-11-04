import { ArrowLeft, ArrowRight, BarChart3, Check, Code2, GraduationCap, Info, Layers, Shield } from "lucide-react"
import { Link } from "react-router-dom"
import Stepper from "../components/Stepper"
import { useProfil } from "../state/ProfilContext"

const icones = {
  UT2J: Code2,
  UT1: Layers,
  UT3: Shield,
}

export default function MastersPage() {
  const { evaluations, masterId, setMasterId } = useProfil()
  const selection = evaluations.find((item) => item.master.id === masterId) ?? evaluations[0]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Stepper etape={3} />

      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900">Quel master souhaitez-vous rejoindre ?</h1>
        <p className="text-gray-500 text-sm">Choisissez un master pour comparer ses prérequis à votre parcours MIASHS.</p>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-sm font-bold text-gray-800">{evaluations.length} masters à explorer</h2>
        <div className="flex items-center space-x-1.5 text-xs text-gray-400">
          <Info className="w-4 h-4" />
          <span>Le pourcentage utilise seulement les compétences exigées.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {evaluations.map((item) => {
          const actif = item.master.id === masterId
          const Icone = item.master.etablissement === "UT2J" && item.master.nom.includes("ISM")
            ? BarChart3
            : icones[item.master.etablissement] ?? GraduationCap
          return (
            <button
              key={item.master.id}
              type="button"
              onClick={() => setMasterId(item.master.id)}
              className={`p-6 rounded-2xl border-2 transition text-left flex flex-col justify-between ${
                actif
                  ? "bg-blue-50/40 border-[#1e3a8a] ring-1 ring-[#1e3a8a]"
                  : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center border border-blue-100">
                    <Icone className="w-5 h-5" />
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      actif ? "bg-[#1e3a8a] text-white border-[#1e3a8a]" : "border-gray-300"
                    }`}
                  >
                    {actif && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">{item.master.nom}</h3>
                <p className="text-xs font-semibold text-blue-700 mb-3">
                  {item.master.etablissement} · {item.master.annee}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  {item.lacunes.length === 0
                    ? "Les compétences exigées sont couvertes."
                    : `${item.lacunes.length} compétence${item.lacunes.length > 1 ? "s" : ""} exigée${item.lacunes.length > 1 ? "s" : ""} manquante${item.lacunes.length > 1 ? "s" : ""}.`}
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100/80">
                <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                  Match · {item.match === null ? "—" : `${item.match} %`}
                </span>
                {actif && <span className="text-xs font-bold text-[#1e3a8a]">Sélectionné</span>}
              </div>
            </button>
          )
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{selection.master.nom} sélectionné</h3>
            <p className="text-xs text-gray-500 mt-0.5">Découvrez les compétences couvertes et les lacunes.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <Link
            to="/profil"
            className="bg-white border border-gray-300 text-gray-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Précédent</span>
          </Link>
          <Link
            to="/diagnostic"
            className="bg-[#1e3a8a] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-3 shadow-sm hover:shadow-md transition"
          >
            <span>Voir mon diagnostic</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Le match indique la part des compétences exigées couvertes, pas une probabilité d’admission.
      </p>
    </main>
  )
}
