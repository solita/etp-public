<script>
  import { slide } from 'svelte/transition';
  import Button, { styles as buttonStyles } from '@Component/button';
  import InputSearch from '@Component/input-search';
  import InputText from '@Component/input-text';
  import InputNumber from '@Component/input-number';
  import InputDate from '@Component/input-date';
  import InputSelect from '@Component/input-select';
  import InfoBlock from '@Component/info-block';
  import Container, { styles as containerStyles } from '@Component/container';
  import { _ } from '@Localization/localization';

  let tarkennettuShown = false;

  const luokat = ['test 1', 'test 2', 'test 3'];

  let todistustunnus = '';
  let alue = '';
  let versio = '2018';
  let nimi = '';
  let rakennustunus = '';
  let valmistumisvuosiMin = '';
  let valmistumisvuosiMax = '';
  let laatimispaivaMin = '';
  let laatimispaivaMax = '';
  let voimassaolopaivaMin = '';
  let voimassaolopaivaMax = '';
  let kayttotarkoitusluokka = '';
  let alakayttotarkoitusluokka = '';
  let eLukuMin = '';
  let eLukuMax = '';
  let eLukuChecked = 'A,B,C,D,E,F,G';
  let nettoalaMin = '';
  let nettoalaMax = '';

  let emptyForm = () => {
    todistustunnus = '';
    alue = '';
    versio = '2018';
    nimi = '';
    rakennustunus = '';
    valmistumisvuosiMin = '';
    valmistumisvuosiMax = '';
    laatimispaivaMin = '';
    laatimispaivaMax = '';
    voimassaolopaivaMin = '';
    voimassaolopaivaMax = '';
    kayttotarkoitusluokka = '';
    alakayttotarkoitusluokka = '';
    eLukuMin = '';
    eLukuMax = '';
    eLukuChecked = 'A,B,C,D,E,F,G';
    nettoalaMin = '';
    nettoalaMax = '';
  };

  const submitForm = () => {
    console.log('submit');
    console.log({
      todistustunnus: todistustunnus,
      alue: alue,
      versio: versio,
      nimi: nimi,
      rakennustunus: rakennustunus,
      valmistumisvuosiMin: valmistumisvuosiMin,
      valmistumisvuosiMax: valmistumisvuosiMax,
      laatimispaivaMin: laatimispaivaMin,
      laatimispaivaMax: laatimispaivaMax,
      voimassaolopaivaMin: voimassaolopaivaMin,
      voimassaolopaivaMax: voimassaolopaivaMax,
      kayttotarkoitusluokka: kayttotarkoitusluokka,
      alakayttotarkoitusluokka: alakayttotarkoitusluokka,
      eLukuMin: eLukuMin,
      eLukuMax: eLukuMax,
      eLukuChecked: eLukuChecked,
      nettoalaMin: nettoalaMin,
      nettoalaMax: nettoalaMax
    });
  };
</script>

<style>
  .checkbox-container input:focus ~ .checkbox-text {
    @apply underline;
  }
  .checkbox-container input {
    @apply absolute opacity-0 cursor-pointer select-none outline-none pointer-events-none;
  }
  .checkbox-container .material-icons {
    @apply select-none text-4xl;
  }
  .checkbox-container input:checked ~ .checked,
  .checkbox-container input ~ .unchecked {
    @apply inline-block;
  }
  .checkbox-container input ~ .checked,
  .checkbox-container input:checked ~ .unchecked {
    @apply hidden;
  }

  .tarkennettu-row:focus-within .tarkennettu-label {
    @apply font-bold;
  }
</style>

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
          <InputSearch
            label={'Hae todistustunnuksella'}
            bind:value={todistustunnus} />
        </div>
        <aside class="font-normal text-xs italic mt-4">
          Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
        </aside>
        <div class="flex">
          <div class="w-full md:w-11/12">
            <InputSearch label="Hae alueella" bind:value={alue} />
          </div>
        </div>
      </div>
      <aside
        class="mt-4 md:mt-0 md:w-3/12 md:pl-4 md:border-l-8 border-ashblue text-ashblue italic text-sm">
        Energiatodistuksesta saa nähtäväksi koosteen eli kahden ensimmäisen
        sivun tiedot (henkilötietosuojan vuoksi ei kuitenkaan 1-2 huoneistoa
        koskevista kohteista).
      </aside>
    </div>
    <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
      <button
        class="inline-flex items-center self-center ml-4 text-green focus:text-ashblue focus:outline-none"
        aria-expanded={tarkennettuShown}
        on:click={() => {
          tarkennettuShown = !tarkennettuShown;
        }}>
        {#if tarkennettuShown}
          <span
            class="uppercase font-bold">{$_('ETHAKU_HAKUEHDOT_PIILOITA')}</span>
          <span class="font-icon text-4xl">expand_less</span>
        {:else}
          <span
            class="uppercase font-bold">{$_('ETHAKU_HAKUEHDOT_NAYTA')}</span>
          <span class="font-icon text-4xl">expand_more</span>
        {/if}
      </button>
    </div>
    {#if tarkennettuShown}
      <div
        class="tarkennettu-haku w-full lg:w-5/6 flex flex-col my-4 py-4 border-t-2 border-b-2 border-green space-y-2"
        transition:slide>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_VERSIO')}
          </span>

          <div class="w-full md:w-1/2">
            <div class="flex justify-start">
              <label class="checkbox-container flex items-center p-2 md:p-0">
                <input type="radio" bind:group={versio} value={'2018'} />
                <span class="material-icons checked text-green">
                  radio_button_checked
                </span>
                <span class="material-icons unchecked">
                  radio_button_unchecked
                </span>
                <span class="ml-1 checkbox-text">2018</span>
              </label>
              <label
                class="checkbox-container flex items-center p-2 ml-3 md:p-0">
                <input type="radio" bind:group={versio} value={'2013'} />
                <span class="material-icons checked text-green">
                  radio_button_checked
                </span>
                <span class="material-icons unchecked">
                  radio_button_unchecked
                </span>
                <span class="ml-1 checkbox-text">2013</span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_RAKENNUKSEN_NIMI')}
          </span>
          <div class="w-full md:w-1/2">
            <InputText label={''} bind:value={nimi} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_RAKENNUSTUNNUS')}
          </span>
          <div class="w-full md:w-1/2">
            <InputText label={''} bind:value={rakennustunus} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_RAKENNUS_VUOSI')}
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputNumber
                label={'vvvv'}
                min="1000"
                max={new Date().getFullYear()}
                bind:value={valmistumisvuosiMin}
                step="1"
                invalidMessage={'Sallittu arvo 1000-' + new Date().getFullYear()} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={'vvvv'}
                min={new Date().getFullYear()}
                bind:value={valmistumisvuosiMax}
                max="2900"
                step="1"
                invalidMessage={'Sallittu arvo ' + new Date().getFullYear() + '-2900'} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_LAATIMISPAIVA')}
          </span>
          <div
            class="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center text-center">
            <div class="w-full md:w-2/5">
              <InputDate
                label={'pp.kk.vvvv'}
                max={laatimispaivaMax}
                bind:value={laatimispaivaMin} />
            </div>
            <span
              class="material-icons text-darkgrey w-full md:w-auto select-none">
              horizontal_rule
            </span>
            <div class="w-full md:w-2/5">
              <InputDate
                label={'pp.kk.vvvv'}
                min={laatimispaivaMin}
                bind:value={laatimispaivaMax} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_VIIMEINEN_VOIMASSAOLOPAIVA')}
          </span>
          <div
            class="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center text-center">
            <div class="w-full md:w-2/5">
              <InputDate
                label={'pp.kk.vvvv'}
                max={voimassaolopaivaMax}
                bind:value={voimassaolopaivaMin} />
            </div>
            <span
              class="material-icons text-darkgrey w-full md:w-auto select-none">
              horizontal_rule
            </span>
            <div class="w-full md:w-2/5">
              <InputDate
                label={'pp.kk.vvvv'}
                min={voimassaolopaivaMin}
                bind:value={voimassaolopaivaMax} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_KAYTTOTARKOITUSLUOKKA')}
          </span>
          <div class="w-full md:w-1/2">
            <InputSelect
              options={luokat}
              label={$_('KAIKKI')}
              bind:value={kayttotarkoitusluokka} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_ALAKAYTTOTARKOITUSLUOKKA')}
          </span>
          <div class="w-full md:w-1/2">
            <InputSelect
              options={luokat}
              label={$_('KAIKKI')}
              bind:value={alakayttotarkoitusluokka} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_E_KOKONAISLUKU')}
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputNumber
                label={''}
                min="0"
                max={eLukuMax}
                step="1"
                bind:value={eLukuMin} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={''}
                min={eLukuMin}
                step="1"
                bind:value={eLukuMax} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_E_LUKU')}
          </span>
          <div
            class="w-full md:w-1/2 flex flex-col xl:flex-row justify-start items-center">
            <div
              class="w-full xl:w-auto flex justify-between items-center xl:justify-start">
              <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6">
                <input type="checkbox" bind:group={eLukuChecked} value={'A'} />
                <span class="material-icons checked text-green">
                  check_box
                </span>
                <span class="material-icons unchecked">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">A</span>
              </label>

              <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6">
                <input type="checkbox" bind:group={eLukuChecked} value={'B'} />
                <span class="material-icons checked text-green">
                  check_box
                </span>
                <span class="material-icons unchecked">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">B</span>
              </label>

              <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6">
                <input type="checkbox" bind:group={eLukuChecked} value={'C'} />
                <span class="material-icons checked text-green">
                  check_box
                </span>
                <span class="material-icons unchecked">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">C</span>
              </label>
              <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6">
                <input type="checkbox" bind:group={eLukuChecked} value={'D'} />
                <span class="material-icons checked text-green">
                  check_box
                </span>
                <span class="material-icons unchecked">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">D</span>
              </label>
            </div>
            <div
              class="w-full xl:w-auto flex justify-between items-center xl:justify-start">
              <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6">
                <input type="checkbox" bind:group={eLukuChecked} value={'E'} />
                <span class="material-icons checked text-green">
                  check_box
                </span>
                <span class="material-icons unchecked">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">E</span>
              </label>

              <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6">
                <input type="checkbox" bind:group={eLukuChecked} value={'F'} />
                <span class="material-icons checked text-green">
                  check_box
                </span>
                <span class="material-icons unchecked">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">F</span>
              </label>

              <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6">
                <input type="checkbox" bind:group={eLukuChecked} value={'G'} />
                <span class="material-icons checked text-green">
                  check_box
                </span>
                <span class="material-icons unchecked">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">G</span>
              </label>

              <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6 invisible">
                <input type="checkbox" />
                <span class="material-icons inline-block">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">X</span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_LAMMITETTY_NETTOALA')}
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputNumber
                label={''}
                min="0"
                max={nettoalaMax}
                bind:value={nettoalaMin} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={''}
                min={nettoalaMin}
                bind:value={nettoalaMax} />
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
      <Button {...buttonStyles.green} on:click={submitForm}>{$_('HAE')}</Button>
      <Button {...buttonStyles.ashblue} on:click={emptyForm}>
        {$_('HAKU_TYHJENNA')}
      </Button>
    </div>
  </div>
</Container>
