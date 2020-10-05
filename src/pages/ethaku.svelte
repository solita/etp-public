<script>
  import Button, { styles as buttonStyles } from '@Component/button';
  import Input from '@Component/input';
  import InfoBlock from '@Component/info-block';
  import Container, { styles as containerStyles } from '@Component/container';
</script>

<Container {...containerStyles.beige}>
  <InfoBlock
    title="Tarvitset energiatodistuksen myydessä, vuokratessa ja rakennuslupaa
  hakiessa">
    Energiatodistus tarvitaan lähes aina myytäessä asuntoa tai rakennusta. Se on
    hyvä hankkia jo ennen myyntiin laittoa. Lain mukaan energiatehokkuusluokan
    pitää näkyä myynti-ilmoituksessa ja energiatodistuksen olla nähtävillä
    asunnon tai talon esittelyssä. Energiatodistus tarvitaan myös lähes aina
    haettaessa rakennuslupaa ja päivitettävä, kun rakennus otetaan käyttöön.
  </InfoBlock>
</Container>
<Container {...containerStyles.white}>
  <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto flex flex-col md:flex-row items-center md:items-start">
    <div class="flex flex-col w-full md:w-9/12">
      <div class="w-full md:w-11/12">
        <Input label={'Hae todistustunnuksella'} value={''} />
      </div>
      <aside class="font-normal text-xs italic mt-4">
        Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
      </aside>
      <div class="flex">
        <div class="w-full md:w-11/12">
          <Input label="Hae alueella" value={''} />
        </div>
      </div>
      <div class="w-full md:w-11/12 flex flex-col sm:flex-row">
        <Button {...buttonStyles.green}>Hae</Button>
        <Button {...buttonStyles.green}>Tyhjennä hakuehdot</Button>
        <a class="inline-flex items-center self-center ml-4 text-green order-first md:order-none" href="/">
          <span class="uppercase font-bold">Lisää hakuehtoja</span>
          <span class="font-icon text-4xl">expand_more</span>
        </a>
      </div>
    </div>
    <aside
      class="mt-4 md:mt-0 md:w-3/12 lg:pl-4 border-t-4 md:border-t-0 md:border-l-8 border-ashblue text-ashblue italic text-sm">
      Energiatodistuksesta saa nähtäväksi koosteen eli kahden ensimmäisen sivun
      tiedot (henkilötietosuojan vuoksi ei kuitenkaan 1-2 huoneistoa koskevista
      kohteista).
    </aside>
  </div>
</Container>
