import { ArrowLeft, ArrowRight, Check, Info, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import Stepper from "../components/Stepper"
import { useProfil } from "../state/ProfilContext"

function competencesDe(ue, data) {
  return data.liens
    .filter((lien) => lien.ueId === ue.id)
    .map((lien) => data.competences.find((competence) => competence.id === lien.competenceId))
    .filter(Boolean)
}

export default function ProfilPage() {
  const { parcours, ues, cochees, toggleUe, data, hors, toggleHors, evaluations } = useProfil()
  const semestres = [...new Set(ues.map((ue) => ue.semestre))].sort((a, b) => a - b)
  const nombreCochees = ues.filter((ue) => cochees.has(ue.id)).length

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Stepper etape={2} />

      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Vérifions votre profil</h1>
          <p className="text-gray-500 text-sm mt-1">
            Votre profil est prérempli selon votre parcours. Décochez une UE pour la retirer.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 text-[#1e3a8a] text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-100">
          <span>Licence MIASHS · {parcours.nom}</span>
          <Link to="/parcours" className="underline text-blue-700 hover:text-blue-900">
            Changer
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-base font-bold text-gray-800">Vos unités d’enseignement</h2>
          {semestres.map((semestre) => (
            <div key={semestre} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 px-6 py-3 border-b border-gray-200">
                <span className="text-xs font-extrabold text-[#1e3a8a] uppercase tracking-wider">Semestre {semestre}</span>
              </div>
              <div className="divide-y divide-gray-100">
                {ues
                  .filter((ue) => ue.semestre === semestre)
                  .map((ue) => {
                    const competences = competencesDe(ue, data)
                    const retenue = cochees.has(ue.id)
                    return (
                      <div key={ue.id} className="p-6 space-y-3">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={retenue}
                            onChange={() => toggleUe(ue.id)}
                            className="w-4 h-4 mt-1 rounded border-gray-300 accent-[#1e3a8a] cursor-pointer"
                          />
                          <span>
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold text-gray-800">{ue.nom}</span>
                              {!ue.obligatoire && (
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                                  Option
                                </span>
                              )}
                            </span>
                            {ue.code && <span className="block text-xs text-gray-400 mt-0.5">{ue.code}</span>}
                          </span>
                        </label>
                        <div>
                          <span
                            className={`inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                              retenue
                                ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                                : "text-rose-600 bg-rose-50 border-rose-200"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${retenue ? "bg-emerald-500" : "bg-rose-500"}`} />
                            <span>{retenue ? "Validée" : "Non acquise"}</span>
                          </span>
                        </div>
                        {competences.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {competences.map((competence) => (
                              <span
                                key={competence.id}
                                className="inline-flex items-center space-x-1 text-xs bg-blue-50/60 text-[#1e3a8a] px-2.5 py-1 rounded-lg border border-blue-100 font-medium"
                              >
                                <Check className="w-3 h-3" />
                                <span>{competence.libelle}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-base">
              <Sparkles className="w-5 h-5 text-[#1e3a8a]" />
              <span>Compétences hors formation</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Cochez une compétence acquise en dehors des UE. Elle compte comme une estimation.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.competences.map((competence) => {
                const actif = hors.has(competence.id)
                return (
                  <button
                    key={competence.id}
                    type="button"
                    onClick={() => toggleHors(competence.id)}
                    className={`inline-flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl border font-medium ${
                      actif
                        ? "bg-blue-50/60 text-[#1e3a8a] border-blue-100"
                        : "bg-white text-gray-500 border-gray-200"
                    }`}
                  >
                    {actif && <Check className="w-3.5 h-3.5" />}
                    <span>{competence.libelle}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Votre parcours en un regard</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-black text-[#1e3a8a]">{nombreCochees}</div>
                <div className="text-[10px] text-gray-500 uppercase font-semibold mt-0.5">UE sélectionnées</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#1e3a8a]">{hors.size}</div>
                <div className="text-[10px] text-gray-500 uppercase font-semibold mt-0.5">hors formation</div>
              </div>
            </div>
            <ul className="space-y-3 pt-3 border-t border-blue-100">
              {evaluations.map((item) => (
                <li key={item.master.id} className="flex items-start justify-between gap-3">
                  <span className="text-xs font-medium text-slate-700">{item.master.nom}</span>
                  <span className="text-sm font-black text-[#1e3a8a] shrink-0" data-testid={`match-${item.master.id}`}>
                    {item.match === null ? "—" : `${item.match} %`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-start space-x-3 text-xs text-gray-500 px-2">
            <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <span>Cochez les UE suivies. Le Match% des masters se recalcule aussitôt.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <Link
            to="/parcours"
            className="bg-white border border-gray-300 text-gray-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Précédent</span>
          </Link>
          <p className="text-xs text-gray-500 font-medium hidden md:block">
            Prochaine étape : choisir le master que vous souhaitez rejoindre.
          </p>
        </div>
        <Link
          to="/masters"
          className="bg-[#1e3a8a] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-3 shadow-sm hover:shadow-md transition"
        >
          <span>Continuer</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  )
}
