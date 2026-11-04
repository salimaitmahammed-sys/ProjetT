import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Stepper from "../components/Stepper"
import { useProfil } from "../state/ProfilContext"

const confianceLabel = {
  fiche_officielle: "Fiche officielle",
  confirme_responsable: "Confirmé",
  estimation: "Estimation",
}

function uesRetenues(ligne, cochees) {
  return ligne.ues.filter((ue) => cochees.has(ue.id))
}

export default function DiagnosticPage() {
  const { selection, cochees, parcours } = useProfil()
  const { master, match, lignes, lacunes, dossier } = selection
  const couvertes = lignes.length - lacunes.length

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Stepper etape={4} />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-wrap items-center justify-between gap-8">
        <div className="max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 font-semibold">
            Votre diagnostic · {parcours.nom}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Diagnostic pour {master.nom}</h1>
          <p className="text-slate-500 mt-3">
            {lacunes.length === 0
              ? "Les compétences exigées sont couvertes par le profil."
              : `${lacunes.length} lacune${lacunes.length > 1 ? "s" : ""} sur les compétences exigées.`}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {couvertes} prérequis validé{couvertes > 1 ? "s" : ""}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 text-rose-700 text-xs font-medium px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              {lacunes.length} lacune{lacunes.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-[6px] border-[#1e3a8a] flex flex-col items-center justify-center">
            <span className="text-[11px] text-slate-400">Match :</span>
            <span className="text-3xl font-bold leading-none mt-1">{match === null ? "—" : `${match} %`}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Compétences exigées</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h2 className="font-semibold text-lg">Votre carte des prérequis</h2>
              <p className="text-sm text-slate-500 mt-1">Les UE cochées qui portent chaque compétence exigée.</p>
            </div>
            <span className="rounded-full bg-blue-50 text-[#1e3a8a] text-xs font-medium px-3 py-1 border border-blue-100">
              {lignes.length} prérequis analysé{lignes.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 p-3 sm:p-4">
            <ul className="grid sm:grid-cols-2 gap-3">
              {lignes.map((ligne) => {
                const retenues = uesRetenues(ligne, cochees)
                const hors = ligne.couverte && retenues.length === 0
                return (
                  <li
                    key={ligne.competenceId}
                    className={`rounded-xl border-l-4 p-4 ${
                      ligne.couverte ? "bg-emerald-50 border-emerald-400" : "bg-rose-50 border-rose-400"
                    }`}
                  >
                    <p className="font-semibold">{ligne.libelle}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {retenues.length > 0 && retenues.map((ue) => ue.nom).join(" · ")}
                      {hors && "Déclarée hors maquette"}
                      {!ligne.couverte && retenues.length === 0 && (ligne.ues.length === 0 ? "Aucune UE de ce parcours" : "Aucune UE cochée")}
                    </p>
                    <p className={`text-sm mt-2 ${ligne.couverte ? "text-emerald-700" : "text-rose-700"}`}>
                      {ligne.couverte ? "✓ Couverte" : "× Lacune"} · {confianceLabel[ligne.confiance] ?? ligne.confiance}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Lacunes identifiées</h2>
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 text-xs font-semibold flex items-center justify-center">
                {lacunes.length}
              </span>
            </div>
            {lacunes.length === 0 && <p className="text-sm text-emerald-700">Aucune lacune sur les compétences exigées.</p>}
            <ul className="space-y-3">
              {lacunes.map((ligne) => (
                <li key={ligne.competenceId} className="rounded-xl bg-rose-50 p-3">
                  <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Lacune
                  </p>
                  <p className="font-semibold mt-1">{ligne.libelle}</p>
                  {ligne.citation && <p className="text-xs text-slate-600 mt-1 leading-5">{ligne.citation}</p>}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {dossier.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="font-semibold">Critères de dossier</h2>
          <p className="text-sm text-slate-500 mt-1 mb-3">Ces phrases ne modifient pas le Match%.</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {dossier.map((item) => (
              <li key={item.citation}>{item.citation}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
        <Link
          to="/masters"
          className="bg-white border border-gray-300 text-gray-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Précédent</span>
        </Link>
        <Link
          to="/comparer"
          className="bg-[#1e3a8a] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-3 shadow-sm"
        >
          <span>Comparer les masters</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  )
}
