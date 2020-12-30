<script>
  import Container, { styles as containerStyles } from '@Component/container';
  import Button, { styles as buttonStyles } from '@Component/button';
  import ButtonLink from '@Component/buttonlink';
  import Spinner from '@Component/spinner';
  import { onMount } from 'svelte';
  import { backReferred } from '@/router/router';
  import { _, locale, labelLocale } from '@Localization/localization';

  import { parseDate } from '@/utilities/parsers';
  import * as formats from '@/utilities/formats';
  import * as fxmath from '@/utilities/fxmath';

  import * as EtHakuUtils from '@/utilities/ethaku';
  import * as EtApi from '@/api/energiatodistus-api';
  import * as GeoUtils from '@/utilities/geo';
  import * as GeoApi from '@/api/geo-api';

  import VirallinenMalli2013 from '@Asset/energiatodistusmalli_2013.pdf';
  import VirallinenMalli2018 from '@Asset/energiatodistusmalli_2018.pdf';

  export let id;
  export let versio;

  let component = null;

  const parseValues = model => {
    const parseModel = EtHakuUtils.parseModel();

    return Object.keys(model).reduce(
      (acc, item) => ({
        ...acc,
        [item]: parseModel[item] ? parseModel[item](model[item]) : model[item]
      }),
      {}
    );
  };

  const energiamuotokertoimet = {
    2018: {
      'fossiilinen-polttoaine': 1,
      kaukojaahdytys: 0.28,
      kaukolampo: 0.5,
      sahko: 1.2,
      'uusiutuva-polttoaine': 0.5
    },
    2013: {
      'fossiilinen-polttoaine': 1,
      kaukojaahdytys: 0.4,
      kaukolampo: 0.7,
      sahko: 1.7,
      'uusiutuva-polttoaine': 0.5
    }
  };

  const path = (path, obj) => path.reduce((acc, p) => acc[p], obj);

  const aperture = (n, arr) =>
    arr.reduce((acc, _, index) => [...acc, arr.slice(index, index + n)], []);

  const perLammitettyNettoala = (energiatodistus, n) =>
    fxmath.round(0, n / energiatodistus.lahtotiedot['lammitetty-nettoala']);

  const energiamuotokerroinTulo = (energiatodistus, energiamuoto) =>
    path([energiatodistus.versio, energiamuoto], energiamuotokertoimet) *
    path(
      ['tulokset', 'kaytettavat-energiamuodot', energiamuoto],
      energiatodistus
    );

  const rajaArvot = ranges => {
    const r = aperture(2, [
      -1,
      ...ranges.map(range => range[0])
    ]).map(([head, ...tail]) => [head + 1, ...tail]);

    return ranges.map((range, index) => [range[1], r[index].join('-')]);
  };

  $: deserializedWhere = EtHakuUtils.deserializeWhere(
    EtHakuUtils.defaultSearchModel(),
    '[[["=","id",' + id + '],["=","versio",' + versio + ']]]'
  );

  $: energiatodistusPromise = Promise.all([
    EtApi.energiatodistukset(fetch, {
      where: EtHakuUtils.whereQuery(
        EtHakuUtils.where(
          false,
          parseValues({
            ...EtHakuUtils.defaultSearchModel(),
            ...deserializedWhere
          })
        )
      ),
      alue: '',
      offset: 0,
      limit: 1
    }).then(results => {
      if (results.length > 0) return results[0];
      else throw '...';
    }),
    EtApi.laatimisvaiheet(fetch),
    EtApi.alakayttotarkoitusluokat(fetch, versio),
    GeoApi.postinumerot(fetch),
    EtApi.lammonjako(fetch),
    EtApi.lammitysmuoto(fetch),
    EtApi.ilmanvaihtotyyppi(fetch),
  ]).then(
    ([
      energiatodistus,
      laatimisvaiheet,
      alakayttotarkoitusluokat,
      postinumerot,
      lammonjakotyypit,
      lammitysmuoto,
      ilmanvaihtotyypit
    ]) => {
      const laatimisvaihe = laatimisvaiheet.find(
        lv => lv.id === energiatodistus.perustiedot.laatimisvaihe
      );
      const alakayttotarkoitusluokka = alakayttotarkoitusluokat.find(
        aktl => aktl.id === energiatodistus.perustiedot.kayttotarkoitus
      );
      const postinumero = postinumerot.find(
        pn => pn.id === parseInt(energiatodistus.perustiedot.postinumero, 10)
      );
      const lammonjako = lammonjakotyypit.find(
        lj => lj.id === parseInt(energiatodistus.lahtotiedot.lammitys.lammonjako.id, 10)
      );
      const lammitysmuoto1 = lammitysmuoto.find(
        lm => lm.id === parseInt(energiatodistus.lahtotiedot.lammitys['lammitysmuoto-1'].id, 10)
      );
      const lammitysmuoto2 = lammitysmuoto.find(
        lm => lm.id === parseInt(energiatodistus.lahtotiedot.lammitys['lammitysmuoto-2'].id, 10)
      );
      const ilmanvaihtotyyppi = ilmanvaihtotyypit.find(
        iv => iv.id === parseInt(energiatodistus.lahtotiedot.ilmanvaihto['tyyppi-id'], 10)
      );

      return Promise.all([
        Promise.resolve(energiatodistus),
        Promise.resolve(laatimisvaihe),
        Promise.resolve(alakayttotarkoitusluokka),
        Promise.resolve(postinumero),
        Promise.resolve(lammonjako),
        Promise.resolve(lammitysmuoto1),
        Promise.resolve(lammitysmuoto2),
        Promise.resolve(ilmanvaihtotyyppi),
        EtApi.eLuokka(
          fetch,
          energiatodistus.versio,
          energiatodistus.perustiedot.kayttotarkoitus,
          energiatodistus.lahtotiedot['lammitetty-nettoala'],
          energiatodistus.tulokset['e-luku']
        )
      ]);
    }
  );
  
  onMount(() => component.scrollIntoView());
</script>

<style>
  .graph-color-a {
    background-color: #1d8c38;
  }
  .graph-color-a ~ .arrow-right {
    border-left-color: #1d8c38;
  }
  .graph-color-b {
    background-color: #72a42f;
    padding-right: 5%;
  }
  .graph-color-b ~ .arrow-right {
    border-left-color: #72a42f;
  }
  .graph-color-c {
    background-color: #c3cc16;
    padding-right: 10%;
  }
  .graph-color-c ~ .arrow-right {
    border-left-color: #c3cc16;
  }
  .graph-color-d {
    background-color: #ffe900;
    padding-right: 15%;
  }
  .graph-color-d ~ .arrow-right {
    border-left-color: #ffe900;
  }
  .graph-color-e {
    background-color: #e5ac00;
    padding-right: 20%;
  }
  .graph-color-e ~ .arrow-right {
    border-left-color: #e5ac00;
  }
  .graph-color-f {
    background-color: #c95a00;
    padding-right: 25%;
  }
  .graph-color-f ~ .arrow-right {
    border-left-color: #c95a00;
  }
  .graph-color-g {
    background-color: #bc000b;
    padding-right: 30%;
  }
  .graph-color-g ~ .arrow-right {
    border-left-color: #bc000b;
  }

  @media screen and (min-width: 640px) {
    .graph-color-a {
      padding-right: 10%;
    }
    .graph-color-b {
      padding-right: 20%;
    }
    .graph-color-c {
      padding-right: 30%;
    }
    .graph-color-d {
      padding-right: 40%;
    }
    .graph-color-e {
      padding-right: 50%;
    }
    .graph-color-f {
      padding-right: 60%;
    }
    .graph-color-g {
      padding-right: 70%;
    }
  }

  .arrow-left {
    width: 0;
    height: 0;
    border-top: 1.4rem solid transparent;
    border-right: 2.8rem solid #000;
    border-bottom: 1.3rem solid transparent;
  }
  .arrow-right {
    width: 0;
    height: 0;
    border-top: 1.4rem solid transparent;
    border-left: 2.8rem solid;
    border-bottom: 1.3rem solid transparent;
  }
</style>

<div bind:this={component}>
  <Container {...containerStyles.beige}>
    <div
      class="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-2 items-left sm:px-16 sm:py-8 px-4 py-4">
      <Button
        {...buttonStyles.green}
        on:click={() => {
          backReferred('/ethaku');
        }}>
        <span class="material-icons align-middle">arrow_back</span>
        <span class="whitespace-no-wrap">{$_('ET_BACK')}</span>
      </Button>
      <span class="flex-grow mr-2"> {$_('ET_KUVAUS')} </span>
    </div>
  </Container>
  <Container {...containerStyles.white}>
    <div class="sm:px-16 sm:py-8 px-4 py-4 text-lg">
      {#await energiatodistusPromise}
        <div class="flex justify-center">
          <Spinner />
        </div>
      {:then [energiatodistus, 
          laatimisvaihe, 
          alakayttotarkoitusluokka, 
          postinumero, 
          lammonjako, 
          lammitysmuoto1, 
          lammitysmuoto2, 
          ilmanvaihtotyyppi, 
          eLuokka
        ]}
        <div class="w-full flex mx-auto mb-8">
          <div
            class="w-full flex flex-col md:flex-row justify-between items-center">
            <h1 class="text-xl uppercase text-ashblue my-0">
              {$_('ENERGIATODISTUS')}
              {energiatodistus.versio}
              -
              {$_('ET_KOOSTE')}
            </h1>
            <ButtonLink
              {...buttonStyles.ashblue}
              target="_blank"
              href={energiatodistus.versio == '2013' ? VirallinenMalli2013 : VirallinenMalli2018}>
              <span class="material-icons">picture_as_pdf</span>
              <span class="whitespace-no-wrap"> {$_('ET_VIRALLINEN')}</span>
            </ButtonLink>
          </div>
        </div>
        <div class="w-full flex flex-col mx-auto items-center space-y-6">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/2 text-ashblue">{$_('ET_TODISTETUNNUS')}:</span>
            <span class="w-full md:w-1/2">{energiatodistus.id}</span>
          </div>
          {#if (versio == '2018') && energiatodistus?.perustiedot?.rakennustunnus}
            <div
              class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
              <span
                class="w-full md:w-1/2 text-ashblue">{$_('ET_PYSYVA_RAKENNUSTUNNUS')}:</span>
              <span
                class="w-full md:w-1/2">{energiatodistus.perustiedot.rakennustunnus}</span>
            </div>
          {/if}
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/2 text-ashblue">{$_('ET_RAKENNUS_NIMI')}:</span>
            <span
              class="w-full md:w-1/2">{`${energiatodistus.perustiedot.nimi}, ${energiatodistus.perustiedot['katuosoite-fi']}, ${GeoUtils.padPostinumero(energiatodistus.perustiedot.postinumero)} `}
              <span
                class="capitalize">{postinumero['label-fi'].toLowerCase()}</span>
            </span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/2 text-ashblue">{$_('ET_RAKENNUS_KAYTTOTARKOITUS')}:</span>
            <span
              class="w-full md:w-1/2">{alakayttotarkoitusluokka['label-fi']}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/2 text-ashblue">{$_('ET_RAKENNUS_VUOSI')}:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus.perustiedot.valmistumisvuosi}</span>
          </div>
          {#if energiatodistus.versio == '2018'}
            <div
              class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
              <span
                class="w-full md:w-1/2 text-ashblue">{$_('ET_LAATIMISVAIHE')}:</span>
              <span class="w-full md:w-1/2">{laatimisvaihe['label-fi']}</span>
            </div>
            {#if laatimisvaihe.id === 2}
              <div
                class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
                <span
                  class="w-full md:w-1/2 text-ashblue">{$_('ET_HAVAINNOINTI')}:</span>
                <span
                  class="w-full md:w-1/2">{formats.formatDate(parseDate(energiatodistus.perustiedot.havainnointikaynti))}</span>
              </div>
            {/if}
          {/if}
          <div class="w-full my-8 flex flex-col bg-white">
            <div class="w-full flex border-b border-black">
              <div class="w-0 md:w-1/2 md:border-r border-black p-2" />
              <div
                class="w-full md:w-1/2 px-2 py-4 flex justify-end md:justify-start md:pl-10">
                <span class="text-green text-lg">{$_('ET_LUOKKA')}</span>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-a pr-1 md:pr-auto">A</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                {#if energiatodistus.tulokset['e-luokka'] == 'A'}
                  <div class="arrow-left" />
                  <div
                    class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                    <span class="font-bold">A</span><span
                      class="text-sm">{versio}</span>
                  </div>
                {/if}
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-b pr-1 md:pr-auto">B</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                {#if energiatodistus.tulokset['e-luokka'] == 'B'}
                  <div class="arrow-left" />
                  <div
                    class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white align-top">
                    <span class="font-bold">B</span><span
                      class="text-sm">{versio}</span>
                  </div>
                {/if}
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-c pr-1 md:pr-auto">C</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                {#if energiatodistus.tulokset['e-luokka'] == 'C'}
                  <div class="arrow-left" />
                  <div
                    class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                    <span class="font-bold">C</span><span
                      class="text-sm">{versio}</span>
                  </div>
                {/if}
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-d pr-1 md:pr-auto">D</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                {#if energiatodistus.tulokset['e-luokka'] == 'D'}
                  <div class="arrow-left" />
                  <div
                    class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                    <span class="font-bold">D</span><span
                      class="text-sm">{versio}</span>
                  </div>
                {/if}
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-e pr-1 md:pr-auto">E</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                {#if energiatodistus.tulokset['e-luokka'] == 'E'}
                  <div class="arrow-left" />
                  <div
                    class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                    <span class="font-bold">E</span><span
                      class="text-sm">{versio}</span>
                  </div>
                {/if}
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-f pr-1 md:pr-auto">F</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                {#if energiatodistus.tulokset['e-luokka'] == 'F'}
                  <div class="arrow-left" />
                  <div
                    class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                    <span class="font-bold">F</span><span
                      class="text-sm">{versio}</span>
                  </div>
                {/if}
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-g pr-1 md:pr-auto">G</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                {#if energiatodistus.tulokset['e-luokka'] == 'G'}
                  <div class="arrow-left" />
                  <div
                    class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                    <span class="font-bold">G</span><span
                      class="text-sm">{versio}</span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-2/3 text-ashblue">{$_('ET_ELUKU')}:</span>
            <span
              class="w-full md:w-1/3">{`${formats.formatNumber(energiatodistus.tulokset['e-luku'])} ${$_('ET_ELUKU_F')}`}</span>
          </div>
          {#if energiatodistus.versio == '2018'}
            <div
              class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
              <span
                class="w-full md:w-2/3 text-ashblue">{$_('ET_VAATIMUSTASO')}:</span>
              <span
                class="w-full md:w-1/3">{`≤ ${eLuokka['raja-uusi-2018']} ${$_('ET_ELUKU_VAATIMUS_F')}`}</span>
            </div>
          {/if}
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/2 text-ashblue">{$_('ET_LAATIJA')}:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus['laatija-fullname']}</span>
          </div>
          <div
            class="flex flex-col md:flex-row md:space-x-2 w-full items-center justify-center">
            <div class="flex flex-col w-full md:w-1/2">
              <span
                class="w-full md:w-1/2 text-ashblue">{$_('ET_LAATIMISPAIVA')}:</span>
              <span
                class="w-full md:w-1/2">{formats.formatDate(parseDate(energiatodistus['allekirjoitusaika']))}</span>
            </div>
            <div class="flex flex-col w-full md:w-1/2">
              <span
                class="w-full md:w-1/2 text-ashblue">{$_('ET_VOIMASSAOLOPAIVA')}:</span>
              <span
                class="w-full md:w-1/2">{formats.formatExclusiveEndDate(parseDate(energiatodistus['voimassaolo-paattymisaika']))}</span>
            </div>
          </div>
        </div>

        <h2 class="w-full text-green uppercase text-xl mt-8">
          {$_('ET_YHTEENVETO')}
        </h2>
        <span
          class="w-full flex bg-ashblue text-white uppercase px-4 py-3 my-4">
          {$_('ET_LASKETTU_KOKONAISENERGIA')}</span>
        <div class="w-full flex flex-col mx-auto items-center space-y-6 my-8">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/2 text-ashblue">{$_('ET_NETTOALA')}:</span>
            <span
              class="w-full md:w-1/2">{formats.formatNumber(energiatodistus.lahtotiedot['lammitetty-nettoala'])}</span>
          </div>

          {#if parseInt(versio) === 2018}
            {#if lammitysmuoto1 || energiatodistus?.lahtotiedot?.lammitys['lammitysmuoto-1']['kuvaus-fi']}
              <div
                class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
                <span class="w-full md:w-1/2 text-ashblue">{$_('ET_LAMMITYS_KUVAUS')}:</span>
                  {#if lammitysmuoto1 && lammitysmuoto1.id !== 9}
                <span class="w-full md:w-1/2">
                  {lammitysmuoto1['label-fi']}
                </span>
                {:else}
                <span class="w-full md:w-1/2">
                  {energiatodistus.lahtotiedot.lammitys['lammitysmuoto-1']['kuvaus-fi']}
                </span>
                {/if}
              </div>
            {/if}

            {#if lammitysmuoto2 || energiatodistus?.lahtotiedot?.lammitys['lammitysmuoto-2']['kuvaus-fi']}
              <div
                class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
                <span class="w-full md:w-1/2 text-ashblue">{$_('ET_LAMMITYS_2')}:</span>
                  {#if lammitysmuoto2 && lammitysmuoto2.id !== 9}
                <span class="w-full md:w-1/2">
                  {lammitysmuoto2['label-fi']}
                </span>
                {:else}
                <span class="w-full md:w-1/2">
                  {energiatodistus.lahtotiedot.lammitys['lammitysmuoto-2']['kuvaus-fi']}
                </span>
                {/if}
              </div>
            {/if}

            {#if lammonjako || energiatodistus?.lahtotiedot?.lammitys?.lammonjako['kuvaus-fi']}
              <div class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
                <span class="w-full md:w-1/2 text-ashblue">{$_('ET_LAMMITYS_LAMMONJAKO')}:</span>
                  {#if lammonjako && lammonjako.id !== 12}
                <span class="w-full md:w-1/2">
                  {lammonjako['label-fi'] || ''}
                </span>
                {:else}
                <span class="w-full md:w-1/2">
                  {energiatodistus.lahtotiedot.lammitys.lammonjako['kuvaus-fi']}
                </span>
                {/if}
              </div>
            {/if}

          {:else if energiatodistus?.lahtotiedot?.lammitys['lammitysmuoto-1']['kuvaus-fi'] || energiatodistus?.lahtotiedot?.lammitys['lammitysmuoto-2']['kuvaus-fi']}
            <div class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
              <span class="w-full md:w-1/2 text-ashblue">{$_('ET_LAMMITYS_KUVAUS')}:</span>
              <span class="w-full md:w-1/2">
                {energiatodistus.lahtotiedot.lammitys['lammitysmuoto-1']['kuvaus-fi'] || ''}
                {energiatodistus.lahtotiedot.lammitys['lammitysmuoto-2']['kuvaus-fi'] || ''}</span>
            </div>
          {/if}

          {#if ilmanvaihtotyyppi || energiatodistus?.lahtotiedot?.ilmanvaihto['kuvaus-fi']}
            <div
              class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
              <span
                class="w-full md:w-1/2 text-ashblue">{$_('ET_ILMANVAIHTO_KUVAUS')}:</span>
              {#if parseInt(versio) === 2018 && ilmanvaihtotyyppi && ilmanvaihtotyyppi.id !== 6}
              <span class="w-full md:w-1/2">
                {ilmanvaihtotyyppi['label-fi']}
              </span>
              {:else}
              <span class="w-full md:w-1/2">
                {energiatodistus.lahtotiedot.ilmanvaihto['kuvaus-fi']}
              </span>
              {/if}
            </div>
          {/if}
        </div>

        <div class="overflow-x-auto w-full">
          <table class="table-fixed mx-auto my-8 font-normal text-center">
            <thead class="bg-lightbeige text-green align-center py-4">
              <tr>
                <th class="font-normal py-4 w-1/5 pl-2 text-left" rowspan="2">
                  {$_('ET_ENERGIAMUOTO')}
                </th>
                <th class="font-normal pt-4 w-2/5" colspan="2">{$_('ET_OSTOENERGIA')}</th>
                <th class="font-normal py-4 w-1/5" rowspan="2">
                  {$_('ET_ENERGIAMUODON_KERROIN')}
                </th>
                <th class="font-normal py-4 w-1/5" rowspan="2">
                  {$_('ET_ENERGIAMUODON_PAINOTETTU')}
                </th>
              </tr>
              <tr>
                <th class="font-normal pb-4">{$_('ET_ILMANVAIHTO_1')}</th>
                <th class="font-normal pb-4">{$_('ET_ILMANVAIHTO_2')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-4 pl-2 text-left">{$_('ET_SAHKO')}</td>
                <td class="py-4">
                  {formats.formatNumber(energiatodistus.tulokset['kaytettavat-energiamuodot'].sahko)}
                </td>
                <td class="py-4">
                  {formats.formatNumber(perLammitettyNettoala(energiatodistus, path(['tulokset', 'kaytettavat-energiamuodot', 'sahko'], energiatodistus)))}
                </td>
                <td>1,2</td>
                <td class="py-4">
                  {formats.formatNumber(perLammitettyNettoala(energiatodistus, energiamuotokerroinTulo(energiatodistus, 'sahko')))}
                </td>
              </tr>
              <tr>
                <td class="py-4 pl-2 text-left">{$_('ET_KAUKOLAMPO')}</td>
                <td class="py-4">
                  {formats.formatNumber(energiatodistus.tulokset['kaytettavat-energiamuodot'].kaukolampo)}
                </td>
                <td class="py-4">
                  {formats.formatNumber(perLammitettyNettoala(energiatodistus, path(['tulokset', 'kaytettavat-energiamuodot', 'kaukolampo'], energiatodistus)))}
                </td>
                <td class="py-4 font-normal">0,5</td>
                <td class="py-4">
                  {formats.formatNumber(perLammitettyNettoala(energiatodistus, energiamuotokerroinTulo(energiatodistus, 'kaukolampo')))}
                </td>
              </tr>
              <tr>
                <td class="py-4 pl-2 text-left">
                  {$_('ET_UUDISTUVA_POLTTOAINE')}
                </td>
                <td class="py-4">
                  {formats.formatNumber(energiatodistus.tulokset['kaytettavat-energiamuodot']['uusiutuva-polttoaine'])}
                </td>
                <td class="py-4">
                  {formats.formatNumber(perLammitettyNettoala(energiatodistus, path(['tulokset', 'kaytettavat-energiamuodot', 'uusiutuva-polttoaine'], energiatodistus)))}
                </td>
                <td class="py-4 font-normal">0,5</td>
                <td class="py-4">
                  {formats.formatNumber(perLammitettyNettoala(energiatodistus, energiamuotokerroinTulo(energiatodistus, 'uusiutuva-polttoaine')))}
                </td>
              </tr>
              <tr class="border-t border-grey font-bold">
                <td class="py-4 w-4/5 justify-end text-right" colspan="4">
                  {$_('ET_VERTAILULUKU')}
                </td>
                <td class="py-4">
                  {formats.formatNumber(energiatodistus.tulokset['e-luku'])}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <span
          class="w-full flex bg-ashblue text-white uppercase px-4 py-3 my-4">
          {$_('ET_RAKENNUKSEN_ET_LUOKKA')}
        </span>

        <div class="w-full flex flex-col mx-auto items-center space-y-6 my-8">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/3 text-ashblue">{$_('ET_KAYTETTY_LUOKITTELU')}:</span>
            <span
              class="w-full md:w-2/3">{eLuokka.kayttotarkoitus['label-fi']}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/3 text-ashblue">{$_('ET_LUOKKIEN_RAJAT')}</span>
            <div class="w-full md:w-2/3 flex flex-col md:flex-row md:space-x-3">
              {#each rajaArvot(eLuokka['raja-asteikko']) as arvo}
                <div><strong>{arvo[0]}</strong> <span>({arvo[1]})</span></div>
              {/each}
              <div>
                <strong>G</strong>
                <span>({eLuokka['raja-asteikko'][eLuokka['raja-asteikko'].length - 1][0]}-)</span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span
              class="w-full md:w-1/3 text-ashblue">{$_('ET_RAKENNUKSEN_E_LUOKKA')}</span>
            <div class="w-full md:w-2/3">
              <strong>{energiatodistus.tulokset['e-luokka']}</strong>
              <span>({energiatodistus.tulokset['e-luku']})</span>
            </div>
          </div>
          <p class="w-full">{$_('ET_ELUKU_PERUSTUU')}</p>
        </div>

        <div class="w-full flex flex-col mx-auto items-center space-y-6 my-6">
          <h2 class="w-full text-green uppercase text-xl">
            {$_('ET_ENERGIATEHOKKUUTTA_PARANTAVIA')}
          </h2>
          <span
            class="w-full bg-ashblue text-white uppercase px-4 py-3 my-4">{$_('ET_LASKETTU_KOKONAIS')}</span>
          <p class="w-full">
            {$locale == 'sv' ? energiatodistus.perustiedot['keskeiset-suositukset-sv'] : energiatodistus.perustiedot['keskeiset-suositukset-fi']}
          </p>
          <div class="w-full hidden">
            <Button
              {...buttonStyles.green}
              on:click={() => {
                console.log('print clicked');
              }}>
              <span class="material-icons align-middle">print</span>
              <span class="whitespace-no-wrap"> {$_('TULOSTA_KOOSTE')} </span>
            </Button>
          </div>
        </div>
      {:catch error}
        <div class="px-3 pb-8 md:p-8 xl:p-16 w-full">{$_('SERVER_ERROR')}</div>
      {/await}
    </div>
  </Container>
</div>
