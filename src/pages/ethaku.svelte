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
  <div class="px-16 py-8 flex items-start">
    <div class="flex flex-col w-9/12">
      <div class="w-1/2">
        <Input label={'Hae todistustunnuksella'} value={''} />
      </div>
      <aside class="font-normal text-xs italic mt-4">
        Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
      </aside>
      <div class="flex">
        <div class="w-1/2">
          <Input label="Hae alueella" value={''} />
        </div>
        <a class="inline-flex items-center ml-4 text-green" href="/">
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
</Container>
