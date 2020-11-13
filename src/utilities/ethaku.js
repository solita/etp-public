export const defaultSearchModel = () => ({
  id: '',
  versio: 0,
  'perustiedot.nimi': '',
  'perustiedot.rakennustunnus': '',
  'perustiedot.valmistumisvuosi_min': '',
  'perustiedot.valmistumisvuosi_max': '',
  laatimispaivaMin: '',
  laatimispaivaMax: '',
  'voimassaolo-paattymisaika_min': '',
  'voimassaolo-paattymisaika_max': '',
  kayttotarkoitusluokka: '',
  alakayttotarkoitusluokka: '',
  'tulokset.e-luku_min': '',
  'tulokset.e-luku_max': '',
  'tulokset.e-luokka': [],
  'lahtotiedot.lammitetty-nettoala_min': '',
  'lahtotiedot.lammitetty-nettoala_max': ''
});

export const includeInSearch = (key, value) => {
  const numberValue = parseInt(value);
  switch (key) {
    case 'versio':
      return !isNaN(numberValue) && numberValue !== 0;
    case 'id':
    case 'perustiedot.valmistumisvuosi_min':
    case 'perustiedot.valmistumisvuosi_max':
    case 'tulokset.e-luku_min':
    case 'tulokset.e-luku_max':
    case 'lahtotiedot.lammitetty-nettoala_min':
    case 'lahtotiedot.lammitetty-nettoala_max':
      return !isNaN(numberValue) && numberValue > 0;
    default:
      return value.length;
  }
};

export const deserializeWhere = (model, where) => {
  let res;
  try {
    res = JSON.parse(where);
  } catch (e) {
    res = [[]];
  }

  const [and] = res;

  return and
    .map(([op, key, value]) => ({
      [`${key}${op !== '=' ? (op === '>=' ? '_min' : '_max') : ''}`]: value
    }))
    .reduce((acc, item) => ({ ...acc, ...item }), model);
};

const eq = (key, model, format = a => a) => ['=', key, format(model[key])];
const lte = (key, model, format = a => a) => [
  '<=',
  key,
  format(model[`${key}_max`])
];
const gte = (key, model, format = a => a) => [
  '>=',
  key,
  format(model[`${key}_min`])
];

export const where = (tarkennettu, model) => [
  eq('id', model, parseInt),
  ...(tarkennettu
    ? [
        eq('versio', model, parseInt),
        eq('perustiedot.nimi', model),
        eq('perustiedot.rakennustunnus', model),
        gte('perustiedot.valmistumisvuosi', model, parseInt),
        lte('perustiedot.valmistumisvuosi', model, parseInt),

        lte('voimassaolo-paattymisaika', model),
        gte('tulokset.e-luku', model, parseInt),
        lte('tulokset.e-luku', model, parseInt),
        ...(model['tulokset.e-luokka'].length
          ? [eq('tulokset.e-luokka', model)]
          : []),
        gte('lahtotiedot.lammitetty-nettoala', model, parseInt),
        lte('lahtotiedot.lammitetty-nettoala', model, parseInt)
      ]
    : [])
];

export const whereQueryString = where => {
  const qs = JSON.stringify([
    where.filter(item => {
      const [value, key] = [...item].reverse();
      return includeInSearch(key, value);
    })
  ]);

  return qs !== '[[]]' ? qs : '';
};
