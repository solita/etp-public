<script>
  import Button, { styles as buttonStyles } from '@Component/button';
</script>

<style>
  input {
    background-color: transparent;
  }

  input::placeholder {
    @apply text-black;
  }
</style>

<article class="flex flex-col bg-white">
  <section
    class="px-16 flex flex-col justify-center items-center bg-beige py-8">
    <h2 class="font-bold text-ashblue text-xl tracking-widest mb-4">
      Tarvitset energiatodistuksen myydessä, vuokratessa ja rakennuslupaa
      hakiessa
    </h2>
    <div class="flex items-center">
      <span class="font-icon text-6xl mr-4 text-ashblue">info</span>
      <p class="font-medium">
        Energiatodistus tarvitaan lähes aina myytäessä asuntoa tai rakennusta.
        Se on hyvä hankkia jo ennen myyntiin laittoa. Lain mukaan
        energiatehokkuusluokan pitää näkyä myynti-ilmoituksessa ja
        energiatodistuksen olla nähtävillä asunnon tai talon esittelyssä.
        Energiatodistus tarvitaan myös lähes aina haettaessa rakennuslupaa ja
        päivitettävä, kun rakennus otetaan käyttöön.
      </p>
    </div>
  </section>
  <div class="px-16 py-8 flex items-start">
    <div class="flex flex-col w-9/12">
      <label for="todistustunnushaku" class="sr-only">
        Hae todistustunnuksella
      </label>
      <div
        class="mb-4 w-1/2 rounded-full border-2 px-4 py-2 bg-white border-black
        hover:bg-beige">
        <input
          id="todistustunnushaku"
          class="w-full focus:outline-none"
          placeholder="Hae todistustunnuksella" />
      </div>
      <div>
        <label for="aluehaku" class="sr-only">Hae alueella</label>
        <aside class="text-xs italic">
          Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
        </aside>
        <div
          class="inline-block w-1/2 rounded-full border-2 px-4 py-2 border-black
          hover:bg-beige">
          <input
            id="aluehaku"
            class="w-full bg-white focus:outline-none"
            placeholder="Hae alueella" />
        </div>
        <a class="inline-flex items-center ml-4 text-green" href="#">
          <span class="uppercase font-bold">Lisää hakuehtoja</span>
          <span class="font-icon text-4xl">expand_more</span>
        </a>
      </div>
      <div class="mt-2">
        <Button {...buttonStyles.green}>Hae</Button>
        <Button {...buttonStyles.green}>Tyhjennä hakuehdot</Button>
      </div>
    </div>
    <aside
      class="w-3/12 pl-4 border-l-8 border-ashblue text-ashblue italic text-sm">
      Energiatodistuksesta saa nähtäväksi koosteen eli kahden ensimmäisen sivun
      tiedot (henkilötietosuojan vuoksi ei kuitenkaan 1-2 huoneistoa koskevista
      kohteista).
    </aside>
  </div>
</article>
