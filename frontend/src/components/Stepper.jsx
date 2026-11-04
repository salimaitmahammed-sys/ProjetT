import { Link } from "react-router-dom"

const etapes = [
  { n: 1, label: "Parcours", to: "/parcours" },
  { n: 2, label: "Profil", to: "/profil" },
  { n: 3, label: "Master visé", to: "/masters" },
  { n: 4, label: "Résultats", to: "/diagnostic" },
]

export default function Stepper({ etape }) {
  return (
    <ol className="flex flex-wrap items-center gap-2 text-sm mb-6">
      {etapes.map((item, index) => {
        const courant = item.n === etape
        const passe = item.n < etape
        return (
          <li key={item.n} className="flex items-center gap-2">
            {index > 0 && <span className="text-slate-300">›</span>}
            <Link
              to={item.to}
              className={`flex items-center gap-2 ${courant ? "text-[#2563eb] font-semibold" : passe ? "text-slate-600" : "text-slate-400"}`}
            >
              <span
                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                  courant ? "bg-[#2563eb] text-white" : passe ? "bg-blue-100 text-[#2563eb]" : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                {passe ? "✓" : item.n}
              </span>
              {item.label}
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
