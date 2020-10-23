<script>
  import Button, { styles as buttonStyles } from '@Component/button';
  import InputSearch from '@Component/input-search';
  import InputText from '@Component/input-text';
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
  <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto">
    <div class="flex flex-col md:flex-row items-center md:items-start">
      <div class="flex flex-col w-full md:w-9/12">
        <div class="w-full md:w-11/12">
          <InputSearch label={'Hae todistustunnuksella'} value={''} />
        </div>
        <aside class="font-normal text-xs italic mt-4">
          Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
        </aside>
        <div class="flex">
          <div class="w-full md:w-11/12">
            <InputSearch label="Hae alueella" value={''} />
          </div>
        </div>
        <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
          <Button {...buttonStyles.green}>Hae</Button>
          <Button {...buttonStyles.ashblue}>Tyhjennä hakuehdot</Button>
          <a
            class="inline-flex items-center self-center ml-4 text-green order-first md:order-none"
            href="/">
            <span class="uppercase font-bold">Lisää hakuehtoja</span>
            <span class="font-icon text-4xl">expand_more</span>
          </a>
        </div>
      </div>
      <aside
        class="mt-4 md:mt-0 md:w-3/12 md:pl-4 md:border-l-8 border-ashblue text-ashblue italic text-sm">
        Energiatodistuksesta saa nähtäväksi koosteen eli kahden ensimmäisen
        sivun tiedot (henkilötietosuojan vuoksi ei kuitenkaan 1-2 huoneistoa
        koskevista kohteista).
      </aside>
    </div>
    <div
      class="tarkennettu-haku w-full flex flex-col my-4 py-4 border-t-2 border-b-2 border-green space-y-2">
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          Versio
        </span>
        <div class="w-1/2">checkbox x2</div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          Rakennuksen nimi
        </span>
        <div class="w-1/2">
          <InputText label={'rakennus'} />
        </div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          Pysyvä Rakennustunnus
        </span>
        <div class="w-1/2">
          <InputText label={'rakennus'} />
        </div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          takennuksen valmistumisvuosi
        </span>
        <div class="w-1/2 flex justify-between">
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
          <div><span>-</span></div>
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
        </div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          todistuksen laatimispäivä
        </span>
        <div class="w-1/2 flex justify-between">
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
          <div><span>-</span></div>
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
        </div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          viimeinen voimassaolopäivä
        </span>
        <div class="w-1/2 flex justify-between">
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
          <div><span>-</span></div>
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
        </div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          käyttötarkoitusluokka
        </span>
        <div class="w-1/2">
          <InputText label={'luokka'} />
        </div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          alakäyttötarkoitusluokka
        </span>
        <div class="w-1/2">
          <InputText label={'luokka'} />
        </div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          E-Luku (Kokonaisluku)
        </span>
        <div class="w-1/2 flex justify-between">
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
          <div><span>-</span></div>
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
        </div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          E-Luku (A-G)
        </span>
        <div class="w-1/2">checkbox x7</div>
      </div>
      <div class="w-full mx-auto center flex flex-col md:flex-row items-center">
        <span class="w-1/2 uppercase text-ashblue tracking-widest font-bold">
          Lämmitetty Nettoala (M2)
        </span>
        <div class="w-1/2 flex justify-between">
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
          <div><span>-</span></div>
          <div class="w-2/5">
            <InputText label={'?'} />
          </div>
        </div>
      </div>
    </div>
  </div>
</Container>
