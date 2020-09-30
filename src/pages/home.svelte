<script>
  import EtHakuImage from '@Asset/ethaku.jpg';
  import LaatijaHakuImage from '@Asset/laatijahaku.jpg';

  import BorderImage from '@Component/border-image';

  import Hero from '@Component/hero';
  import Button, { styles as buttonStyles } from '@Component/button';
  import Input from '@Component/input';
  import Container, { styles as containerStyles } from '@Component/container';
</script>

<style>
  h3 {
    @apply text-green uppercase tracking-wider font-bold;
  }
</style>

<Hero />

<Container {...containerStyles.beige}>
  <article class="flex pb-16 px-2 sm:px-16">
    <div class="flex -mx-16 flex-col lg:flex-row">
      <section
        class="lg:w-1/2 justify-between relative px-16 flex flex-col flex-auto">
        <div class="flex justify-center lg:justify-start">
          <BorderImage src={EtHakuImage} />
        </div>
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
          <div class="mt-4">
            <Button {...buttonStyles.green}>Hae</Button>
          </div>
        </div>
      </section>
      <section
        class="lg:w-1/2 justify-between relative px-16 flex flex-col flex-auto
        mt-16 lg:mt-0">
        <div class="flex justify-center lg:justify-start">
          <BorderImage src={LaatijaHakuImage} />
        </div>
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
          <div class="mt-4">
            <Button {...buttonStyles.green}>Hae</Button>
          </div>
        </div>
      </section>
    </div>
  </article>
</Container>
<Container {...containerStyles.ashbluewhite}>
  <article class="flex lg:flex-row flex-col">
    <section
      class="text-white bg-ashblue lg:w-1/3 py-4 sm:py-16 px-2 sm:px-16 lg:pr-4">
      <span class="font-icon text-6xl">info</span>
      <h2 class="mb-4 text-white">Käytä vain virallista energiatodistusta</h2>
      <p>
        Mistä tunnistaa virallisen energiatodistuksen? Kaikista 1.5.2015 jälkeen
        laadituissa virallisissa energiatodistuksissa on todistustunnus, jolla
        löydät todistuksen tästä palvelusta. Sen lisäksi todistus on
        värisävyltään sininen, sähköisesti allekirjoitettu ja pituudeltaan 8
        sivua sekä voimassa 10 vuotta. Myös aiempi ”vihreä energiatodistus” voi
        olla virallinen. Todistuksessa mainitaan aina sen viimeinen
        voimassaolopäivä.
      </p>
      <div class="mt-4">
        <Button {...buttonStyles.white}>Katso energiatodistusmalli</Button>
      </div>
    </section>
    <section class="bg-white lg:w-2/3 lg:pl-8 px-2 sm:px-16 py-4 sm:py-16">
      <h2 class="mb-4 text-ashblue text-lg">Lisätietoa energiatodistuksista</h2>
      <div class="flex -mx-4 flex-col md:flex-row -my-4 md:my-0">
        <section class="px-4 md:w-1/2 py-4 md:py-0">
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
            <a href="/" class="block py-2 underline text-green">
              Siirry Motivan Energiatodistuspalveluun
            </a>
          </div>
        </section>
        <section class="px-4 md:w-1/2 py-4 md:py-0">
          <h3 class="mb-4">Tilastot rakennusten energiatodistuksista</h3>
          <div class="flex flex-col -my-2">
            <p class="block py-2">
              ARA julkaisee verkkosivuillaan tilastoja eri käyttötarkoituksessa
              olevien rakennusten energiatodistuksista. Tilastoituna ovat
              erilaisten asuinrakennusten lisäksi muun muassa koulut ja
              päiväkodit sekä toimistorakennukset.
            </p>
            <a href="/" class="block py-2 underline text-green">
              Siirry tutustumaan ARAn energiatodistustilastoihin
            </a>
          </div>
        </section>
      </div>
    </section>
  </article>
</Container>
