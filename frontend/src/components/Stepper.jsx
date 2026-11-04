import { Link } from "react-router-dom"

const etapes = [
  { n: 1, label: "Parcours", to: "/parcours" },
  { n: 2, label: "Profil", to: "/profil" },
  { n: 3, label: "Master visé", to: "/masters" },
  { n: 4, label: "Résultats", to: "/diagnostic" },
]

export default function Stepper({ etape }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold">
      {etapes.map((item, index) => {
        const courant = item.n === etape
        const passe = item.n < etape
        return (
          <span key={item.n} className="flex items-center gap-4">
            {index > 0 && <span className="text-gray-300">&gt;</span>}
            <Link
              to={item.to}
              className={`flex items-center space-x-2 ${courant ? "text-[#1e3a8a]" : passe ? "text-gray-500" : "text-gray-400"}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  courant
                    ? "bg-[#1e3a8a] text-white"
                    : passe
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {passe ? "✓" : item.n}
              </span>
              <span className={courant ? "font-bold" : ""}>{item.label}</span>
            </Link>
          </span>
        )
      })}
    </div>
  )
}
