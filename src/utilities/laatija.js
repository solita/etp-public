export const calculateLaatijaWeight = (toimintaalue, datenow, laatija) =>
  weightByToimintaalue(toimintaalue, laatija.toimintaalue) +
  weightByMuuToimintaalue(toimintaalue, laatija.muuttoimintaalueet) +
  weightByJulkisettiedot(
    laatija.julkinenwwwosoite,
    laatija.julkinenpuhelin,
    laatija.julkinenemail
  ) +
  weightByActivity(laatija.login, datenow);

export const weightByToimintaalue = (haettuToimintaalue, toimintaalue) =>
  toimintaalue === haettuToimintaalue ? 2 : 0;

export const weightByMuuToimintaalue = (
  haettuToimintaalue,
  muuttoimintaalueet
) => (muuttoimintaalueet.includes(haettuToimintaalue) ? 1 : 0);

export const weightByJulkisettiedot = (
  julkinenwwwosoite,
  julkinenpuhelin,
  julkinenemail
) => (julkinenwwwosoite || julkinenpuhelin || julkinenemail ? 2 : 0);

export const weightByActivity = (datenow, login) => {
  const days = Math.floor(
    (datenow.getTime() - login.getTime()) / (1000 * 60 * 60 * 24)
  );

  return days <= Math.floor(365 / 2) ? 1 : 0;
};

export const findPatevyys = (patevyydet, laatija) =>
  patevyydet.find(patevyys => patevyys.id === laatija.patevyystaso);

export const laatijatByNimihaku = (nimihaku, laatijat) =>
  new Set(
    laatijat
      .filter(laatija =>
        laatija.nimi.toUpperCase().includes(nimihaku.toUpperCase())
      )
      .map(laatija => laatija.id)
  );

export const laatijatByAluehaku = (aluehaku, laatijat) => {
  return new Set();
};

export const laatijatByHakukriteerit = (nimihaku, aluehaku, laatijat) => {
  const nimet = laatijatByNimihaku(nimihaku, laatijat);
  const alueet = laatijatByAluehaku(aluehaku, laatijat);

  const passingLaatijaIds = new Set([...nimet, ...alueet]);

  return laatijat.filter(laatija => passingLaatijaIds.has(laatija.id));
};
