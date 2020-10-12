export const calculateLaatijaWeight = (toimintaalueet, laatija) =>
  weightByToimintaalueet(toimintaalueet, laatija['toimintaalue-id']) +
  weightByMuutToimintaalueet(toimintaalueet, laatija.muuttoimintaalueet) +
  weightByJulkisettiedot(laatija.wwwosoite, laatija.puhelin, laatija.email);

export const weightByToimintaalueet = (haetutToimintaalueet, toimintaalue) =>
  haetutToimintaalueet.has(toimintaalue) ? 2 : 0;

export const weightByMuutToimintaalueet = (
  haetutToimintaalueet,
  muuttoimintaalueet
) => (muuttoimintaalueet.some(ta => haetutToimintaalueet.has(ta)) ? 1 : 0);

export const weightByJulkisettiedot = (wwwosoite, puhelin, email) =>
  wwwosoite || puhelin || email ? 2 : 0;

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

export const laatijatByAluehaku = (laatijat, toimintaalueet) => {
  if (!toimintaalueet.size) return new Set(laatijat.map(laatija => laatija.id));
  return new Set(
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
};

export const laatijatByHakukriteerit = (nimihaku, laatijat, toimintaalueet) => {
  const nimet = laatijatByNimihaku(nimihaku, laatijat);

  const alueet = laatijatByAluehaku(
    laatijat.filter(laatija => nimet.has(laatija.id)),
    toimintaalueet
  );

  return laatijat.filter(laatija => alueet.has(laatija.id));
};
