<script>
  import {
    laatijat as laatijatStore,
    patevyydet,
    toimintaalueet
  } from '@/stores';
  import * as LaatijaUtils from '@/utilities/laatija';
  import * as GeoUtils from '@/utilities/geo';

  import Container, { styles as containerStyles } from '@Component/container';
  import Button, { styles as buttonStyles } from '@Component/button';
  import Spinner from '@Component/spinner';
  import { onMount } from 'svelte';
  import { backReferred } from '@/router/router';

  export let id;

  let component = null;
  $: laatijaPromise = $laatijatStore.then(laatijat => {
    const laatijaFound = laatijat.find(laatija => laatija.id == id);
    if (laatijaFound) return laatijaFound;

    return Promise.reject('Laatijaa ei löytynyt.');
  });

  onMount(() => component.scrollIntoView());
</script>

<div bind:this={component}>
  <Container {...containerStyles.beige}>
    <div
      class="flex flex-col justify-center items-left sm:px-16 sm:py-8 px-4 py-4">
      <div>
        <Button
          {...buttonStyles.green}
          on:click={() => {
            backReferred('/laatijahaku');
          }}>
          <span class="material-icons">arrow_back</span>
          <span>Takaisin laatijahakuun</span>
        </Button>
      </div>
    </div>
  </Container>
  <Container {...containerStyles.white}>
    {#await laatijaPromise}
      <div class="flex justify-center">
        <Spinner />
      </div>
    {:then laatija}
      <div
        class="flex flex-col px-4 lg:px-8 xl:px-16 mx-auto items-start mb-16">
        <h1 class="text-xl my-8">{laatija.nimi}</h1>
        <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
          <strong class="w-full md:w-1/3">Pätevyystaso:</strong>
          <span>{laatija.patevyys}</span>
        </div>
        <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
          <strong class="w-full md:w-1/3">Pätevyyden voimassaoloaika:</strong>
          <span>
            {Intl.DateTimeFormat('fi-FI').format(new Date(laatija.toteamispaivamaara))}
            - {Intl.DateTimeFormat('fi-FI').format(new Date(laatija['voimassaolo-paattymisaika']))}
          </span>
        </div>
        <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
          <strong class="w-full md:w-1/3">Päätoiminta-alue:</strong>
          <span>{laatija['toimintaalue-nimi']}</span>
        </div>
        {#if laatija['muuttoimintaalueet-nimet'].length}
          <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
            <strong class="w-full md:w-1/3">Muut toimintaalueet:</strong>
            <span>{laatija['muuttoimintaalueet-nimet'].join(', ')}</span>
          </div>
        {/if}
        {#if laatija.jakeluosoite}
          <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
            <strong class="w-full md:w-1/3">Osoite:</strong>
            <span>
              {laatija.jakeluosoite}, {laatija.postinumero}
              {laatija.postitoimipaikka}
            </span>
          </div>
        {/if}
        {#if laatija.wwwosoite}
          <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
            <strong class="w-full md:w-1/3">www-osoite</strong>
            <a href={laatija.wwwosoite}>{laatija.wwwosoite.split('//')[1]}</a>
          </div>
        {/if}
        {#if laatija.email}
          <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
            <strong class="w-full md:w-1/3">Sähköpostiosoite</strong>
            <a href="mailto:{laatija.email}">{laatija.email}</a>
          </div>
        {/if}
        {#if laatija.puhelin}
          <div class="flex flex-col md:flex-row space-x-2 my-1 w-full">
            <strong class="w-full md:w-1/3">Puhelinnumero</strong>
            <a href="tel:{laatija.puhelin}">{laatija.puhelin}</a>
          </div>
        {/if}
      </div>
    {:catch error}
      <div class="px-3 pb-8 lg:p-8 xl:p-16 w-full">{error}</div>
    {/await}
  </Container>
</div>
