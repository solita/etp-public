export const findToimintaalue = (toimintaalueet, toimintaalueId) =>
  toimintaalueet.find(toimintaalue => toimintaalue.id === toimintaalueId);
