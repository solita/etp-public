<script>
  import { slide } from 'svelte/transition';
  import Button, { styles as buttonStyles } from '@Component/button';
  import InputSearch from '@Component/input-search';
  import InputText from '@Component/input-text';
  import InputNumber from '@Component/input-number';
  import InputDate from '@Component/input-date';
  import InfoBlock from '@Component/info-block';
  import Container, { styles as containerStyles } from '@Component/container';

  let tarkennettuShown = true;
  let etVersio = '2018';
  let eLukuChecked = 'A,B,C,D,E,F,G';
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
        on:click={() => {
          tarkennettuShown = !tarkennettuShown;
        }}>
        {#if tarkennettuShown}
          <span class="uppercase font-bold">Vähemmän hakuehtoja</span>
          <span class="font-icon text-4xl">expand_less</span>
        {:else}
          <span class="uppercase font-bold">Lisää hakuehtoja</span>
          <span class="font-icon text-4xl">expand_more</span>
        {/if}
      </button>
    </div>
    {#if tarkennettuShown}
      <div
        class="tarkennettu-haku w-full flex flex-col my-4 py-4 border-t-2 border-b-2 border-green space-y-2"
        transition:slide>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            Versio
          </span>

          <div class="w-full md:w-1/2">
            <div class="flex justify-start">
              <label class="checkbox-container flex items-center p-2 md:p-0">
                <input type="radio" bind:group={etVersio} value={'2018'} />
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
                <input type="radio" bind:group={etVersio} value={'2013'} />
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
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            Rakennuksen nimi
          </span>
          <div class="w-full md:w-1/2">
            <InputText label={'rakennus'} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            Pysyvä Rakennustunnus
          </span>
          <div class="w-full md:w-1/2">
            <InputText label={'rakennus'} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            Rakennuksen valmistumisvuosi
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputNumber
                label={'vvvv'}
                min="1000"
                max={new Date().getFullYear()}
                step="1"
                invalidMessage={'Sallittu arvo 1000-' + new Date().getFullYear()} />
            </div>
            <span class="material-icons"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={'vvvv'}
                min={new Date().getFullYear()}
                max="2900"
                step="1"
                invalidMessage={'Sallittu arvo ' + new Date().getFullYear() + '-2900'} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            todistuksen laatimispäivä
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputDate label={'pp.kk.vvvv'} />
            </div>
            <span class="material-icons"> horizontal_rule </span>
            <div class="w-2/5">
              <InputDate label={'pp.kk.vvvv'} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            viimeinen voimassaolopäivä
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputDate label={'pp.kk.vvvv'} />
            </div>
            <span class="material-icons"> horizontal_rule </span>
            <div class="w-2/5">
              <InputDate label={'pp.kk.vvvv'} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            käyttötarkoitusluokka
          </span>
          <div class="w-full md:w-1/2">
            <InputText label={'luokka'} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            alakäyttötarkoitusluokka
          </span>
          <div class="w-full md:w-1/2">
            <InputText label={'luokka'} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            E-Luku (Kokonaisluku)
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputNumber label={'?'} min="0" step="1" />
            </div>
            <span class="material-icons"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber label={'?'} min="0" step="1" />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            E-Luku (A-G)
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
            class="tarkennettu-label w-full md:w-1/2 uppercase text-ashblue tracking-widest">
            Lämmitetty Nettoala (M2)
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputText label={'?'} />
            </div>
            <span class="material-icons"> horizontal_rule </span>
            <div class="w-2/5">
              <InputText label={'?'} />
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
      <Button {...buttonStyles.green}>Hae</Button>
      <Button {...buttonStyles.ashblue}>Tyhjennä hakuehdot</Button>
    </div>
  </div>
</Container>
