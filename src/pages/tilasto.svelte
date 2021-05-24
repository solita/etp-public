<script>
  import Container, { styles as containerStyles } from '@Component/container';
  import InfoBlock from '@Component/info-block';
  import Input from '@Component/input-search';
  import InputNumber from '@Component/input-number';
  import InputSelect from '@Component/input-select';
  import Button, { styles as buttonStyles } from '@Component/button';
  import ButtonLink from '@Component/buttonlink';
  import Spinner from '@Component/spinner';
  import { onMount } from 'svelte';
  import { backReferred } from '@/router/router';
  import { _, locale } from '@Localization/localization';
  import Seo from '@Component/seo';

  let component;
  let searchmodel;
  let valmistumisvuosiMinInput, valmistumisvuosiMaxInput;
  let aluehaku;

  const commitSearch = param => {
    console.log('search:', param);
  };
  onMount(() => {
    component.scrollIntoView();
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
          on:submit|preventDefault={evt => {
            commitSearch(evt.target);
          }}
          on:reset|preventDefault={_ => commitSearch('', '')}>
          <!-- MAIN HAKU -->
          <div class="flex w-full">
            <div class="flex flex-col w-full md:w-7/12">
              <aside class="font-normal text-xs italic">
                {$_('TILASTO_HAE_ASIDE')}
              </aside>
              <div class="flex">
                <div class="w-full md:w-11/12">
                  <Input
                    label={$_('TILASTO_HAE_ALUEELLA')}
                    name="alue"
                    value={aluehaku} />
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
                  name={'perustiedot.kayttotarkoitus_in'}
                  disabled={false}
                  options={[1, 2, 3, 4, 5]}
                  label={$_('TILASTO_TYYPPI_KAYTTOTARKOITUS')}
                  value={0} />
              </div>
            </div>
            <div
              class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
              <span
                class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
                {$_('TILASTO_RAKENNUS_VUOSI')}
              </span>
              <div class="w-full md:w-1/2 flex justify-between items-center">
                <div class="w-2/5">
                  <InputNumber
                    bind:this={valmistumisvuosiMinInput}
                    label={$_('TILASTO_RAKENNUS_VUOSI')}
                    placeholder={'vvvv'}
                    min="0"
                    max={100}
                    model={searchmodel}
                    name={'perustiedot.valmistumisvuosi_min'}
                    step="1"
                    invalidMessage={'Arvon tulee olla loppuarvoa pienempi'} />
                </div>
                <span class="material-icons text-darkgrey" aria-hidden="true">
                  horizontal_rule
                </span>
                <div class="w-2/5">
                  <InputNumber
                    bind:this={valmistumisvuosiMaxInput}
                    label={$_('TILASTO_RAKENNUS_VUOSI')}
                    placeholder={'vvvv'}
                    min={0}
                    model={searchmodel}
                    name={'perustiedot.valmistumisvuosi_max'}
                    max="10000000000"
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
                    bind:this={valmistumisvuosiMinInput}
                    label={$_('TILASTO_LAMMITETTY_NETTOALA')}
                    placeholder={'vvvv'}
                    min="0"
                    max={100}
                    model={searchmodel}
                    name={'perustiedot.valmistumisvuosi_min'}
                    step="1"
                    invalidMessage={'Arvon tulee olla loppuarvoa pienempi'} />
                </div>
                <span class="material-icons text-darkgrey" aria-hidden="true">
                  horizontal_rule
                </span>
                <div class="w-2/5">
                  <InputNumber
                    bind:this={valmistumisvuosiMaxInput}
                    label={$_('TILASTO_LAMMITETTY_NETTOALA')}
                    placeholder={'vvvv'}
                    min={0}
                    model={searchmodel}
                    name={'perustiedot.valmistumisvuosi_max'}
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
      <div class="flex flex-col w-full my-8">
        <!-- GENERAL, GRAPHS-->
        <span class="uppercase font-bold w-full my-2">
          {$_('TILASTO_TULOKSIA') + ' 998877'}
        </span>
        <!-- GENERAL -->
        <div
          class="pbb-always flex flex-col md:flex-row space-y-2 md:space-x-4 md:space-y-0 justify-evenly">
          <div class="w-full flex flex-col space-y-2">
            <div class="w-full space-x-2">
              <span class="font-bold">{$_('TILASTO_ALUE')}</span>
              <span>Jotain tekstiä, jotain tekstii</span>
            </div>
            <div class="w-full space-x-2">
              <span class="font-bold">{$_('TILASTO_TYYPPI')}</span>
              <span>Jotain tekstiä, jotain tekstii</span>
            </div>
          </div>
          <div class="w-full flex flex-col space-y-2">
            <div class="w-full space-x-2">
              <span class="font-bold">{$_('TILASTO_RAKENNUSVUOSI')}</span>
              <span>Jotain tekstiä, jotain tekstii</span>
            </div>
            <div class="w-full space-x-2">
              <span class="font-bold">{$_('TILASTO_LAMMITETTY_NETTOALA')}</span>
              <span>Jotain tekstiä, jotain tekstii</span>
            </div>
          </div>
        </div>
        <!-- GRAPHS -->
        <div
          class="pbb-always flex flex-col md:flex-row mt-8 space-y-4 md:space-x-4 md:space-y-0 justify-evenly">
          <h1 class="w-full">{$_('TILASTO_ET_2018')}</h1>
          <h1 class="w-full">{$_('TILASTO_ET_2013')}</h1>
        </div>
        <div
          class="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-evenly">
          <div class="w-full flex flex-col space-y-2">
            <div class="pbi-avoid w-full flex flex-col">
              <h2 class="my-4 text-green">{$_('TILASTO_ET_LUOKKA')}</h2>
              <span class="p-20 bg-ashblue">KUVAAJA 1</span>
            </div>
          </div>
          <div class="w-full flex flex-col space-y-2">
            <div class="pbi-avoid w-full flex flex-col">
              <h2 class="my-4 text-green">{$_('TILASTO_ET_LUOKKA')}</h2>
              <span class="p-20 bg-ashblue">KUVAAJA 2</span>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row my-4 md:space-x-4 md:space-y-0 justify-evenly">
          <div class="w-full flex flex-col space-y-2">
            <div class="pbi-avoid w-full flex flex-col space-y-2">
              <h2 class="text-green">{$_('TILASTO_E_LUKU')}</h2>
              <div>
                <span class="font-bold">{$_('TILASTO_KESKIARVO')}</span>
                <span>123</span>
              </div>
              <span class="p-10 bg-darkgreen">KUVAAJA 3</span>
            </div>
          </div>
          <div class="w-full flex flex-col space-y-2">
            <div class="pbi-avoid w-full flex flex-col space-y-2">
              <h2 class="text-green">{$_('TILASTO_E_LUKU')}</h2>
              <div>
                <span class="font-bold">{$_('TILASTO_KESKIARVO')}</span>
                <span>123</span>
              </div>
              <span class="p-10 bg-darkgreen">KUVAAJA 4</span>
            </div>
          </div>
        </div>
        <!-- MOLEMMILLE TUNNUSLUVUT-->
        <h1 class="pbb-always w-full my-4">
          {$_('TILASTO_TUNNUSLUVUT_MOLEMMILLE')}
        </h1>
        <div
          class="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-evenly">
          <div class="w-full flex flex-col space-y-2">
            <div class="w-full flex flex-col">
              <h2 class="my-4 text-green">{$_('TILASTO_RAKENNUSVAIPPA')}</h2>
              <div class="w-full md:w-5/6 flex flex-col">
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_ILMANVUOTOLUKU')}</span>
                  <span>123</span>
                </div>
                <span class="w-full mt-4 font-bold">
                  {$_('TILASTO_U_ARVOT')}
                </span>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_ULKOSEINAT')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_YLAPOHJA')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_ALAPOHJA')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_IKKUNAT')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_ULKOOVET')}</span>
                  <span>123</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex flex-col space-y-2">
            <div class="w-full flex flex-col">
              <h2 class="my-4 text-green">{$_('TILASTO_LAMMITYS')}</h2>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_VARAAVIEN')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_LISALAMPOPUMPPOJEN')}</span>
                <span>123</span>
              </div>

              <div class="w-full flex justify-between mt-4">
                <span>{$_('TILASTO_LAMPOPUMPUN')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between pl-4">
                <span>{$_('TILASTO_TILOJEN')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between pl-4">
                <span>{$_('TILASTO_LAMPIMAN')}</span>
                <span>123</span>
              </div>

              <h2 class="my-4 text-green">{$_('TILASTO_ILMANVAIHTO')}</h2>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_LAMMONTALTEENOTON')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_SFP_LUKU')}</span>
                <span>123</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 2018 TUNNUSLUVUT-->
        <h1 class="pbb-always w-full my-4">{$_('TILASTO_TUNNUSLUVUT_2018')}</h1>
        <div
          class="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 justify-evenly">
          <div class="w-full flex flex-col space-y-2">
            <div class="w-full flex flex-col">
              <h2 class="my-4 text-green">
                {$_('TILASTO_LAMMITYSJARJESTELMA')}
              </h2>
              <div class="w-full md:w-5/6 flex flex-col">
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_KAUKOLAMPO')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_SAHKO')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_PUU')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_PELLETTI')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_OLJY')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_KAASU')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_MAALAMPOPUMPPU')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_VESIILMALAMPOPUMPPU')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_POISTOILMALAMPOPUMPPU')}</span>
                  <span>123</span>
                </div>
                <div class="w-full flex justify-between">
                  <span>{$_('TILASTO_EI_TILASTOITAVISSA')}</span>
                  <span>123</span>
                </div>
              </div>

              <h2 class="my-4 text-green">{$_('TILASTO_UUSIUTUVIEN')}</h2>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_AURINKOSAHKO')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_AURINKOLAMPO')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_TUULISAHKO')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_LAMPOPUMPPU')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_MUU_SAHKO')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_MUU_LAMPO')}</span>
                <span>123</span>
              </div>
            </div>
          </div>
          <div class="w-full flex flex-col space-y-2">
            <div class="w-full flex flex-col">
              <h2 class="my-4 text-green">
                {$_('TILASTO_ILMANVAIHTOJARJESTELMA')}
              </h2>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_PAINOVOIMAINEN')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_KONEELLINEN_POISTOILMAN')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_KONEELLINEN_LAMMONTALTEEN')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_KONEELLINEN_TULO')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_KONEELLINEN_TULO_LAMMONTALTEEN')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_POISTOILMALAMPO')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_PAINOVOIMAINEN_POISTO')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_PAINOVOIMAINEN_TULO_POISTO')}</span>
                <span>123</span>
              </div>
              <div class="w-full flex justify-between">
                <span>{$_('TILASTO_EI_TILASTOITAVISSA')}</span>
                <span>123</span>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  </Container>
</div>
