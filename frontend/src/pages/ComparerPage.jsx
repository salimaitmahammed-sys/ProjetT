import { Link } from "react-router-dom"
import { useProfil } from "../state/ProfilContext"

export default function ComparerPage() {
  const { evaluations, setMasterId } = useProfil()

  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Comparer les masters</h1>
      <p className="text-slate-600 mb-6">Même profil, compétences exigées différentes.</p>
      <div className="grid gap-4 md:hidden">
        {evaluations.map((item) => (
          <article key={item.master.id} className="bg-white rounded-2xl shadow-sm p-4">
            <p className="font-semibold">{item.master.nom}</p>
            <p className="text-sm text-slate-500">{item.master.etablissement}</p>
            <p className="text-2xl font-bold text-[#1e3a8a] mt-2">{item.match === null ? "—" : `${item.match} %`}</p>
            {item.lacunes.length === 0 ? (
              <p className="text-sm text-emerald-700 mt-2">Aucune compétence manquante</p>
            ) : (
              <ul className="text-sm mt-2 space-y-1">
                {item.lacunes.map((lacune) => (
                  <li key={lacune.competenceId}>{lacune.libelle}</li>
                ))}
              </ul>
            )}
            <Link
              to="/diagnostic"
              onClick={() => setMasterId(item.master.id)}
              className="inline-block mt-3 text-sm text-[#1e3a8a] font-medium"
            >
              Voir le diagnostic
            </Link>
          </article>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto bg-white rounded-3xl shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="p-4 font-medium text-slate-500">Master</th>
              {evaluations.map((item) => (
                <th key={item.master.id} className="p-4 font-semibold min-w-40">{item.master.nom}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="p-4 text-slate-500">Établissement</td>
              {evaluations.map((item) => (
                <td key={item.master.id} className="p-4">{item.master.etablissement}</td>
              ))}
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-4 text-slate-500">Match</td>
              {evaluations.map((item) => (
                <td key={item.master.id} className="p-4 text-2xl font-bold text-[#1e3a8a]">
                  {item.match === null ? "—" : `${item.match} %`}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-slate-500 align-top">Manquantes</td>
              {evaluations.map((item) => (
                <td key={item.master.id} className="p-4 align-top">
                  {item.lacunes.length === 0 && <span className="text-emerald-700">Aucune</span>}
                  <ul className="space-y-1">
                    {item.lacunes.map((lacune) => (
                      <li key={lacune.competenceId}>{lacune.libelle}</li>
                    ))}
                  </ul>
                  <Link
                    to="/diagnostic"
                    onClick={() => setMasterId(item.master.id)}
                    className="inline-block mt-3 text-[#1e3a8a] font-medium"
                  >
                    Voir le diagnostic
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
