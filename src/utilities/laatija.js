import * as Geo from './geo';

export const calculateLaatijaWeight = (toimintaalue, datenow, laatija) =>
  weightByToimintaalue(toimintaalue, laatija['toimintaalue-id']) +
  weightByMuuToimintaalue(toimintaalue, laatija.muuttoimintaalueet) +
  weightByJulkisettiedot(
    laatija.julkinenwwwosoite,
    laatija.julkinenpuhelin,
    laatija.julkinenemail
  ) +
  weightByActivity(laatija.login, datenow);

export const weightByToimintaalueet = (haetutToimintaalueet, toimintaalue) =>
  haetutToimintaalueet.has(toimintaalue) ? 2 : 0;

export const weightByMuutToimintaalueet = (
  haetutToimintaalueet,
  muuttoimintaalueet
) => (muuttoimintaalueet.some(ta => haetutToimintaalueet.has(ta)) ? 1 : 0);

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

export const laatijatByAluehaku = (laatijat, toimintaalueet) =>
  new Set(
    laatijat
      .filter(
        laatija =>
          toimintaalueet.has(laatija['toimintaalue-id']) ||
          laatija.muuttoimintaalueet.some(toimintaalue =>
            toimintaalueet.has(toimintaalue)
          )
      )
      .map(laatija => laatija.id)
  );

export const laatijatByHakukriteerit = (nimihaku, laatijat, toimintaalueet) => {
  const nimet = laatijatByNimihaku(nimihaku, laatijat);

  const alueet = laatijatByAluehaku(
    laatijat.filter(laatija => nimet.has(laatija.id)),
    toimintaalueet
  );

  return laatijat.filter(laatija => alueet.has(laatija.id));
};
