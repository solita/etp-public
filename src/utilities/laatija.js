import * as Geo from './geo';

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

export const laatijatByNimihaku = (nimihaku, laatijat) => {
  if (!nimihaku) return new Set(laatijat.map(laatija => laatija.id));
  return new Set(
    laatijat
      .filter(laatija =>
        laatija.nimi.toUpperCase().includes(nimihaku.toUpperCase())
      )
      .map(laatija => laatija.id)
  );
};

export const laatijatByAluehaku = (
  aluehaku,
  laatijat,
  toimintaalueet,
  postinumerot,
  kunnat
) => {
  if (!aluehaku) return new Set(laatijat.map(laatija => laatija.id));

  const t = Geo.findToimintaalueIdt(
    aluehaku,
    toimintaalueet,
    kunnat,
    postinumerot
  );
  return new Set(
    laatijat
      .filter(
        laatija =>
          t.has(laatija['toimintaalue-id']) ||
          laatija.muuttoimintaalueet.some(toimintaalue => t.has(toimintaalue))
      )
      .map(laatija => laatija.id)
  );
};

export const laatijatByHakukriteerit = (
  nimihaku,
  aluehaku,
  laatijat,
  toimintaalueet,
  postinumerot,
  kunnat
) => {
  const nimet = laatijatByNimihaku(nimihaku, laatijat);

  const alueet = laatijatByAluehaku(
    aluehaku,
    laatijat.filter(laatija => nimet.has(laatija.id)),
    toimintaalueet,
    postinumerot,
    kunnat
  );

  return laatijat.filter(laatija => alueet.has(laatija.id));
};
