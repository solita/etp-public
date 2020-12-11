import subDays from 'date-fns/subDays';

export const formatDate = date => Intl.DateTimeFormat('fi').format(date);

export const formatExclusiveEndDate = date =>
  Intl.DateTimeFormat('fi').format(subDays(date, 1));

export const formatNumber = n => Intl.NumberFormat('fi').format(n);
