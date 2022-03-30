import subDays from 'date-fns/subDays';
import formatISO from 'date-fns/formatISO';

export const formatApiDate = date => date.toJSON();

export const formatDate = date =>
  Intl.DateTimeFormat('fi-FI', {
    timeZone: 'Europe/Helsinki',
    dateStyle: 'medium'
  }).format(date);

export const formatExclusiveEndDate = date =>
  Intl.DateTimeFormat('fi-FI', {
    timeZone: 'Europe/Helsinki',
    dateStyle: 'medium'
  }).format(subDays(date, 1));

const numberFormatter = Intl.NumberFormat('fi', { maximumFractionDigits: 1 });
const smallNumberFormatter = Intl.NumberFormat('fi', {
  maximumFractionDigits: 2
});

export const formatNumber = n =>
  Math.abs(n) >= 1.5
    ? numberFormatter.format(n)
    : smallNumberFormatter.format(n);

export const formatDateISO = date =>
  !isNaN(date.getTime()) ? formatISO(date, { representation: 'date' }) : '';

export const formatPercent = number => `${number} %`;
