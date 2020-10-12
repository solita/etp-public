import { readable } from 'svelte/store';
import * as LaatijaApi from '@/api/laatija-api';
import * as GeoApi from '@/api/geo-api';

export const laatijat = readable(null, set => set(LaatijaApi.laatijat(fetch)));

export const patevyydet = readable(null, set =>
  set(LaatijaApi.patevyydet(fetch))
);

export const postinumerot = readable(null, set =>
  set(GeoApi.postinumerot(fetch))
);

export const toimintaalueet = readable(null, set =>
  set(GeoApi.toimintaalueet(fetch))
);

export const kunnat = readable(null, set => set(GeoApi.kunnat(fetch)));
