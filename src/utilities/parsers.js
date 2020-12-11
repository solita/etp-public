import parseISO from 'date-fns/parseISO';

export const match = (exp, value) => {
  const m = value.match(exp);
  if (m === null) return '';

  return m[0];
};

export const parseInteger = value =>
  parseInt(match(/^\d*$/, (value + '').trim()));

export const parseDate = value => {
  try {
    return parseISO(value.trim());
  } catch (e) {
    return '';
  }
};
