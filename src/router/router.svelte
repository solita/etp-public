<script context="module">
  import { writable } from 'svelte/store';

  export const activePath = writable(location.pathname);
</script>

<script>
  import router from 'page';
  import { parse } from 'qs';

  import Home from '@Pages/home';
  import EnergiatodistusHaku from '@Pages/ethaku';
  import LaatijaHaku from '@Pages/laatijahaku';
  import LaatijanKirjautuminen from '@Pages/laatijankirjautuminen';

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

  router.start();
</script>

<svelte:component this={page} {...params} />
