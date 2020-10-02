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
