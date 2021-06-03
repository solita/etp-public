<script>
  import Container, { styles as containerStyles } from '@Component/container';
  import InfoBlock from '@Component/info-block';
  import Input from '@Component/input-search';
  import InputNumber from '@Component/input-number';
  import InputSelect from '@Component/input-select';
  import Button, { styles as buttonStyles } from '@Component/button';
  import ButtonLink from '@Component/buttonlink';
  import Spinner from '@Component/spinner';
  import { onMount, tick } from 'svelte';
  import { navigate } from '@/router/router';
  import { backReferred } from '@/router/router';
  import { _, locale } from '@Localization/localization';
  import Seo from '@Component/seo';
  import * as api from '@/api/tilasto-api';
  import * as EtApi from '@/api/energiatodistus-api';

  import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  } from 'chart.js';

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );

  let component;
  let searchmodel;
  let vuosiminInput, vuosimaxInput;

  export let keyword = '';
  export let vuosimin = '';
  export let vuosimax = '';
  export let nettoalamin = '';
  export let nettoalamax = '';

  $: console.log(keyword);

  let results;
  let lammitysmuodot;
  let ilmanvaihtotyypit;

  const selectByLocaleOrAvailable = (prefix, property) => {
    if ($locale === 'sv' && property?.[prefix + '-sv'])
      return property[prefix + '-sv'];
    else if (
      $locale === 'fi' &&
      !property?.[prefix + '-fi'] &&
      property?.[prefix + '-sv']
    )
      return property[prefix + '-sv'];
    else if (property?.[prefix + '-fi']) return property[prefix + '-fi'];
    else return '';
  };

  const commitSearch = param => {
    const qs = [
      ...(keyword ? [['keyword', keyword].join('=')] : []),
      ...(vuosimin ? [['vuosimin', vuosimin].join('=')] : []),
      ...(vuosimax ? [['vuosimax', vuosimax].join('=')] : []),
      ...(nettoalamin ? [['nettoalamin', nettoalamin].join('=')] : []),
      ...(nettoalamax ? [['nettoalamax', nettoalamax].join('=')] : [])
    ].join('&');

    console.log('search:', param);
    console.log('keyword:', keyword);

    navigate(`/tilasto${qs ? '?' + qs : ''}`);
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
        console.log('results: ', results);

        total2018 = 0;
        total2013 = 0;
        for (let key in results?.['e-luokka-counts']?.['2018']) {
          total2018 += results?.['e-luokka-counts']?.['2018'][key];
        }

        for (let key in results?.['e-luokka-counts']?.['2013']) {
          total2013 += results?.['e-luokka-counts']?.['2013'][key];
        }
        let eLuokka2018, eLuokka2013;

        if (total2018) {
          eLuokka2018 = [
            (results?.['e-luokka-counts']?.['2018']?.A || 0) / total2018,
            (results?.['e-luokka-counts']?.['2018']?.B || 0) / total2018,
            (results?.['e-luokka-counts']?.['2018']?.C || 0) / total2018,
            (results?.['e-luokka-counts']?.['2018']?.D || 0) / total2018,
            (results?.['e-luokka-counts']?.['2018']?.E || 0) / total2018,
            (results?.['e-luokka-counts']?.['2018']?.F || 0) / total2018,
            (results?.['e-luokka-counts']?.['2018']?.G || 0) / total2018
          ];
        }
        if (eLuokka2013) {
          eLuokka2013 = [
            (results?.['e-luokka-counts']?.['2013']?.A || 0) / total2013,
            (results?.['e-luokka-counts']?.['2013']?.B || 0) / total2013,
            (results?.['e-luokka-counts']?.['2013']?.C || 0) / total2013,
            (results?.['e-luokka-counts']?.['2013']?.D || 0) / total2013,
            (results?.['e-luokka-counts']?.['2013']?.E || 0) / total2013,
            (results?.['e-luokka-counts']?.['2013']?.F || 0) / total2013,
            (results?.['e-luokka-counts']?.['2013']?.G || 0) / total2013
          ];
        }

        tick().then(() => {
          drawCharts(eLuokka2018, eLuokka2013);
        });
      }
    );
  };

  onMount(() => {
    component.scrollIntoView();
  });

  let chart2018, chart2013, chartCanvas1, chartCanvas2;

  let total2013 = 0;
  let total2018 = 0;

  const drawCharts = (data2018, data2013) => {
    const options = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 100,
              callback: function (value) {
                return value * 100 + '%';
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage'
            }
          }
        ]
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    };
    const colors = [
      '#1d8c38',
      '#72a42f',
      '#c3cc16',
      '#ffe900',
      '#e5ac00',
      '#c95a00',
      '#bc000b'
    ];
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (chart2018 && data2018) {
      chart2018.data.datasets.forEach(dataset => {
        dataset.data.push(data2018);
      });
    } else {
      chart2018 = new Chart(chartCanvas1, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: data2018,
              backgroundColor: colors
            }
          ]
        },
        options: options
      });
    }
    if (chart2013 && data2013) {
      chart2013.data.datasets.forEach(dataset => {
        dataset.data.push(data2013);
      });
    } else {
      chart2013 = new Chart(chartCanvas2, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: data2013,
              backgroundColor: colors
            }
          ]
        },
        options: options
      });
    }
  };
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

  .chart-parent {
    width: 99%;
  }
</style>

<Seo
  title="{$_('ENERGIATODISTUSREKISTERI')} - {$_('TILASTO')}"
  descriptionFi={$locale == 'fi' ? $_('TILASTO') : undefined}
  descriptionSv={$locale == 'sv' ? $_('TILASTO') : undefined} />
<div bind:this={component}>
  <Container {...containerStyles.beige}>
    <InfoBlock title={$_('TILASTO_INFO_TITLE')}>
      {$_('TILASTO_INFO_TEXT')}
    </InfoBlock>
  </Container>

  <Container {...containerStyles.white}>
    <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto flex flex-col">
      <!-- SEARTCH FORM -->
      <div class="flex flex-col w-full print:hidden">
        <form
          on:change={async evt => {
            switch (evt.target.name) {
              case 'tilasto.alue':
                keyword = evt.target.value;
                break;
              case 'tilasto.valmistumisvuosi_min':
                vuosimin = evt.target.value;
                break;
              case 'tilasto.valmistumisvuosi_max':
                vuosimax = evt.target.value;
                break;
              case 'tilasto.nettoala_min':
                nettoalamin = evt.target.value;
                break;
              case 'tilasto.nettoala_max':
                nettoalamax = evt.target.value;
                break;
              default:
                searchmodel = { ...searchmodel, [evt.target.name]: evt.target.value };
            }

            await tick();

            // validate?
          }}
          on:submit|preventDefault={evt => {
            commitSearch(evt.target);
          }}
          on:reset={async () => {
            await tick();
            keyword = '';
            vuosimin = '';
            vuosimax = '';
            nettoalamin = '';
            nettoalamax = '';
          }}>
          <!-- MAIN HAKU -->
          <div class="flex w-full items-start justify-start">
            <div class="flex flex-col w-full md:w-7/12">
              <aside class="font-normal text-xs italic">
                {$_('TILASTO_HAE_ASIDE')}
              </aside>
              <div class="flex">
                <div class="w-full md:w-11/12">
                  <Input
                    label={$_('TILASTO_HAE_ALUEELLA')}
                    name="tilasto.alue"
                    value={keyword} />
                </div>
              </div>
            </div>

            <aside
              class="mt-4 md:mt-0 md:w-1/2 md:pl-4 md:border-l-8 border-ashblue text-ashblue italic text-sm">
              {$_('TILASTO_ASIDE')}
            </aside>
          </div>
          <!-- TARKENNETTU HAKU -->
          <div
            class="w-full lg:w-5/6 flex flex-col my-4 py-4 border-t-2 border-b-2 border-green space-y-2">
            <div
              class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
              <span
                class="tarkennettu-label w-full md:w-1/2 tracking-widest text-ashblue">
                {$_('TILASTO_TYYPPI_KAYTTOTARKOITUS')}
              </span>
              <div class="w-full md:w-1/2">
                <InputSelect
                  name={'tilasto.kayttotarkoitus'}
                  disabled={true}
                  options={['Kaikki']}
                  label={$_('TILASTO_TYYPPI_KAYTTOTARKOITUS')}
                  value={0} />
              </div>
            </div>
            <div
              class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
              <span
                class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
                {$_('TILASTO_RAKENNUSVUOSI')}
              </span>
              <div class="w-full md:w-1/2 flex justify-between items-center">
                <div class="w-2/5">
                  <InputNumber
                    bind:this={vuosiminInput}
                    label={$_('TILASTO_RAKENNUSVUOSI')}
                    placeholder={'vvvv'}
                    min={0}
                    max={3000}
                    model={searchmodel}
                    name={'tilasto.valmistumisvuosi_min'}
                    step="1"
                    invalidMessage={'Arvon tulee olla loppuarvoa pienempi'} />
                </div>
                <span class="material-icons text-darkgrey" aria-hidden="true">
                  horizontal_rule
                </span>
                <div class="w-2/5">
                  <InputNumber
                    bind:this={vuosimaxInput}
                    label={$_('TILASTO_RAKENNUSVUOSI')}
                    placeholder={'vvvv'}
                    min={0}
                    max={3000}
                    model={searchmodel}
                    name={'tilasto.valmistumisvuosi_max'}
                    step="1"
                    invalidMessage={'Arvon tulee olla alkuarvoa suurempi'} />
                </div>
              </div>
            </div>
            <div
              class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
              <span
                class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
                {$_('TILASTO_LAMMITETTY_NETTOALA')}
              </span>
              <div class="w-full md:w-1/2 flex justify-between items-center">
                <div class="w-2/5">
                  <InputNumber
                    bind:this={vuosiminInput}
                    label={$_('TILASTO_LAMMITETTY_NETTOALA')}
                    placeholder={'0'}
                    min="0"
                    max={100}
                    model={searchmodel}
                    name={'tilasto.nettoala_min'}
                    step="1"
                    invalidMessage={'Arvon tulee olla loppuarvoa pienempi'} />
                </div>
                <span class="material-icons text-darkgrey" aria-hidden="true">
                  horizontal_rule
                </span>
                <div class="w-2/5">
                  <InputNumber
                    bind:this={vuosimaxInput}
                    label={$_('TILASTO_LAMMITETTY_NETTOALA')}
                    placeholder={'0'}
                    min={0}
                    model={searchmodel}
                    name={'tilasto.nettoala_max'}
                    max="10000000000"
                    step="1"
                    invalidMessage={'Arvon tulee olla alkuarvoa suurempi'} />
                </div>
              </div>
            </div>
          </div>
          <!-- BUTTONS -->
          <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
            <Button type={'submit'} {...buttonStyles.green}>
              {$_('TILASTO_HAE')}
            </Button>
            <Button type={'reset'} {...buttonStyles.ashblue}>
              {$_('TILASTO_TYHJENNA')}
            </Button>
          </div>
        </form>
      </div>
      {#if results}
        <div class="flex flex-col w-full my-8">
          <!-- GENERAL, GRAPHS-->
          <span class="uppercase font-bold w-full my-2">
            {$_('TILASTO_TULOKSIA')}
            {' '}
            {total2013 + total2018}
          </span>
          <!-- GENERAL -->
          <div
            class="pbb-always flex flex-col md:flex-row space-y-2 md:space-x-16 md:space-y-0 justify-evenly">
            <div class="w-full flex flex-col space-y-2">
              <div class="w-full space-x-2">
                <span class="font-bold">{$_('TILASTO_ALUE')}</span>
                <span>{keyword}</span>
              </div>
              <div class="w-full space-x-2">
                <span class="font-bold">{$_('TILASTO_TYYPPI')}</span>
                <span>Jotain tekstiä, jotain tekstii</span>
              </div>
            </div>
            <div class="w-full flex flex-col space-y-2">
              <div class="w-full space-x-2">
                <span class="font-bold">{$_('TILASTO_RAKENNUSVUOSI')}</span>
                <span>{vuosimin} - {vuosimax}</span>
              </div>
              <div class="w-full space-x-2">
                <span
                  class="font-bold">{$_('TILASTO_LAMMITETTY_NETTOALA_T')}</span>
                <span>{`${nettoalamin}m² - ${nettoalamax}m²`}</span>
              </div>
            </div>
          </div>
          {#if total2013 + total2018 > 0}
            <!-- GRAPHS -->
            <div
              class="my-8 flex flex-col md:flex-row space-y-4 md:space-x-16 md:space-y-0 justify-evenly">
              <div class="w-full flex flex-col space-y-2">
                <h1 class="w-full">
                  {$_('TILASTO_ET_2018')}
                  {` (${total2018} kpl)`}
                </h1>
                <div class="pbi-avoid w-full flex flex-col">
                  <h2 class="my-4 text-green">{$_('TILASTO_ET_LUOKKA')}</h2>
                  <div class="chart-parent">
                    <canvas bind:this={chartCanvas1} />
                  </div>
                </div>
                <div class="w-full flex flex-col">
                  <h2 class="my-4 text-green">{$_('TILASTO_E_LUKU')}</h2>

                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_KESKIARVO')}</span>
                    <span>{results?.['e-luku-statistics']?.['2018']?.avg}{$_('TILASTO_E_LUKU_UNIT')}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_PARAS_15')}</span>
                    <span>{results?.['e-luku-statistics']?.['2018']?.['percentile-15']}{$_('TILASTO_E_LUKU_UNIT')}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_HEIKOIN_15')}</span>
                    <span>{results?.['e-luku-statistics']?.['2018']?.min}{$_('TILASTO_E_LUKU_UNIT')}</span>
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col space-y-2">
                <h1 class="w-full">
                  {$_('TILASTO_ET_2013')}
                  {` (${total2013} kpl)`}
                </h1>
                <div class="pbi-avoid w-full flex flex-col">
                  <h2 class="my-4 text-green">{$_('TILASTO_ET_LUOKKA')}</h2>
                  <div class="chart-parent">
                    <canvas bind:this={chartCanvas2} />
                  </div>
                </div>
                <div class="w-full flex flex-col">
                  <h2 class="my-4 text-green">{$_('TILASTO_E_LUKU')}</h2>

                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_KESKIARVO')}</span>
                    <span>{results?.['e-luku-statistics']?.['2013']?.avg}{$_('TILASTO_E_LUKU_UNIT')}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_PARAS_15')}</span>
                    <span>{results?.['e-luku-statistics']?.['2013']?.['percentile-15']}{$_('TILASTO_E_LUKU_UNIT')}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_HEIKOIN_15')}</span>
                    <span>{results?.['e-luku-statistics']?.['2013']?.min}{$_('TILASTO_E_LUKU_UNIT')}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- MOLEMMILLE TUNNUSLUVUT-->
            <h1 class="pbb-always w-full my-4">
              {$_('TILASTO_TUNNUSLUVUT_MOLEMMILLE')}
              {` (${total2013 + total2018} kpl)`}
            </h1>
            <div
              class="flex flex-col md:flex-row space-y-4 md:space-x-16 md:space-y-0 justify-evenly">
              <div class="w-full flex flex-col space-y-2">
                <div class="w-full flex flex-col">
                  <h2 class="my-4 text-green">
                    {$_('TILASTO_RAKENNUSVAIPPA')}
                  </h2>
                  <div class="w-full flex flex-col">
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTO_ILMANVUOTOLUKU')}</span>
                      <span>{results?.['common-averages']?.['ilmanvuotoluku']}</span>
                    </div>
                    <span class="w-full mt-4 font-bold">
                      {$_('TILASTO_U_ARVOT')}
                    </span>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTO_ULKOSEINAT')}</span>
                      <span>{results?.['common-averages']?.['ulkoseinat-u']}{$_('TILASTO_U_ARVOT_UNIT')}</span>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTO_YLAPOHJA')}</span>
                      <span>{results?.['common-averages']?.['ylapohja-u']}{$_('TILASTO_U_ARVOT_UNIT')}</span>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTO_ALAPOHJA')}</span>
                      <span>{results?.['common-averages']?.['alapohja-u']}{$_('TILASTO_U_ARVOT_UNIT')}</span>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTO_IKKUNAT')}</span>
                      <span>{results?.['common-averages']?.['ikkunat-u']}{$_('TILASTO_U_ARVOT_UNIT')}</span>
                    </div>
                    <div class="w-full flex justify-between">
                      <span>{$_('TILASTO_ULKOOVET')}</span>
                      <span>{results?.['common-averages']?.['ulkoovet-u']}{$_('TILASTO_U_ARVOT_UNIT')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-col space-y-2">
                <div class="w-full flex flex-col">
                  <h2 class="my-4 text-green">{$_('TILASTO_LAMMITYS')}</h2>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_VARAAVIEN')}</span>
                    <span>{results?.['common-averages']?.['takka']}{$_('TILASTO_KPL')}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_LISALAMPOPUMPPOJEN')}</span>
                    <span>{results?.['common-averages']?.['ilmalampopumppu']}{$_('TILASTO_KPL')}</span>
                  </div>

                  <div class="w-full flex justify-between mt-4">
                    <span>{$_('TILASTO_LAMPOPUMPUN')}</span>
                    <span>{results?.['common-averages']?.['ivjarjestelma-sfp']}</span>
                  </div>
                  <div class="w-full flex justify-between pl-4">
                    <span>{$_('TILASTO_TILOJEN')}</span>
                    <span>{results?.['common-averages']?.['tilat-ja-iv-lampokerroin']}</span>
                  </div>
                  <div class="w-full flex justify-between pl-4">
                    <span>{$_('TILASTO_LAMPIMAN')}</span>
                    <span>{results?.['common-averages']?.['lammin-kayttovesi-lampokerroin']}</span>
                  </div>

                  <h2 class="my-4 text-green">{$_('TILASTO_ILMANVAIHTO')}</h2>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_LAMMONTALTEENOTON')}</span>
                    <span>{results?.['common-averages']?.['lto-vuosihyotysuhde']}</span>
                  </div>
                  <div class="w-full flex justify-between">
                    <span>{$_('TILASTO_SFP_LUKU')}</span>
                    <span>{results?.['common-averages']?.['ivjarjestelma-sfp']}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 2018 TUNNUSLUVUT-->
            <h1 class="pbb-always w-full my-4">
              {$_('TILASTO_TUNNUSLUVUT_2018')}
              {` (${total2018} kpl)`}
            </h1>
            <div
              class="flex flex-col md:flex-row space-y-4 md:space-x-16 md:space-y-0 justify-evenly">
              <div class="w-full flex flex-col space-y-2">
                {#if results?.['luokittelu-counts']?.['2018']?.['lammitysmuoto']}
                  <div class="w-full flex flex-col">
                    <h2 class="my-4 text-green">
                      {$_('TILASTO_LAMMITYSJARJESTELMA')}
                    </h2>
                    <div class="w-full flex flex-col">
                      {#each Object.entries(results?.['luokittelu-counts']?.['2018']?.['lammitysmuoto']) as obj}
                        <div class="w-full flex justify-between">
                          <span>{selectByLocaleOrAvailable( 'label', lammitysmuodot.find(lm => lm.id === parseInt(obj[0], 10)) )}</span>
                          <span>{((parseInt(obj[1]) / total2018) * 100).toFixed(0)}{'%'}</span>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/if}
              </div>
              <div class="w-full flex flex-col space-y-2">
                {#if results?.['luokittelu-counts']?.['2018']?.['ilmanvaihto']}
                  <div class="w-full flex flex-col">
                    <h2 class="my-4 text-green">
                      {$_('TILASTO_ILMANVAIHTOJARJESTELMA')}
                    </h2>
                    {#each Object.entries(results?.['luokittelu-counts']?.['2018']?.['ilmanvaihto']) as obj}
                      <div class="w-full flex justify-between">
                        <span>{selectByLocaleOrAvailable( 'label', ilmanvaihtotyypit.find(lm => lm.id === parseInt(obj[0], 10)) )}</span>
                        <span>{((parseInt(obj[1]) / total2018) * 100).toFixed(0)}{'%'}</span>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row space-y-4 md:space-x-16 md:space-y-0 justify-evenly">
              <div class="w-full flex flex-col">
                <h2 class="my-4 text-green">{$_('TILASTO_UUSIUTUVIEN')}</h2>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_AURINKOSAHKO')}</span>
                  <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['aurinkosahko']) / total2018) * 100).toFixed(0)}{'%'}</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_AURINKOLAMPO')}</span>
                  <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['aurinkolampo']) / total2018) * 100).toFixed(0)}{'%'}</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_TUULISAHKO')}</span>
                  <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['tuulisahko']) / total2018) * 100).toFixed(0)}{'%'}</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_LAMPOPUMPPU')}</span>
                  <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['lampopumppu']) / total2018) * 100).toFixed(0)}{'%'}</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_MUU_SAHKO')}</span>
                  <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['muusahko']) / total2018) * 100).toFixed(0)}{'%'}</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_MUU_LAMPO')}</span>
                  <span>{((parseInt(results?.['uusiutuvat-omavaraisenergiat-counts']?.['2018']?.['muulampo']) / total2018) * 100).toFixed(0)}{'%'}</span>
                </div>
              </div>
              <div class="w-full flex flex-col" />
            </div>
          {/if}
          <!-- PRINT -->
          <div class="w-full mx-auto my-8">
            <Button {...buttonStyles.green} on:click={() => window.print()}>
              <span
                class="material-icons align-middle"
                aria-hidden="true">print</span>
              <span class="whitespace-no-wrap"> {$_('TILASTO_TULOSTA')} </span>
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </Container>
</div>
