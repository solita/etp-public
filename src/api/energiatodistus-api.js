import * as EtHakuUtils from '@/utilities/ethaku';

const baseUrl = '/api/public';

const energiatodistuksetUrl = `${baseUrl}/energiatodistukset`;

const fetchJson = (fetch, url) => fetch(url).then(response => response.json());

const zip = (arr1, arr2) => {
  const result = [];
  const len = Math.min(arr1.length, arr2.length);
  for (let i = 0; i < len; ++i) {
    result[i] = [arr1[i], arr2[i]];
  }

  return result;
};

export const energiatodistukset = (fetch, opts) => {
  const filteredOpts = Object.keys(opts).reduce(
    (acc, item) => ({ ...acc, ...(opts[item] ? { [item]: opts[item] } : {}) }),
    {}
  );

  if (
    Object.keys(filteredOpts).some(item => ['where', 'keyword'].includes(item))
  )
    return Promise.resolve([]);

  const qs = encodeURI(
    zip(Object.keys(filteredOpts), Object.values(filteredOpts))
      .map(item => item.join('='))
      .join('&')
  );

  const url = `${energiatodistuksetUrl}${qs.length ? `?${qs}` : ''}`;

  return fetchJson(fetch, url);
};
