import { GraduationCap } from "lucide-react"
import { NavLink } from "react-router-dom"

const liens = [
  { to: "/profil", label: "Mon profil" },
  { to: "/diagnostic", label: "Diagnostic" },
  { to: "/comparer", label: "Comparer" },
  { to: "/methode", label: "Méthode et sources" },
]

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-50 gap-4">
      <NavLink to="/" className="flex items-center space-x-3 group shrink-0">
        <div className="bg-[#1e3a8a] text-white p-2 rounded-lg group-hover:bg-blue-800 transition">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xl font-bold text-[#1e3a8a] tracking-tight">CapMaster</span>
          <span className="text-xs text-gray-400 ml-3 border-l border-gray-300 pl-3 hidden md:inline">
            Votre parcours. Votre cap.
          </span>
        </div>
      </NavLink>

      <nav className="flex flex-wrap justify-end gap-x-6 gap-y-1 text-sm font-medium text-gray-600">
        {liens.map((lien) => (
          <NavLink
            key={lien.to}
            to={lien.to}
            className={({ isActive }) =>
              isActive
                ? "text-[#1e3a8a] font-bold border-b-2 border-[#1e3a8a] pb-1"
                : "hover:text-[#1e3a8a] transition"
            }
          >
            {lien.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
