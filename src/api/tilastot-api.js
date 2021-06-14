const baseUrl = '/api/public';

const statisticsUrl = `${baseUrl}/statistics/`;

const fetchJson = (fetch, url) => fetch(url).then(response => response.json());


const zip = obj => {
  const result = [];
  for (const key in obj) {
    result.push([key, obj[key]]);
  }

  return result;
};

export const statistics = (fetch, opts) => {
  const filteredOpts = Object.keys(opts).reduce(
    (acc, item) => ({ ...acc, ...(opts[item] ? { [item]: opts[item] } : {}) }),
    {}
  );

  const qs = encodeURI(
    zip(filteredOpts)
      .map(item => item.join('='))
      .join('&')
  );

  const url = `${statisticsUrl}${qs.length ? `?${qs}` : ''}`;

  return fetchJson(fetch, url);
};