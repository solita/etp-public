<script>
  import Button, { styles as buttonStyles } from '@Component/button';
  import Container, { styles as containerStyles } from '@Component/container';
</script>

<Container {...containerStyles.grey}>
  <footer class="flex flex-col bg-grey px-2 sm:px-16 py-4 sm:py-16">
    <article class="flex flex-col md:flex-row md:my-0 md:space-x-4">
      <section class="md:w-1/3 py-4 md:py-0">
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
      <section class="md:w-1/3 flex flex-col justify-between py-4 md:py-0">
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
      <div class="md:w-1/3 flex flex-col py-4 md:py-0">
        <section>
          <h2 class="mb-4">Laatijoiden pavelu</h2>
          <Button {...buttonStyles.ashblue}>Kirjaudu</Button>
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
</Container>
