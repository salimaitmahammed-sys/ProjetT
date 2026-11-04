import { createContext, useContext, useMemo, useState } from "react"
import data from "../data/v1.json"
import { evaluer } from "../lib/match"

const ProfilContext = createContext(null)

const parcoursChoix = data.parcours.filter((item) => item.nature === "parcours")
const parcoursInitial = parcoursChoix.find((item) => item.nom === "Informatique-SHS") ?? parcoursChoix[0]

function uesDu(parcoursId) {
  return data.ues.filter((ue) => ue.parcoursIds.includes(parcoursId))
}

export function ProfilProvider({ children }) {
  const [parcoursId, setParcoursId] = useState(parcoursInitial.id)
  const [cochees, setCochees] = useState(() => new Set(uesDu(parcoursInitial.id).map((ue) => ue.id)))
  const [hors, setHors] = useState(() => new Set())
  const [masterId, setMasterId] = useState(
    () => data.masters.find((master) => master.etablissement === "UT1")?.id ?? data.masters[0].id,
  )

  const choisirParcours = (id) => {
    setParcoursId(id)
    setCochees(new Set(uesDu(id).map((ue) => ue.id)))
    setHors(new Set())
  }

  const toggleUe = (id) => {
    setCochees((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleHors = (id) => {
    setHors((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const ues = uesDu(parcoursId)
  const parcours = data.parcours.find((item) => item.id === parcoursId)
  const evaluations = useMemo(
    () => data.masters.map((master) => ({ master, ...evaluer(master, data, parcoursId, cochees, hors) })),
    [parcoursId, cochees, hors],
  )
  const selection = evaluations.find((item) => item.master.id === masterId) ?? evaluations[0]

  return (
    <ProfilContext.Provider
      value={{
        data,
        parcoursChoix,
        parcours,
        choisirParcours,
        ues,
        cochees,
        toggleUe,
        hors,
        toggleHors,
        masterId,
        setMasterId,
        evaluations,
        selection,
      }}
    >
      {children}
    </ProfilContext.Provider>
  )
}

export function useProfil() {
  const contexte = useContext(ProfilContext)
  if (!contexte) throw new Error("useProfil hors du provider")
  return contexte
}
