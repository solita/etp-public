<script>
  import EtHakuImage from '@Asset/ethaku.jpg';
  import LaatijaHakuImage from '@Asset/laatijahaku.jpg';

  import BorderImage from '@Component/border-image/border-image';

  import Hero from '@Component/hero/hero';
  import Button, { styles as buttonStyles } from '@Component/button';
  import Input from '@Component/input';
</script>

<style>
  h3 {
    @apply text-green uppercase tracking-wider font-bold;
  }
</style>

<Hero />

<article class="flex bg-beige pb-16 px-16">
  <div class="flex -mx-16">
    <section class="w-1/2 justify-between relative px-16 flex flex-col">
      <BorderImage src={EtHakuImage} />
      <div>
        <h2 class="mb-4">Hae rakennuksen energiatodistus</h2>
        <p>
          Palvelusta pystyt nopeasti tarkistamaan onko rakennukselle laadittu
          energiatodistus. Rekisteristä löydät 1.5.2015 alkaen laaditut
          todistukset.
        </p>
      </div>
      <div class="flex flex-col items-start -my-4">
        <strong class="block py-4">Hae energiatodistusta</strong>
        <Input label={'Hae todistustunnuksella'} value={''} />
        <aside class="italic text-sm font-normal mt-4">
          Voit hakea hallintoalueella, kunnalla, postinumerolla, toimipaikalla
          tai katuosoitteella
        </aside>
        <Input label={'Hae alueella'} value={''} />
        <Button {...buttonStyles.green}>Hae</Button>
      </div>
    </section>
    <section class="w-1/2 justify-between relative px-16 flex flex-col">
      <BorderImage src={LaatijaHakuImage} />
      <div>
        <h2 class="mb-4">Tarvitsetko energiatodistuksen? Löydä laatija!</h2>
        <p>
          Jos olet myymässä tai vuokraamassa rakennusta tai asuntoa, löydät
          laatijarekisteristä ne henkilöt, joilla on lainmukainen, virallinen
          pätevyys energiatodistusten tekoon.
        </p>
      </div>
      <div class="flex flex-col items-start -my-4">
        <strong class="block py-4">Hae todistusten laatijoita</strong>
        <Input label={'Hae nimellä'} value={''} />
        <aside class="italic text-sm font-normal mt-4">
          Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
        </aside>
        <Input label={'Hae alueella'} value={''} />
        <Button {...buttonStyles.green}>Hae</Button>
      </div>
    </section>
  </div>
</article>

<article class="flex">
  <section class="text-white bg-ashblue w-1/3 py-16 pl-16 pr-4">
    <span class="font-icon text-6xl">info</span>
    <h2 class="mb-4 text-white">Käytä vain virallista energiatodistusta</h2>
    <p>
      Mistä tunnistaa virallisen energiatodistuksen? Kaikista 1.5.2015 jälkeen
      laadituissa virallisissa energiatodistuksissa on todistustunnus, jolla
      löydät todistuksen tästä palvelusta. Sen lisäksi todistus on värisävyltään
      sininen, sähköisesti allekirjoitettu ja pituudeltaan 8 sivua sekä voimassa
      10 vuotta. Myös aiempi ”vihreä energiatodistus” voi olla virallinen.
      Todistuksessa mainitaan aina sen viimeinen voimassaolopäivä.
    </p>
    <Button {...buttonStyles.white}>Katso energiatodistusmalli</Button>
  </section>
  <section class="bg-white w-2/3 pl-8 pr-16 py-16">
    <h2 class="mb-4 text-ashblue text-lg">Lisätietoa energiatodistuksista</h2>
    <div class="flex -mx-4">
      <section class="px-4 w-1/2">
        <h3 class="mb-4">Motiva Oy:n energiatodistuspavelu</h3>
        <div class="flex flex-col -my-2">
          <div class="py-2">
            <strong>Tietoa kuluttajalle</strong>
            <ul>
              <li>Mikä on energiatodistus?</li>
              <li>Miten luen energiatodistusta?</li>
              <li>Milloin energiatodistus tarvitaan?</li>
              <li>Usein kysytyt kysymykset</li>
            </ul>
          </div>
          <div class="py-2">
            <strong>Tietoa ammattilaisille</strong>
            <ul>
              <li>Tietoa energiatodistuksen laatijoille</li>
              <li>Kiinnostaako energiatodistuksen laatijan pätevyys?</li>
            </ul>
          </div>
          <a href="/notimplemented" class="block py-2 underline text-green">
            Siirry Motivan Energiatodistuspalveluun
          </a>
        </div>
      </section>
      <section class="px-4 w-1/2">
        <h3 class="mb-4">Tilastot rakennusten energiatodistuksista</h3>
        <div class="flex flex-col -my-2">
          <p class="block py-2">
            ARA julkaisee verkkosivuillaan tilastoja eri käyttötarkoituksessa
            olevien rakennusten energiatodistuksista. Tilastoituna ovat
            erilaisten asuinrakennusten lisäksi muun muassa koulut ja päiväkodit
            sekä toimistorakennukset.
          </p>
          <a href="/notimplemented" class="block py-2 underline text-green">
            Siirry tutustumaan ARAn energiatodistustilastoihin
          </a>
        </div>
      </section>
    </div>
  </section>
</article>
