const baseUrl = '/api/public';

const toimintaalueetUrl = `${baseUrl}/toimintaalueet/`;
const countriesUrl = `${baseUrl}/toimintaalueet/`;
const postinumerotUrl = `${baseUrl}/postinumerot`;

export const toimintaalueet = fetch =>
  fetch(toimintaalueetUrl).then(response => response.json());
export const countries = fetch =>
  fetch(countriesUrl).then(response => response.json());
export const postinumerot = fetch =>
  fetch(postinumerotUrl).then(response => response.json());
