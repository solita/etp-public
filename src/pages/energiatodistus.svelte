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
    ilmanvaihtojarjestelma: 'Koneellinen poisto ilman skajnfgipsngipo',
    longtext: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo tincidunt accumsan. Nam ac turpis ex. Donec bibendum lorem sem, vitae tincidunt dui condimentum quis. `
  };

  onMount(() => component.scrollIntoView());
</script>

<style>
  .light-span-list span,
  p {
    @apply font-light;
  }
</style>

<div bind:this={component}>
  <Container {...containerStyles.beige}>
    <div
      class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-2 items-left sm:px-16 sm:py-8 px-4 py-4">
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
    <div class="sm:px-16 sm:py-8 px-4 py-4 text-lg">
      {#await energiatodistusPromise}
        <div class="flex justify-center">
          <Spinner />
        </div>
      {:then energiatodistus}
        <div class="w-full flex mx-auto">
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
              <span class="whitespace-no-wrap">Katso virallinen malli</span>
            </Button>
          </div>
        </div>
        <div
          class="light-span-list w-full flex flex-col mx-auto items-center space-y-4">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong
              class="w-full md:w-1/2 text-ashblue">Todistustunnus:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.todistustunnus}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2 text-ashblue">Rakennuksen nimi ja
              osoite:</strong>
            <span class="w-full md:w-1/2">{energiatodistus.nimi}
              -
              {energiatodistus.osoite}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong
              class="w-full md:w-1/2 text-ashblue">Rakennustunnus:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.rakennustunnus}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2 text-ashblue">Rakennuksen
              käyttötarkoitusluokka:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.kayttotakoitusluokka}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2 text-ashblue">Rakennuksen
              valmistumisvuosi:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.valmistumisvuosi}</span>
          </div>
          <div class="w-full my-8 flex flex-col bg-white">
            <div class="w-full flex border-b border-black">
              <div class="w-0 lg:w-1/2 lg:border-r border-black p-2" />
              <div
                class="w-full lg:w-1/2 px-2 py-4 flex justify-end lg:justify-start">
                <strong
                  class="text-green text-lg">Energiatehokkuusluokka</strong>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div class="w-1/2 border-r border-black px-2 py-4">
                <strong
                  class="w-1/12 m-2 py-3 px-4 text-2xl bg-green">A</strong>
                <span class="w-11/12" />
              </div>
              <div class="w-1/2 px-2 py-4">
                <div class="inline m-2 py-3 px-4 text-2xl bg-black text-white">
                  <strong>A</strong><span class="text-sm -mb-1">2013</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div class="w-1/2 border-r border-black px-2 py-4">
                <strong
                  class="w-2/12 m-2 py-3 px-4 text-2xl bg-lightgreen">B</strong>
                <span class="w-10/12" />
              </div>
              <div class="w-1/2 px-2 py-4">
                <div class="inline m-2 py-3 px-4 text-2xl bg-black text-white">
                  <strong>B</strong><span class="text-sm -mb-1">2013</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div class="w-1/2 border-r border-black px-2 py-4">
                <strong
                  class="w-2/12 m-2 py-3 px-4 text-2xl bg-lightgreen">C</strong>
                <span class="w-10/12" />
              </div>
              <div class="w-1/2 px-2 py-4">
                <div class="inline m-2 py-3 px-4 text-2xl bg-black text-white">
                  <strong>C</strong><span class="text-sm -mb-1">2013</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div class="w-1/2 border-r border-black px-2 py-4">
                <strong
                  class="w-2/12 m-2 py-3 px-4 text-2xl bg-lightgreen">D</strong>
                <span class="w-10/12" />
              </div>
              <div class="w-1/2 px-2 py-4">
                <div class="inline m-2 py-3 px-4 text-2xl bg-black text-white">
                  <strong>D</strong><span class="text-sm -mb-1">2013</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div class="w-1/2 border-r border-black px-2 py-4">
                <strong
                  class="w-2/12 m-2 py-3 px-4 text-2xl bg-lightgreen">E</strong>
                <span class="w-10/12" />
              </div>
              <div class="w-1/2 px-2 py-4">
                <div class="inline m-2 py-3 px-4 text-2xl bg-black text-white">
                  <strong>E</strong><span class="text-sm -mb-1">2013</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div class="w-1/2 border-r border-black px-2 py-4">
                <strong
                  class="w-2/12 m-2 py-3 px-4 text-2xl bg-lightgreen">F</strong>
                <span class="w-10/12" />
              </div>
              <div class="w-1/2 px-2 py-4">
                <div class="inline m-2 py-3 px-4 text-2xl bg-black text-white">
                  <strong>F</strong><span class="text-sm -mb-1">2013</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div class="w-1/2 border-r border-black px-2 py-4">
                <strong
                  class="w-2/12 m-2 py-3 px-4 text-2xl bg-lightgreen">G</strong>
                <span class="w-10/12" />
              </div>
              <div class="w-1/2 px-2 py-4">
                <div class="inline m-2 py-3 px-4 text-2xl bg-black text-white">
                  <strong>G</strong><span class="text-sm -mb-1">2013</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-2/3 text-ashblue">Rakennuksen
              laskennallinen kokonaisenergiankulutus eli E-luku:</strong>
            <span class="w-full md:w-1/3">{energiatodistus.eluku}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2 text-ashblue">Todistuksen laatija:</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.todistuksenlaatija}</span>
          </div>
          <div
            class="flex flex-col md:flex-row md:space-x-2 w-full items-center justify-center">
            <div class="flex flex-col w-full md:w-1/2">
              <strong class="w-full md:w-1/2 text-ashblue">Todistuksen
                laatimispäivä:</strong>
              <span
                class="w-full md:w-1/2">{energiatodistus.todistuksenlaatimispaiva}</span>
            </div>
            <div class="flex flex-col w-full md:w-1/2">
              <strong class="w-full md:w-1/2 text-ashblue">Viimeinen
                voimassaolopäivä:</strong>
              <span
                class="w-full md:w-1/2">{energiatodistus.todistuksenviimeinenvoimassaolopaiva}</span>
            </div>
          </div>
        </div>

        <h2 class="w-full text-green uppercase text-xl mt-6">
          Yhteenveto rakennuksen energiatehokkuudesta
        </h2>
        <span
          class="w-full flex bg-ashblue text-white uppercase px-4 py-3 my-4">Laskettu
          kokonaisenergiankulutus ja ostoenergiankulutus</span>
        <div
          class="light-span-list w-full flex flex-col mx-auto items-center space-y-4 my-4">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2 text-ashblue">Lämmitetty nettoala:</strong>
            <span class="w-full md:w-1/2">{energiatodistus.nettoala}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2 text-ashblue">Lämmitysjärjestelmän
              kuvaus</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.lammitysjarjestelma}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/2 text-ashblue">Ilmanvaihtojärjestelmän
              kuvaus</strong>
            <span
              class="w-full md:w-1/2">{energiatodistus.ilmanvaihtojarjestelma}</span>
          </div>
        </div>

        <div class="overflow-x-scroll w-full">
          <table class="table-fixed mx-auto my-4 font-bold text-center">
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
        </div>

        <span
          class="w-full flex bg-ashblue text-white uppercase px-4 py-3 my-4 font-medium">
          Rakennuksen energiatehokkuusluokka
        </span>

        <div
          class="light-span-list w-full flex flex-col mx-auto items-center space-y-4 my-4">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/3 text-ashblue">Käytetty E-luvun
              kuokitteluasteikko:</strong>
            <span class="w-full md:w-2/3">{energiatodistus.nettoala}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/3 text-ashblue">Luokkien rajat
              asteikolla</strong>
            <div class="w-full md:w-2/3">
              <strong>A</strong>
              <span>(0-80)</span>
              <strong>B</strong>
              <span>(81-110)</span>
              <strong>C</strong>
              <span>(111-150)</span>
              <strong>D</strong>
              <span>(151-210)</span>
              <strong>E</strong>
              <span>(211-340)</span>
              <strong>F</strong>
              <span>(341-410)</span>
              <strong>G</strong>
              <span>(411-)</span>
            </div>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <strong class="w-full md:w-1/3 text-ashblue">Tämän rakennuksen
              E-luokka</strong>
            <span class="w-full md:w-2/3">{energiatodistus.nettoala}</span>
          </div>
          <p class="w-full">{energiatodistus.longtext}</p>
        </div>

        <div class="w-full flex flex-col mx-auto items-center space-y-4 mt-6">
          <h2 class="w-full text-green uppercase text-xl">
            Energitehokkuutta parantavia toimenpiteitä
          </h2>
          <span
            class="w-full bg-ashblue text-white uppercase px-4 py-3 my-4">Laskettu
            kokonaisenergiankulutus ja ostoenergiankulutus</span>
          <p class="w-full font-light">{energiatodistus.longtext}</p>
          <div class="w-full">
            <Button
              {...buttonStyles.green}
              on:click={() => {
                console.log('print clicked');
              }}>
              <span class="material-icons align-middle">print</span>
              <span class="whitespace-no-wrap">Tulosta</span>
            </Button>
          </div>
        </div>
      {:catch error}
        <div class="px-3 pb-8 md:p-8 xl:p-16 w-full">{error}</div>
      {/await}
    </div>
  </Container>
</div>
