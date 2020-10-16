<script context="module">
  import router from 'page';
  import { writable } from 'svelte/store';

  export const activePath = writable(location.pathname);

  export const navigate = path => router(path);
</script>

<script>
  import { parse } from 'qs';

  import Home from '@Page/home';
  import EnergiatodistusHaku from '@Page/ethaku';
  import LaatijaHaku from '@Page/laatijahaku';
  import Laatija from '@Page/laatija';
  import LaatijanKirjautuminen from '@Page/laatijankirjautuminen';

  let page;
  let params;

  router('*', ({ pathname, querystring }, next) => {
    activePath.set(pathname);
    params = parse(querystring);
    next();
  });
  router('/ethaku', () => {
    page = EnergiatodistusHaku;
  });
  router('/laatijahaku', () => {
    page = LaatijaHaku;
  });
  router('/laatija', () => {
    page = Laatija;
  });
  router('/laatijankirjautuminen', () => {
    page = LaatijanKirjautuminen;
  });
  router('/', () => (page = Home));

  router.start();
</script>

<svelte:component this={page} {...params} />
