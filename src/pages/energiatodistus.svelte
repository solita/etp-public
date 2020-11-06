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
    tehokkuusluokka: 'B'
  };

  onMount(() => component.scrollIntoView());
</script>

<div bind:this={component}>
  <Container {...containerStyles.beige}>
    <div
      class="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0 lg:space-x-2 items-left sm:px-16 sm:py-8 px-4 py-4">
      <Button
        {...buttonStyles.green}
        class="w-full lg:w-1/3"
        on:click={() => {
          backReferred('/ethaku');
        }}>
        <span class="material-icons align-middle">arrow_back</span>
        <span>Takaisin listaukseen</span>
      </Button>
      <span class="w-full lg:w-2/3 flex-grow">Energiatodistuksesta saa
        nähtäväksi koosteen eli kahden ensimmäisen sivun tiedot
        (henkilötietosuojan vuoksi ei kuitenkaan 1-2 huoneistoa koskevista
        kohteista).
      </span>
    </div>
  </Container>
  <Container {...containerStyles.white}>
    <div
      class="flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-0 lg:space-x-2 items-left sm:px-16 sm:py-8 px-4 py-4">
      {#await energiatodistusPromise}
        <div class="flex justify-center">
          <Spinner />
        </div>
      {:then energiatodistus}
        <div class="flex flex-col px-4 mx-auto justify-between items-center">
          <div class="flex flex-col lg:flex-row">
            <div>
              <strong
                class="text-xl my-8 uppercase text-ashblue">Energiatodistus 201X
                - Kooste</strong>
            </div>
            <Button
              {...buttonStyles.ashblue}
              on:click={() => {
                backReferred('/laatijahaku');
              }}>
              <span class="material-icons">visibility</span>
              <span>Katso virallinen malli</span>
            </Button>
          </div>
          <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
            <strong class="w-full md:w-1/3">Todistustunnus:</strong>
            <span>{energiatodistus.todistustunnus}</span>
          </div>
          <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
            <strong class="w-full md:w-1/3">Pätevyyden voimassaoloaika:</strong>
            <span> {energiatodistus.todistustunnus} </span>
          </div>
          <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
            <strong class="w-full md:w-1/3">Rakennuksen nimi:</strong>
            <span>{energiatodistus.nimi}</span>
          </div>
        </div>
      {:catch error}
        <div class="px-3 pb-8 lg:p-8 xl:p-16 w-full">{error}</div>
      {/await}
    </div>
  </Container>
</div>
