import { Link } from "react-router-dom"

export default function AccueilPage() {
  return (
    <section className="max-w-3xl">
      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Licence MIASHS · UT2J</p>
      <h1 className="text-4xl font-bold tracking-tight mt-3 mb-4">Quelles compétences manquent pour le master visé ?</h1>
      <p className="text-slate-600 mb-8">
        Le profil part du parcours choisi. Le Match% compare les compétences exigées, pas le nom des UE.
      </p>
      <Link to="/parcours" className="inline-flex rounded-lg bg-[#1e3a8a] text-white px-4 py-2.5 text-sm font-medium">
        Commencer
      </Link>
    </section>
  )
}
