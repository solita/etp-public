<script>
  import Header from '@Component/header';
  import { _ } from '@Localization/localization';
  import Router  from '@Router/router';

  import Button, { styles as buttonStyles } from '@Component/button';
</script>

<style>
  :global(h1) {
    @apply text-ashblue uppercase font-bold;
  }

  :global(h2) {
    @apply uppercase tracking-widest font-bold;
  }

  .applicationcontainer {
    max-width: 1440px;
  }
</style>

<div class="applicationcontainer m-auto font-body font-medium">
  <Header />

  <main class="w-full">
    <Router />
  </main>

  <footer class="w-full flex flex-col bg-grey px-16 py-16">
    <article class="flex -mx-4">
      <section class="w-1/3 px-4">
        <h2 class="mb-4">
          Energiatodistukset sekä niiden käyttö perustuu lakiin ja sitä
          valvotaan
        </h2>
        <p>
          Asumisen rahoitus- ja kehittämiskeskus (ARA) on valtion viranomainen,
          joka valvoo todistusten käyttöä ja oikeellisuutta. Vastaamme myös
          tämän palvelun ylläpidosta. Palvelua ja valvontaa hoitavat rautaiset
          energia-ammattilaisemme. Jos sinulla on kysyttävää, otathan yhteyttä!
        </p>
        <a href="/" class="underline text-green">Siirry ARA.fi</a>
      </section>
      <section class="w-1/3 flex flex-col justify-between px-4">
        <h2 class="mb-4">Ota yhteyttä</h2>
        <address class="not-italic">
          <span>Sähköposti:</span>
          <a href="/" class="underline text-green">energiatodistus@ara.fi</a>
        </address>
        <address class="not-italic">
          <ol>
            <li>Asumisen rahoitus- ja kehittämiskeskus</li>
            <li>PL 30</li>
            <li>15141</li>
            <li>LAHTI</li>
          </ol>
        </address>
        <address class="not-italic">
          <span>Puhelinvaihde:</span>
          <a href="/" class="underline text-green">029 525 0800</a>
        </address>
        <a href="/" class="block underline text-green">Tietoa sivustosta</a>
      </section>
      <div class="w-1/3 flex flex-col justify px-4 -my-4">
        <section class="py-4">
          <h2 class="mb-4">Laatijoiden pavelu</h2>
          <Button
            on:click={() => console.log('click')}
            {...buttonStyles.ashblue}>
            Kirjaudu
          </Button>
        </section>
        <section class="py-4">
          <h2 class="mb-4">palaute on aina tervetullutta</h2>
          <Button {...buttonStyles.green}>Lähetä palautetta</Button>
        </section>
      </div>
    </article>

    <div class="my-8 border-t-2 border-gray-400">
      <img
        src="images/ara-logo.png"
        alt="ARA - asumisen rakennus- ja kehityskeskus" />
    </div>
  </footer>
</div>
