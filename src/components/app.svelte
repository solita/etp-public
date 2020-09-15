<script>
  import Logo from '@Asset/logo.svg';
  import EtHakuImage from '@Asset/ethaku.jpg';
  import LaatijaHakuImage from '@Asset/laatijahaku.jpg';

  import BorderImage from '@Component/border-image/border-image';
  import Header from '@Component/header/header';
  import { locale, _ } from '@Component/localization/localization';
  import Router, { activePath } from '@Component/router/router';
</script>

<style>
  * {
    @apply font-body;
  }

  main,
  footer {
    @apply max-w-screen-xl m-auto;
  }

  h2 {
    @apply uppercase;
  }

  :global(h1) {
    @apply text-ashblue uppercase font-bold;
  }

  :global(h2) {
    @apply uppercase;
  }

  .mainnavigation {
    background: rgb(197, 225, 145);
    background: linear-gradient(
      90deg,
      rgba(197, 225, 145, 1) 50%,
      rgba(46, 80, 83, 1) 50%
    );
  }

  .navcontainer {
    flex-basis: 100%;
    @apply flex flex-grow py-4;
  }
</style>

<Header />

<main>
  <Router />
</main>

<footer class="flex flex-col bg-grey pt-16 px-16">
  <article class="flex">
    <section class="mr-8">
      <h2 class="mb-4">
        Energiatodistukset sekä niiden käyttö perustuu lakiin ja sitä valvotaan
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="mr-8">
      <h2 class="mb-4">Ota yhteyttä</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="mr-8">
      <h2 class="mb-4">Laatijoiden pavelu</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
  </article>

  <div class="my-8 border-t-2 border-gray-400">
    <img
      src="images/ara-logo.png"
      alt="ARA - asumisen rakennus- ja kehityskeskus" />
  </div>
</footer>
