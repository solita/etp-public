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
  .graph-color-a {
    background-color: #1d8c38;
    padding-right: 10%;
  }
  .graph-color-a ~ .arrow-right {
    border-left-color: #1d8c38;
  }
  .graph-color-b {
    background-color: #72a42f;
    padding-right: 20%;
  }
  .graph-color-b ~ .arrow-right {
    border-left-color: #72a42f;
  }
  .graph-color-c {
    background-color: #c3cc16;
    padding-right: 30%;
  }
  .graph-color-c ~ .arrow-right {
    border-left-color: #c3cc16;
  }
  .graph-color-d {
    background-color: #ffe900;
    padding-right: 40%;
  }
  .graph-color-d ~ .arrow-right {
    border-left-color: #ffe900;
  }
  .graph-color-e {
    background-color: #e5ac00;
    padding-right: 50%;
  }
  .graph-color-e ~ .arrow-right {
    border-left-color: #e5ac00;
  }
  .graph-color-f {
    background-color: #c95a00;
    padding-right: 60%;
  }
  .graph-color-f ~ .arrow-right {
    border-left-color: #c95a00;
  }
  .graph-color-g {
    background-color: #bc000b;
    padding-right: 70%;
  }
  .graph-color-g ~ .arrow-right {
    border-left-color: #bc000b;
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
        <div class="w-full flex mx-auto mb-8">
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
        <div class="w-full flex flex-col mx-auto items-center space-y-6">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Todistustunnus:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus.todistustunnus}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Rakennuksen nimi ja
              osoite:</span>
            <span class="w-full md:w-1/2">{energiatodistus.nimi}
              -
              {energiatodistus.osoite}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Rakennustunnus:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus.rakennustunnus}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Rakennuksen
              käyttötarkoitusluokka:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus.kayttotakoitusluokka}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Rakennuksen
              valmistumisvuosi:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus.valmistumisvuosi}</span>
          </div>
          <div class="w-full my-8 flex flex-col bg-white">
            <div class="w-full flex border-b border-black">
              <div class="w-0 md:w-1/2 md:border-r border-black p-2" />
              <div
                class="w-full md:w-1/2 px-2 py-4 flex justify-end md:justify-start md:pl-10">
                <span class="text-green text-lg">Energiatehokkuusluokka</span>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-a">A</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                <div class="arrow-left" />
                <div
                  class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                  <span class="font-bold">A</span><span
                    class="text-sm -mb-1">201X</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-b">B</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                <div class="arrow-left" />
                <div
                  class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                  <span class="font-bold">B</span><span
                    class="text-sm -mb-1">201X</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-c">C</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                <div class="arrow-left" />
                <div
                  class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                  <span class="font-bold">C</span><span
                    class="text-sm -mb-1">201X</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-d">D</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                <div class="arrow-left" />
                <div
                  class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                  <span class="font-bold">D</span><span
                    class="text-sm -mb-1">201X</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-e">E</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                <div class="arrow-left" />
                <div
                  class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                  <span class="font-bold">E</span><span
                    class="text-sm -mb-1">201X</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-f">F</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                <div class="arrow-left" />
                <div
                  class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                  <span class="font-bold">F</span><span
                    class="text-sm -mb-1">201X</span>
                </div>
              </div>
            </div>
            <div class="w-full flex border-b border-black">
              <div
                class="flex items-center justify-start w-1/2 border-r border-black px-2 py-4">
                <span
                  class="inline-block font-bold py-1 px-4 text-2xl graph-color-g">G</span>
                <div class="arrow-right" />
              </div>
              <div
                class="flex items-center justify-end md:justify-start w-1/2 px-2 py-4 md:pl-10">
                <div class="arrow-left" />
                <div
                  class="inline-block py-1 pl-4 pr-10 text-2xl bg-black text-white">
                  <span class="font-bold">G</span><span
                    class="text-sm -mb-1">201X</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-2/3 text-ashblue">Rakennuksen
              laskennallinen kokonaisenergiankulutus eli E-luku:</span>
            <span class="w-full md:w-1/3">{energiatodistus.eluku}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Todistuksen laatija:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus.todistuksenlaatija}</span>
          </div>
          <div
            class="flex flex-col md:flex-row md:space-x-2 w-full items-center justify-center">
            <div class="flex flex-col w-full md:w-1/2">
              <span class="w-full md:w-1/2 text-ashblue">Todistuksen
                laatimispäivä:</span>
              <span
                class="w-full md:w-1/2">{energiatodistus.todistuksenlaatimispaiva}</span>
            </div>
            <div class="flex flex-col w-full md:w-1/2">
              <span class="w-full md:w-1/2 text-ashblue">Viimeinen
                voimassaolopäivä:</span>
              <span
                class="w-full md:w-1/2">{energiatodistus.todistuksenviimeinenvoimassaolopaiva}</span>
            </div>
          </div>
        </div>

        <h2 class="w-full text-green uppercase text-xl mt-8">
          Yhteenveto rakennuksen energiatehokkuudesta
        </h2>
        <span
          class="w-full flex bg-ashblue text-white uppercase px-4 py-3 my-4">Laskettu
          kokonaisenergiankulutus ja ostoenergiankulutus</span>
        <div class="w-full flex flex-col mx-auto items-center space-y-6 my-8">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Lämmitetty nettoala:</span>
            <span class="w-full md:w-1/2">{energiatodistus.nettoala}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Lämmitysjärjestelmän
              kuvaus:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus.lammitysjarjestelma}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/2 text-ashblue">Ilmanvaihtojärjestelmän
              kuvaus:</span>
            <span
              class="w-full md:w-1/2">{energiatodistus.ilmanvaihtojarjestelma}</span>
          </div>
        </div>

        <div class="overflow-x-scroll w-full">
          <table class="table-fixed mx-auto my-8 font-bold text-center">
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
          class="w-full flex bg-ashblue text-white uppercase px-4 py-3 my-4">
          Rakennuksen energiatehokkuusluokka
        </span>

        <div class="w-full flex flex-col mx-auto items-center space-y-6 my-8">
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/3 text-ashblue">Käytetty E-luvun
              kuokitteluasteikko:</span>
            <span class="w-full md:w-2/3">{energiatodistus.nettoala}</span>
          </div>
          <div
            class="flex flex-col md:flex-row space-x-2 w-full items-center justify-center">
            <span class="w-full md:w-1/3 text-ashblue">Luokkien rajat asteikolla</span>
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
            <span class="w-full md:w-1/3 text-ashblue">Tämän rakennuksen
              E-luokka</span>
            <span class="w-full md:w-2/3">{energiatodistus.nettoala}</span>
          </div>
          <p class="w-full">{energiatodistus.longtext}</p>
        </div>

        <div class="w-full flex flex-col mx-auto items-center space-y-6 mt-6">
          <h2 class="w-full text-green uppercase text-xl">
            Energitehokkuutta parantavia toimenpiteitä
          </h2>
          <span
            class="w-full bg-ashblue text-white uppercase px-4 py-3 my-4">Laskettu
            kokonaisenergiankulutus ja ostoenergiankulutus</span>
          <p class="w-full">{energiatodistus.longtext}</p>
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
