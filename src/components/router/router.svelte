<script context="module">
  import { writable } from 'svelte/store';

  export const activePath = writable(location.pathname);
</script>

<script>
  import router from 'page';
  import { parse } from 'qs';

  import Home from '@Component/pages/home';
  import EnergiatodistusHaku from '@Component/pages/ethaku';
  import LaatijaHaku from '@Component/pages/laatijahaku';
  import LaatijanKirjautuminen from '@Component/pages/laatijankirjautuminen';
  import NotFound from '@Component/pages/notfound';

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
  router('/laatijankirjautuminen', () => {
    page = LaatijanKirjautuminen;
  });
  router('/', () => (page = Home));

  router('*', () => (page = NotFound));

  router.start();
</script>

<svelte:component this={page} {...params} />
