import { NavLink, Outlet } from "react-router-dom"

const liens = [
  { to: "/profil", label: "Mon profil" },
  { to: "/diagnostic", label: "Diagnostic" },
  { to: "/comparer", label: "Comparer" },
  { to: "/methode", label: "Méthode et sources" },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#e9eef5] text-[#0f172a]">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-16 py-3 flex items-center justify-between gap-4">
          <NavLink to="/" className="bg-[#1e3a8a] text-white text-sm font-semibold rounded-lg px-3 py-1.5 shrink-0">
            CapMaster
          </NavLink>
          <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 text-sm">
            {liens.map((lien) => (
              <NavLink
                key={lien.to}
                to={lien.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#2563eb] font-semibold border-b-2 border-[#2563eb] pb-0.5"
                    : "text-slate-500 hover:text-[#1e3a8a]"
                }
              >
                {lien.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
