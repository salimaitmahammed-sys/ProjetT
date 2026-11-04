export function evaluer(master, data, parcoursId, cochees, hors) {
  const acquis = new Set(hors)
  for (const lien of data.liens) {
    if (cochees.has(lien.ueId)) acquis.add(lien.competenceId)
  }

  const lignes = data.regles
    .filter((regle) => regle.masterId === master.id)
    .map((regle) => {
      const competence = data.competences.find((item) => item.id === regle.competenceId)
      const ues = data.ues.filter(
        (ue) =>
          ue.parcoursIds.includes(parcoursId) &&
          data.liens.some(
            (lien) => lien.ueId === ue.id && lien.competenceId === regle.competenceId,
          ),
      )
      return {
        ...regle,
        libelle: competence?.libelle ?? regle.competenceId,
        couverte: acquis.has(regle.competenceId),
        ues,
      }
    })

  const total = lignes.length
  const presentes = lignes.filter((ligne) => ligne.couverte).length
  return {
    lignes,
    match: total === 0 ? null : Math.round((presentes / total) * 100),
    lacunes: lignes.filter((ligne) => !ligne.couverte),
    dossier: data.dossier.filter((item) => item.masterId === master.id),
  }
}
