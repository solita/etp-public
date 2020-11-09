<script>
  import Container, { styles as containerStyles } from '@Component/container';
  import Button, { styles as buttonStyles } from '@Component/button';
  import Spinner from '@Component/spinner';
  import { onMount } from 'svelte';
  import { backReferred } from '@/router/router';

  export let id = 0;

  let component = null;
  // $: energiatodistusPromise = new Promise(() => {});
  $: energiatodistusPromise = {
    id: id,
    todistustunnus: '1234123',
    nimi: 'Rakennusnimi',
    osoite: 'Osoite 123',
    rakennustunnus: 'ABCDEFG',
    valmistumisvuosi: '2020',
    kayttotakoitusluokka: 'Asuitalot, joissa ujansdfoasngobaosugboi',
    eluku: '??????',
    todistuksenlaatija: 'Leena Laatija',
    todistuksenlaatimispaiva: '1.1.2020',
    todistuksenviimeinenvoimassaolopaiva: '31.1.2099',
    nettoala: '610 m2',
    lammitysjarjestelma:
      'Kaukolämpö, Vesiradiaattori / Kaukolämpö, kiertojohdolla',
    ilmanvaihtojarjestelma: 'Koneellinen poisto ilman skajnfgipsngipo'
  };

  onMount(() => component.scrollIntoView());
</script>

<div bind:this={component}>
  <Container {...containerStyles.beige}>
    <div
      class="flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y-0 lg:space-x-2 items-left sm:px-16 sm:py-8 px-4 py-4">
      <Button
        {...buttonStyles.green}
        on:click={() => {
          backReferred('/ethaku');
        }}>
        <span class="material-icons align-middle">arrow_back</span>
        <span class="whitespace-no-wrap">Takaisin listaukseen</span>
      </Button>
      <span class="flex-grow mr-2">Energiatodistuksesta saa nähtäväksi koosteen
        eli kahden ensimmäisen sivun tiedot (henkilötietosuojan vuoksi ei
        kuitenkaan 1-2 huoneistoa koskevista kohteista).
      </span>
    </div>
  </Container>
  <Container {...containerStyles.white}>
    <div class="sm:px-16 sm:py-8 px-4 py-4">
      {#await energiatodistusPromise}
        <div class="flex justify-center">
          <Spinner />
        </div>
      {:then energiatodistus}
        <div class="w-full flex flex-col mx-auto items-center space-y-2">
          <div
            class="w-full flex flex-col md:flex-row justify-between items-center">
            <h1 class="text-xl uppercase text-ashblue my-0">
              Energiatodistus 201X - Kooste
            </h1>
            <Button
              {...buttonStyles.ashblue}
              on:click={() => {
                backReferred('/laatijahaku');
              }}>
              <span class="material-icons">visibility</span>
              <span>Katso virallinen malli</span>
            </Button>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Todistustunnus:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.todistustunnus}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Rakennuksen nimi ja osoite:</strong>
            <span class="w-full md:w-1/2">{energiatodistus.nimi}
              -
              {energiatodistus.osoite}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Rakennustunnus:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.rakennustunnus}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Rakennuksen käyttötarkoitusluokka:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.kayttotakoitusluokka}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Rakennuksen valmistumisvuosi:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.valmistumisvuosi}</span>
          </div>
          <div class="w-full h-40 flex border-2 border-green bg-lightgreen">
            <strong class="m-auto align-middle">TODO: graphic here</strong>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-2/3">Rakennuksen laskennallinen
              kokonaisenergiankulutus eli E-luku:</strong>
            <span class="w-full md:w-1/3">{energiatodistus.eluku}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Todistuksen laatija:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.todistuksenlaatija}</span>
          </div>
          <div
            class="flex flex-col md:flex-row md:space-x-2 w-full items-center justify-center">
            <div class="flex flex-col w-full md:w-1/2">
              <strong class="w-full md:w-1/2">Todistuksen laatimispäivä:</strong>
              <span
                class="w-full md:w-1/2">{energiatodistus.todistuksenlaatimispaiva}</span>
            </div>
            <div class="flex flex-col w-full md:w-1/2">
              <strong class="w-full md:w-1/2">Viimeinen voimassaolopäivä:</strong>
              <span
                class="w-full md:w-1/2">{energiatodistus.todistuksenviimeinenvoimassaolopaiva}</span>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col mx-auto items-center space-y-2 my-4">
          <h2 class="w-full text-green uppercase text-xl">
            Yhteenveto rakennuksen energiatehokkuudesta
          </h2>
          <span class="w-full bg-ashblue text-white uppercase p-4">Laskettu
            kokonaisenergiankulutus ja ostoenergiankulutus</span>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Lämmitetty nettoala:</strong>
            <span class="w-full md:w-1/2">{energiatodistus.nettoala}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Lämmitysjärjestelmän kuvaus</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.lammitysjarjestelma}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2">Ilmanvaihtojärjestelmän kuvaus</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.ilmanvaihtojarjestelma}</span>
          </div>
        </div>

        <table class="w-full table-fixed mx-auto my-4 font-bold text-center">
          <thead class="bg-beige text-green align-center">
            <tr>
              <th class="w-1/5 pl-2 text-left" rowspan="2">
                Käytettävä energiamuoto
              </th>
              <th class="w-2/5" colspan="2">
                Vakioidulla käytöllä laskettu ostoenergia
              </th>
              <th class="w-1/5" rowspan="2">Energiamuodon kerroin</th>
              <th class="w-1/5" rowspan="2">
                Energiamuodon kertoimella painotettu energia kWh/(m2/vuosi)
              </th>
            </tr>
            <tr>
              <th>kWhE/vuosi</th>
              <th>kWh/(m2/vuosi)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-4 pl-2 text-left">Sahko</td>
              <td class="py-4">1234</td>
              <td class="py-4">1234</td>
              <td class="py-4 font-normal">1234</td>
              <td class="py-4">1234</td>
            </tr>
            <tr>
              <td class="py-4 pl-2 text-left">Kaukolampo</td>
              <td class="py-4">1234</td>
              <td class="py-4">1234</td>
              <td class="py-4 font-normal">1234</td>
              <td class="py-4">1234</td>
            </tr>
            <tr>
              <td class="py-4 pl-2 text-left">Uusiutuva polttoaine</td>
              <td class="py-4">1234</td>
              <td class="py-4">1234</td>
              <td class="py-4 font-normal">1234</td>
              <td class="py-4">1234</td>
            </tr>
            <tr class="border-t border-grey">
              <td class="py-4 w-4/5 justify-end text-right" colspan="4">
                Energiatehottuuden vertailuluku (E-luku)
              </td>
              <td class="py-4">1234</td>
            </tr>
          </tbody>
        </table>
      {:catch error}
        <div class="px-3 pb-8 md:p-8 xl:p-16 w-full">{error}</div>
      {/await}
    </div>
  </Container>
</div>
