<script>
  import * as LaatijaApi from '@/api/laatija-api';
  import * as GeoApi from '@/api/geo-api';
  import * as LaatijaUtils from '@/utilities/laatija';
  import * as GeoUtils from '@/utilities/geo';

  import { locale, labelLocale } from '@Localization/localization';
  import { navigate } from '@/router/router';

  import Button, { styles as buttonStyles } from '@Component/button';
  import Input from '@Component/input';
  import InfoBlock from '@Component/info-block';
  import TableLaatijahaku from '@Component/table-laatijahaku';
  import Container, { styles as containerStyles } from '@Component/container';

  export let nimihaku = '';
  export let aluehaku = '';
  
  let laatijat = [];
  let shownLaatijat = [];

  const deserialize = ([laatijat, patevyydet, toimintaalueet]) => laatijat.reduce((acc, laatija) => [
        ...acc,
        {
          id: laatija.id,
          nimi: `${laatija.etunimi} ${laatija.sukunimi}`,
          patevyystaso: labelLocale($locale, LaatijaUtils.findPatevyys(patevyydet, laatija)),
          toimintaalue: labelLocale(
            $locale,
            GeoUtils.findToimintaalue(toimintaalueet, laatija.toimintaalue)
          ) ?? '',
          postitoimipaikka: laatija.postitoimipaikka ?? '',
          wwwosoite: laatija.wwwosoite && !laatija.wwwosoite?.match(/^https+:\/\//) ? `//${laatija.wwwosoite}` : laatija.wwwosoite,
          email: laatija.email,
          puhelin: laatija.puhelin
        }
      ], []);

  let data = Promise.all([
    LaatijaApi.laatijat(fetch),
    LaatijaApi.patevyydet(fetch),
    GeoApi.toimintaalueet(fetch)
  ])
    .then(deserialize)
    .then(l => {
      laatijat = l;
      if (nimihaku.length > 0 || aluehaku.length > 0) {
        shownLaatijat = LaatijaUtils.laatijatByHakukriteerit(nimihaku, aluehaku, l);
      } else {
        shownLaatijat = l;
      }
    });

  const commitSearch = (nimihaku, aluehaku, laatijat) => {
    const qs = [...(nimihaku.length > 0 ? [['nimihaku', nimihaku].join('=')] : []), ...(aluehaku.length > 0 ? [['aluehaku', aluehaku].join('=')] : [])].join('&');
    navigate(`/laatijahaku${qs ? '?'+qs : ''}`); 
    shownLaatijat = LaatijaUtils.laatijatByHakukriteerit(nimihaku, aluehaku, laatijat);
  };
</script>

<svelte:window on:popstate={_ => shownLaatijat = LaatijaUtils.laatijatByHakukriteerit(nimihaku, aluehaku, laatijat)} />

<Container {...containerStyles.beige}>
  <InfoBlock title="Laatijalla pitää olla pätevyys">
    Energiatodistuksen voi laatia vain siihen pätevöitynyt tekniikan alan
    ammattilainen. He ovat suorittaneet virallisen pätevyystentin. Jos laatijaa
    ei löydy haustamme, hänellä ei ole pätevyyttä todistuksen tekoon.
  </InfoBlock>
  <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto flex flex-col md:flex-row items-center md:items-start">
    <div class="flex flex-col w-full md:w-9/12">
      <div class="w-full md:w-11/12">
        <Input label={'Hae nimellä'} bind:value={nimihaku} on:keydown={evt => {
          if (evt.keyCode === 13) {
            commitSearch(nimihaku, aluehaku, laatijat);
          }
        }} />
      </div>
      <aside class="font-normal text-xs italic mt-4">
        Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
      </aside>
      <div class="flex">
        <div class="w-full md:w-11/12">
          <Input label="Hae alueella" bind:value={aluehaku} on:keydown={evt => {
            if (evt.keyCode === 13) {
              commitSearch(nimihaku, aluehaku, laatijat);
            }
          }} />
        </div>
      </div>
      <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
        <Button {...buttonStyles.green} on:click={_ => commitSearch(nimihaku, aluehaku, laatijat)}>Hae</Button>
        <Button {...buttonStyles.green} on:click={_ => commitSearch('', '', laatijat)}>Tyhjennä hakuehdot</Button>
      </div>
    </div>
    <aside
      class="mt-4 md:mt-0 md:w-3/12 lg:pl-4 border-t-4 md:border-t-0 md:border-l-8 border-ashblue text-ashblue italic text-sm">
      Ylempi pätevyystaso vaaditaan kun lämmönsiirron kokonaisenergiankulutuksen
      laskennassa tulee ottaa huomioon rakenteiden lämmönvarausominaisuus ajasta
      riippuvaisenna. Käytännössä näitä kohteita ovat jäähdytetyt
      uudisrakennukset.
    </aside>
  </div>
  </Container>

  <Container {...containerStyles.white}>  
  {#if shownLaatijat}
    <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col w-full">
      <h2>Tuloksia</h2>
      <TableLaatijahaku laatijat={shownLaatijat} />
    </div>
  {/if}

</Container>
