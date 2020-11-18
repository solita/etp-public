import * as parsers from '@/utilities/parsers';

import isValid from 'date-fns/isValid';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';

const optionalNumber = value =>
  value === '' || !isNaN(parsers.parseInteger(value));

const optionalRange = (min, max) => value => {
  if (value === '') return true;
  if (min > max) return true;
  const v = parsers.parseInteger(value);

  return v >= min && v <= max;
};

const optionalString = max => value => value.length <= max;
const optionalDateBetween = (min, max) => value => {
  const minP = parsers.parseDate(min);
  const maxP = parsers.parseDate(max);
  const valueP = parsers.parseDate(value);

  if (!isValid(valueP)) return true;

  if (isValid(minP) && !(isAfter(valueP, minP) || isEqual(valueP, minP))) {
    return false;
  }

  if (isValid(maxP) && !(isBefore(valueP, maxP) || isEqual(valueP, maxP))) {
    return false;
  }

  return true;
};

const optionalRakennustunnus = value =>
  value.length === 0 || value.toUpperCase().match(/^1\d{8}[A-Z0-9]{1}$/);

export const defaultSearchModel = () => ({
  id: '',
  versio: '0',
  'perustiedot.nimi': '',
  'perustiedot.rakennustunnus': '',
  'perustiedot.valmistumisvuosi_min': '',
  'perustiedot.valmistumisvuosi_max': '',
  laatimispaiva_min: '',
  laatimispaiva_max: '',
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

export const parseModel = () => ({
  id: parsers.parseInteger,
  versio: parsers.parseInteger,
  'perustiedot.valmistumisvuosi_min': parsers.parseInteger,
  'perustiedot.valmistumisvuosi_max': parsers.parseInteger,
  'voimassaolo-paattymisaika_min': parsers.parseDate,
  'voimassaolo-paattymisaika_max': parsers.parseDate,
  'tulokset.e-luku_min': parsers.parseInteger,
  'tulokset.e-luku_max': parsers.parseInteger,
  'lahtotiedot.lammitetty-nettoala_min': parsers.parseInteger,
  'lahtotiedot.lammitetty-nettoala_max': parsers.parseInteger
});

export const validationModel = () => ({
  id: optionalNumber,
  versio: () => true,
  'perustiedot.nimi': optionalString(100),
  'perustiedot.rakennustunnus': optionalRakennustunnus,
  'perustiedot.valmistumisvuosi_min': optionalRange,
  'perustiedot.valmistumisvuosi_max': optionalRange,
  laatimispaiva_min: optionalDateBetween,
  laatimispaiva_max: optionalDateBetween,
  'voimassaolo-paattymisaika_min': optionalDateBetween,
  'voimassaolo-paattymisaika_max': optionalDateBetween,
  kayttotarkoitusluokka: () => true,
  alakayttotarkoitusluokka: () => true,
  'tulokset.e-luku_min': optionalRange,
  'tulokset.e-luku_max': optionalRange,
  'tulokset.e-luokka': () => true,
  'lahtotiedot.lammitetty-nettoala_min': optionalNumber,
  'lahtotiedot.lammitetty-nettoala_max': optionalNumber
});

export const includeInSearch = (key, value) => {
  const numberValue = parseInt(value);
  switch (key) {
    case 'versio':
      return !isNaN(numberValue) && numberValue !== 0;
    case 'id':
    case 'perustiedot.valmistumisvuosi':
    case 'tulokset.e-luku':
    case 'lahtotiedot.lammitetty-nettoala':
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
      [`${key}${op !== '=' ? (op === '>=' ? '_min' : '_max') : ''}`]: value + ''
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
  eq('id', model),
  ...(tarkennettu
    ? [
        eq('versio', model),
        eq('perustiedot.nimi', model),
        eq('perustiedot.rakennustunnus', model),
        gte('perustiedot.valmistumisvuosi', model),
        lte('perustiedot.valmistumisvuosi', model),
        gte('voimassaolo-paattymisaika', model),
        lte('voimassaolo-paattymisaika', model),
        gte('tulokset.e-luku', model),
        lte('tulokset.e-luku', model),
        ...(model['tulokset.e-luokka'].length
          ? [eq('tulokset.e-luokka', model)]
          : []),
        gte('lahtotiedot.lammitetty-nettoala', model),
        lte('lahtotiedot.lammitetty-nettoala', model)
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

export const isValidSearch = (tarkennettu, where, keyword) => {
  if (!keyword.length) return true;
};
