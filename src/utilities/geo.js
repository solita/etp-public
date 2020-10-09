export const isLabelMatch = haku => item =>
  item['label-fi'].toUpperCase() === haku.toUpperCase() ||
  item['label-sv'].toUpperCase() === haku.toUpperCase();

export const findToimintaalue = (toimintaalueet, toimintaalueId) =>
  toimintaalueet.find(toimintaalue => toimintaalue.id === toimintaalueId);

export const findToimintaalueetByMaakunta = (maakunta, toimintaalueet) =>
  new Set(
    toimintaalueet
      .filter(isLabelMatch(maakunta))
      .map(toimintaalue => toimintaalue.id)
  );

export const findToimintaalueIdtByKuntaIdt = (kuntaidt, kunnat) =>
  new Set(
    kunnat
      .filter(kunta => kuntaidt.has(kunta.id))
      .map(kunta => kunta['toimintaalue-id'])
  );

export const findToimintaalueIdtByKunta = (kunta, kunnat) =>
  findToimintaalueIdtByKuntaIdt(
    new Set(kunnat.filter(isLabelMatch(kunta)).map(k => k.id)),
    kunnat
  );

export const findKuntaIdtByPostitoimipaikka = (
  postitoimipaikka,
  postinumerot
) =>
  new Set(
    postinumerot
      .filter(isLabelMatch(postitoimipaikka))
      .map(numero => numero['kunta-id'])
  );

export const findKuntaIdtByPostinumero = (postinumero, postinumerot) =>
  new Set(
    postinumerot
      .filter(numero => numero.id === postinumero)
      .map(numero => numero['kunta-id'])
  );

export const findToimintaalueIdt = (
  haku,
  toimintaalueet,
  kunnat,
  postinumerot
) => {
  const postinumero = parseInt(haku);
  if (!isNaN(postinumero)) {
    return findToimintaalueIdtByKuntaIdt(
      findKuntaIdtByPostinumero(postinumero, postinumerot),
      kunnat
    );
  }

  return new Set([
    ...findToimintaalueIdtByKuntaIdt(
      findKuntaIdtByPostitoimipaikka(haku, postinumerot),
      kunnat
    ),
    ...findToimintaalueIdtByKunta(haku, kunnat),
    ...findToimintaalueetByMaakunta(haku, toimintaalueet)
  ]);
};
