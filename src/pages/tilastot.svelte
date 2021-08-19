<script>
  import InfoTooltip, { AnchorPosition } from '@Component/info-tooltip';
  import Container, { styles as containerStyles } from '@Component/container';
  import InfoBlock from '@Component/info-block';
  import Input from '@Component/input-search';
  import InputNumber from '@Component/input-number';
  import InputSelect from '@Component/input-select';
  import TilastotEntriesList from '@Component/tilastot-entries-list';
  import TilastotEtVersion from '@Component/tilastot-et-version-block';
  import Button, { styles as buttonStyles } from '@Component/button';
  import { onMount, tick } from 'svelte';
  import { navigate } from '@/router/router';
  import { _, locale } from '@Localization/localization';
  import Seo from '@Component/seo';
  import * as api from '@/api/tilastot-api';
  import * as EtApi from '@/api/energiatodistus-api';

  let resultsElem;
  let searchmodel;
  let vuosiminInput, vuosimaxInput, nettoalaminInput, nettoalamaxInput;

  export let keyword = '';
  export let vuosimin = '';
  export let vuosimax = '';
  export let nettoalamin = '';
  export let nettoalamax = '';

  let resultKeyword = '';
  let resultVuosimin = '';
  let resultVuosimax = '';
  let resultNettoalamin = '';
  let resultNettoalamax = '';
  let results;
  let lammitysmuodot;
  let ilmanvaihtotyypit;

  let chartData2018, chartData2013;

  let total2013 = 0;
  let total2018 = 0;

  const commitSearch = evt => {
    const qs = [
      ...(keyword ? [['keyword', keyword].join('=')] : []),
      ...(vuosimin ? [['vuosimin', vuosimin].join('=')] : []),
      ...(vuosimax ? [['vuosimax', vuosimax].join('=')] : []),
      ...(nettoalamin ? [['nettoalamin', nettoalamin].join('=')] : []),
      ...(nettoalamax ? [['nettoalamax', nettoalamax].join('=')] : [])
    ].join('&');

    navigate(`/tilastot${qs ? '?' + qs : ''}`);
    Promise.all([
      api.statistics(fetch, {
        keyword: keyword,
        'valmistumisvuosi-min': vuosimin,
        'valmistumisvuosi-max': vuosimax,
        'lammitetty-nettoala-min': nettoalamin,
        'lammitetty-nettoala-max': nettoalamax
      }),
      EtApi.lammitysmuoto(fetch),
      EtApi.ilmanvaihtotyyppi(fetch)
    ]).then(
      ([
        statisticsPromise,
        lammitysmuodotPromise,
        ilmanvaihtotyypitPromise
      ]) => {
        results = statisticsPromise;
        lammitysmuodot = lammitysmuodotPromise;
        ilmanvaihtotyypit = ilmanvaihtotyypitPromise;

        resultKeyword = keyword;
        resultVuosimin = vuosimin;
        resultVuosimax = vuosimax;
        resultNettoalamin = nettoalamin;
        resultNettoalamax = nettoalamax;

        total2018 = 0;
        total2013 = 0;
        for (let key in results?.['counts']?.['2018']?.['e-luokka']) {
          total2018 += results?.['counts']?.['2018']?.['e-luokka'][key];
        }

        for (let key in results?.['counts']?.['2013']?.['e-luokka']) {
          total2013 += results?.['counts']?.['2013']?.['e-luokka'][key];
        }

        chartData2018 = [
          (results?.['counts']?.['2018']?.['e-luokka']?.A || 0) / total2018,
          (results?.['counts']?.['2018']?.['e-luokka']?.B || 0) / total2018,
          (results?.['counts']?.['2018']?.['e-luokka']?.C || 0) / total2018,
          (results?.['counts']?.['2018']?.['e-luokka']?.D || 0) / total2018,
          (results?.['counts']?.['2018']?.['e-luokka']?.E || 0) / total2018,
          (results?.['counts']?.['2018']?.['e-luokka']?.F || 0) / total2018,
          (results?.['counts']?.['2018']?.['e-luokka']?.G || 0) / total2018
        ];
        chartData2013 = [
          (results?.['counts']?.['2013']?.['e-luokka']?.A || 0) / total2013,
          (results?.['counts']?.['2013']?.['e-luokka']?.B || 0) / total2013,
          (results?.['counts']?.['2013']?.['e-luokka']?.C || 0) / total2013,
          (results?.['counts']?.['2013']?.['e-luokka']?.D || 0) / total2013,
          (results?.['counts']?.['2013']?.['e-luokka']?.E || 0) / total2013,
          (results?.['counts']?.['2013']?.['e-luokka']?.F || 0) / total2013,
          (results?.['counts']?.['2013']?.['e-luokka']?.G || 0) / total2013
        ];

        resetForm();
        resultsElem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    );
  };

  const resetForm = async () => {
    await tick();
    keyword = '';
    vuosimin = '';
    vuosimax = '';
    nettoalamin = '';
    nettoalamax = '';
  };

  onMount(() => {
    if (keyword || vuosimin || vuosimax || nettoalamin || nettoalamax) {
      commitSearch();
    }
  });
</script>

<style>
  * {
    color-adjust: exact;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .pbb-always {
    page-break-before: always;
    /* page-break-inside: avoid; */
  }
  .pbi-avoid,
  h1,
  h2,
  span {
    page-break-inside: avoid;
  }

  div.statistics :global(h1) {
    @apply text-green;
  }

  div.statistics :global(h2) {
    @apply text-ashblue normal-case;
  }

  .only-print {
    display: none;
  }

  @media print {
    .only-print {
      display: block;
    }
  }
</style>

<Seo
  title="{$_('ENERGIATODISTUSREKISTERI')} - {$_('TILASTOT')}"
  descriptionFi={$locale == 'fi' ? $_('TILASTOT') : undefined}
  descriptionSv={$locale == 'sv' ? $_('TILASTOT') : undefined} />
<div>
  <!-- DISCLAIMER 1 - TOP -->
  <div class="sticky w-full">
    <Container {...containerStyles.red}>
      <div class="flex flex-col items-center text-white py-4">
        <strong class="uppercase">{$_('DISCLAIMER_KEHITYSVERSIO')}</strong>
        <p>
          Tämä sivu on kehityksen alla. Toiminnallisuudet ja data eivät ole
          lopullisia.
        </p>
        <p>
          Denna sida är under utveckling. Funktioner och data är inte
          slutgiltiga.
        </p>
      </div>
    </Container>
  </div>
  <!-- DISCLAIMER 2 - BOTTOM -->
  <div class="fixed bottom-0 w-full z-10">
    <Container {...containerStyles.red}>
      <div class="flex flex-col items-center text-white py-4">
        <strong class="uppercase">{$_('DISCLAIMER_KEHITYSVERSIO')}</strong>
        <p>
          Tämä sivu on kehityksen alla. Toiminnallisuudet ja data eivät ole
          lopullisia.
        </p>
        <p>
          Denna sida är under utveckling. Funktioner och data är inte
          slutgiltiga.
        </p>
      </div>
    </Container>
  </div>

  <Container {...containerStyles.beige}>
    <InfoBlock title={$_('TILASTOT_INFO_TITLE')}>
      {$_('TILASTOT_INFO_TEXT')}
    </InfoBlock>
  </Container>

  <Container {...containerStyles.white}>
    <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto flex flex-col">
      <!-- SEARTCH FORM -->
      <div class="flex flex-col w-full print:hidden">
        <form
          on:change={async evt => {
            switch (evt.target.name) {
              case 'tilastot.alue':
                keyword = evt.target.value;
                break;
              case 'tilastot.valmistumisvuosi_min':
                vuosimin = evt.target.value;
                break;
              case 'tilastot.valmistumisvuosi_max':
                vuosimax = evt.target.value;
                break;
              case 'tilastot.nettoala_min':
                nettoalamin = evt.target.value;
                break;
              case 'tilastot.nettoala_max':
                nettoalamax = evt.target.value;
                break;
              default:
                searchmodel = { ...searchmodel, [evt.target.name]: evt.target.value };
            }

            await tick();
          }}
          on:submit|preventDefault={evt => {
            commitSearch(evt.target);
          }}
          on:reset={resetForm}>
          <!-- MAIN HAKU -->
          <div class="flex flex-col lg:flex-row w-full items-end justify-start">
            <div class="flex flex-col w-full lg:w-7/12">
              <aside class="font-normal text-xs italic">
                {$_('TILASTOT_HAE_ASIDE')}
              </aside>
              <div class="flex">
                <div class="w-full lg:w-11/12">
                  <Input
                    label={$_('TILASTOT_HAE_ALUEELLA')}
                    name="tilastot.alue"
                    value={keyword} />
                </div>
              </div>
            </div>

            <aside
              class="w-full mt-4 lg:mt-0 lg:w-5/12 lg:pl-4 lg:border-l-8 border-ashblue text-ashblue italic text-sm">
              {$_('TILASTOT_ASIDE')}
            </aside>
          </div>
          <!-- TARKENNETTU HAKU -->
          <div class="w-full lg:w-5/6 flex flex-col my-4 py-4 space-y-2">
            <div
              class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
              <span
                class="tarkennettu-label w-full md:w-1/2 tracking-widest text-ashblue">
                {$_('TILASTOT_TYYPPI_KAYTTOTARKOITUS')}
              </span>
              <div class="w-full md:w-1/2">
                <InputSelect
                  name={'tilastot.kayttotarkoitus'}
                  disabled={true}
                  options={['Kaikki']}
                  label={$_('TILASTOT_TYYPPI_KAYTTOTARKOITUS')}
                  value={0} />
              </div>
            </div>
            <div
              class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
              <span
                class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
                {$_('TILASTOT_RAKENNUSVUOSI')}
              </span>
              <div class="w-full md:w-1/2 flex justify-between items-center">
                <div class="w-2/5">
                  <InputNumber
                    bind:this={vuosiminInput}
                    label={$_('TILASTOT_RAKENNUSVUOSI')}
                    placeholder={'vvvv'}
                    min={0}
                    max={3000}
                    value={vuosimin}
                    name={'tilastot.valmistumisvuosi_min'}
                    step="1"
                    invalidMessage={$_('TILASTOT_INVALID_VUOSI_MIN')} />
                </div>
                <span class="material-icons text-darkgrey" aria-hidden="true">
                  horizontal_rule
                </span>
                <div class="w-2/5">
                  <InputNumber
                    bind:this={vuosimaxInput}
                    label={$_('TILASTOT_RAKENNUSVUOSI')}
                    placeholder={'vvvv'}
                    min={0}
                    max={3000}
                    value={vuosimax}
                    name={'tilastot.valmistumisvuosi_max'}
                    step="1"
                    invalidMessage={$_('TILASTOT_INVALID_VUOSI_MAX')} />
                </div>
              </div>
            </div>
            <div
              class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
              <span
                class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
                {$_('TILASTOT_LAMMITETTY_NETTOALA')}
              </span>
              <div class="w-full md:w-1/2 flex justify-between items-center">
                <div class="w-2/5">
                  <InputNumber
                    bind:this={nettoalaminInput}
                    label={$_('TILASTOT_LAMMITETTY_NETTOALA')}
                    placeholder={'m²'}
                    min="0"
                    max={nettoalamax || 999999}
                    value={nettoalamin}
                    name={'tilastot.nettoala_min'}
                    step="1"
                    invalidMessage={$_('TILASTOT_INVALID_NETTOALA_MIN')} />
                </div>
                <span class="material-icons text-darkgrey" aria-hidden="true">
                  horizontal_rule
                </span>
                <div class="w-2/5">
                  <InputNumber
                    bind:this={nettoalamaxInput}
                    label={$_('TILASTOT_LAMMITETTY_NETTOALA')}
                    placeholder={'m²'}
                    min={nettoalamin || 0}
                    max={999999}
                    value={nettoalamax}
                    name={'tilastot.nettoala_max'}
                    step="1"
                    invalidMessage={$_('TILASTOT_INVALID_NETTOALA_MAX')} />
                </div>
              </div>
            </div>
          </div>
          <!-- BUTTONS -->
          <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
            <Button type={'submit'} {...buttonStyles.green}>
              {$_('TILASTOT_HAE')}
            </Button>
            <Button type={'reset'} {...buttonStyles.ashblue}>
              {$_('TILASTOT_TYHJENNA')}
            </Button>
          </div>
        </form>
      </div>
      <div class="statistics flex flex-col w-full my-8" bind:this={resultsElem}>
        {#if results}
          <!-- GENERAL, GRAPHS-->
          <span class="uppercase font-bold w-full my-2">
            {$_('TILASTOT_TULOKSIA')}
            {' '}
            {total2013 + total2018 || '< 5'}
          </span>
          <!-- GENERAL -->
          <div
            class="only-print pbb-always flex flex-col md:flex-row space-y-2 md:space-x-16 md:space-y-0 justify-evenly">
            <div class="w-full flex flex-col space-y-2">
              {#if resultKeyword}
                <div class="w-full space-x-2">
                  <span class="font-bold">{$_('TILASTOT_ALUE')}</span>
                  <span>{resultKeyword}</span>
                </div>
              {/if}
              <div class="w-full space-x-2">
                <span class="font-bold">{$_('TILASTOT_TYYPPI')}</span>
                <span>Kaikki</span>
              </div>
            </div>
            <div class="w-full flex flex-col space-y-2">
              {#if resultVuosimin || resultVuosimax}
                <div class="w-full space-x-2">
                  <span class="font-bold">{$_('TILASTOT_RAKENNUSVUOSI')}</span>
                  <span>{resultVuosimin} - {resultVuosimax}</span>
                </div>
              {/if}
              <div class="w-full space-x-2">
                <span
                  class="font-bold">{$_('TILASTOT_LAMMITETTY_NETTOALA_T')}</span>
                <span>{`${resultNettoalamin || 0} m² - ${resultNettoalamax || '∞'} m²`}</span>
              </div>
            </div>
          </div>
          {#if total2013 + total2018 > 0}
            <!-- GRAPHS -->
            <div
              class="pbi-avoid my-8 flex flex-col md:flex-row space-y-4 md:space-x-16 md:space-y-0 justify-evenly">
              <TilastotEtVersion
                version="2018"
                count={total2018}
                eLukuData={results?.['e-luku-statistics']?.['2018']}
                chartData={chartData2018} />

              <TilastotEtVersion
                version="2013"
                count={total2013}
                eLukuData={results?.['e-luku-statistics']?.['2013']}
                chartData={chartData2013} />
            </div>
            <!-- MOLEMMILLE TUNNUSLUVUT-->
            <h1 class="pbb-always w-full my-4 space-x-2">
              {$_('TILASTOT_TUNNUSLUVUT_MOLEMMILLE')}
              {` (${total2013 + total2018} ${$_('TILASTOT_KPL')})`}
            </h1>
            <div
              class="flex flex-col md:flex-row space-y-4 md:space-x-16 md:space-y-0 justify-evenly">
              <div class="w-full flex flex-col">
                <div class="w-full flex flex-col">
                  <div class="my-4 w-full">
                    <InfoTooltip
                      title={$_('TILASTOT_RAKENNUSVAIPPA')}
                      tooltip={$_('TILASTOT_RAKENNUSVAIPPA_TOOLTIP')}>
                      <h2>{$_('TILASTOT_RAKENNUSVAIPPA')}</h2>
                    </InfoTooltip>
                  </div>
                  <div class="w-full flex flex-col">
                    <div class="w-full flex justify-between">
                      <InfoTooltip
                        title={$_('TILASTOT_ILMANVUOTOLUKU')}
                        tooltip={$_('TILASTOT_ILMANVUOTOLUKU_TOOLTIP')}>
                        <span>{$_('TILASTOT_ILMANVUOTOLUKU')}{' q'}<sub>50</sub></span>
                      </InfoTooltip>
                      <span>{results?.['common-averages']?.['ilmanvuotoluku']}</span>
                    </div>
                    <div class="mt-4">
                      <InfoTooltip
                        title={$_('TILASTOT_U_ARVOT')}
                        tooltip={$_('TILASTOT_U_ARVOT_TOOLTIP')}>
                        <span class="font-bold">{$_('TILASTOT_U_ARVOT')}</span>
                      </InfoTooltip>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTOT_ULKOSEINAT')}</span>
                      <span>{results?.['common-averages']?.['ulkoseinat-u']}{$_('TILASTOT_U_ARVOT_UNIT')}</span>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTOT_YLAPOHJA')}</span>
                      <span>{results?.['common-averages']?.['ylapohja-u']}{$_('TILASTOT_U_ARVOT_UNIT')}</span>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTOT_ALAPOHJA')}</span>
                      <span>{results?.['common-averages']?.['alapohja-u']}{$_('TILASTOT_U_ARVOT_UNIT')}</span>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTOT_IKKUNAT')}</span>
                      <span>{results?.['common-averages']?.['ikkunat-u']}{$_('TILASTOT_U_ARVOT_UNIT')}</span>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTOT_ULKOOVET')}</span>
                      <span>{results?.['common-averages']?.['ulkoovet-u']}{$_('TILASTOT_U_ARVOT_UNIT')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col space-y-2">
                <div class="w-full flex flex-col">
                  <h2 class="my-4 text-green">{$_('TILASTOT_LAMMITYS')}</h2>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_VARAAVIEN')}</span>
                    <span>{results?.['common-averages']?.['takka']}{$_('TILASTOT_KPL')}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_LISALAMPOPUMPPOJEN')}</span>
                    <span>{results?.['common-averages']?.['ilmalampopumppu']}{$_('TILASTOT_KPL')}</span>
                  </div>

                  <div class="mt-4">
                    <InfoTooltip
                      anchor={AnchorPosition.bottomRight}
                      title={$_('TILASTOT_LAMPOPUMPUN')}
                      tooltip={$_('TILASTOT_LAMPOPUMPUN_TOOLTIP')}>
                      <span>{$_('TILASTOT_LAMPOPUMPUN')}</span>
                    </InfoTooltip>
                  </div>
                  <div class="w-full flex justify-between pl-4">
                    <span>{$_('TILASTOT_TILOJEN')}</span>
                    <span>{results?.['common-averages']?.['tilat-ja-iv-lampokerroin']}</span>
                  </div>
                  <div class="w-full flex justify-between pl-4">
                    <span>{$_('TILASTOT_LAMPIMAN')}</span>
                    <span>{results?.['common-averages']?.['lammin-kayttovesi-lampokerroin']}</span>
                  </div>

                  <h2 class="my-4 text-green">{$_('TILASTOT_ILMANVAIHTO')}</h2>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_LAMMONTALTEENOTON')}</span>
                    <span>{results?.['common-averages']?.['lto-vuosihyotysuhde']}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <InfoTooltip
                      anchor={AnchorPosition.bottomRight}
                      title={$_('TILASTOT_SFP_LUKU')}
                      tooltip={$_('TILASTOT_SFP_LUKU_TOOLTIP')}>
                      <span>{$_('TILASTOT_SFP_LUKU')}</span>
                    </InfoTooltip>
                    <span>{results?.['common-averages']?.['ivjarjestelma-sfp']}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 2018 TUNNUSLUVUT-->
            {#if total2018 > 0}
              <h1 class="pbb-always w-full my-4">
                {$_('TILASTOT_TUNNUSLUVUT_2018')}
                {` (${total2018} ${$_('TILASTOT_KPL')})`}
              </h1>
              <div
                class="flex flex-col md:flex-row space-y-4 md:space-x-16 md:space-y-0 justify-evenly">
                <TilastotEntriesList
                  title={$_('TILASTOT_LAMMITYSJARJESTELMA')}
                  tooltip={$_('TILASTOT_LAMMITYSJARJESTELMA_TOOLTIP')}
                  labels={lammitysmuodot}
                  items={results?.['counts']?.['2018']?.['lammitysmuoto']}
                  total={total2018} />
                <TilastotEntriesList
                  title={$_('TILASTOT_ILMANVAIHTOJARJESTELMA')}
                  tooltip={$_('TILASTOT_ILMANVAIHTOJARJESTELMA_TOOLTIP')}
                  tooltipAnchor={AnchorPosition.bottomRight}
                  labels={ilmanvaihtotyypit}
                  items={results?.['counts']?.['2018']?.['ilmanvaihto']}
                  total={total2018} />
              </div>
              <div
                class="flex flex-col md:flex-row space-y-4 md:space-x-16 md:space-y-0 justify-evenly">
                <div class="w-full flex flex-col">
                  <div class="my-4">
                    <InfoTooltip
                      title={$_('TILASTOT_UUSIUTUVIEN')}
                      tooltip={$_('TILASTOT_UUSIUTUVIEN_TOOLTIP')}>
                      <h2>{$_('TILASTOT_UUSIUTUVIEN')}</h2>
                    </InfoTooltip>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_AURINKOSAHKO')}</span>
                    <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['aurinkosahko']) / total2018) * 100).toFixed(0)}{'%'}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_AURINKOLAMPO')}</span>
                    <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['aurinkolampo']) / total2018) * 100).toFixed(0)}{'%'}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_TUULISAHKO')}</span>
                    <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['tuulisahko']) / total2018) * 100).toFixed(0)}{'%'}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_LAMPOPUMPPU')}</span>
                    <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['lampopumppu']) / total2018) * 100).toFixed(0)}{'%'}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_MUU_SAHKO')}</span>
                    <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['muusahko']) / total2018) * 100).toFixed(0)}{'%'}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTOT_MUU_LAMPO')}</span>
                    <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['muulampo']) / total2018) * 100).toFixed(0)}{'%'}</span>
                  </div>
                </div>
                <div class="w-full" />
              </div>
            {/if}
          {/if}
          <!-- PRINT -->
          <div class="w-full mx-auto my-8">
            <Button {...buttonStyles.green} on:click={() => window.print()}>
              <span
                class="material-icons align-middle"
                aria-hidden="true">print</span>
              <span class="whitespace-no-wrap"> {$_('TILASTOT_TULOSTA')} </span>
            </Button>
          </div>
        {/if}
      </div>
    </div>
  </Container>
</div>
