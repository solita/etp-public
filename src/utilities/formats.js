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

export const formatNumber = n => Intl.NumberFormat('fi').format(n);

export const formatDateISO = date =>
  !isNaN(date.getTime()) ? formatISO(date, { representation: 'date' }) : '';

export const formatPercent = number => `${number} %`;