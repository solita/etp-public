<script>
  import {
    laatijat as laatijatStore,
    patevyydet,
    toimintaalueet
  } from '@/stores';
  import * as LaatijaUtils from '@/utilities/laatija';
  import * as GeoUtils from '@/utilities/geo';
  import { locale, labelLocale } from '@Localization/localization';

  import Container, { styles as containerStyles } from '@Component/container';
  import Button, { styles as buttonStyles } from '@Component/button';
  import Spinner from '@Component/spinner';
  import { onMount } from 'svelte';
  import { backReferred } from '@/router/router';

  export let id;
  let component = null;

  let laatijaPromise = Promise.all([
    $laatijatStore,
    $patevyydet,
    $toimintaalueet
  ])
    .then(values => deserialize(values))
    .then(laatijat => {
      const laatijaFound = laatijat.find(laatija => laatija.id == id);
      if (laatijaFound) return laatijaFound;
      else laatijaPromise = Promise.reject('Laatijaa ei löytynyt.');
    });

  const deserialize = ([laatijat, patevyydet, toimintaalueet]) =>
    laatijat.reduce(
      (acc, laatija) => [
        ...acc,
        {
          ...laatija,
          nimi: `${laatija.etunimi} ${laatija.sukunimi}`,
          patevyys: labelLocale(
            $locale,
            LaatijaUtils.findPatevyys(patevyydet, laatija)
          ),
          'toimintaalue-nimi':
            labelLocale(
              $locale,
              GeoUtils.findToimintaalue(toimintaalueet, laatija.toimintaalue)
            ) ?? '',
          postitoimipaikka: laatija.postitoimipaikka ?? '',
          wwwosoite:
            laatija.wwwosoite && !laatija.wwwosoite?.match(/^https+:\/\//)
              ? `//${laatija.wwwosoite}`
              : laatija.wwwosoite
        }
      ],
      []
    );

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
          <span class="material-icons"> arrow_back </span>
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
        class="flex flex-col px-4 lg:px-8 xl:px-16 py-16 mx-auto items-start">
        <h1 class="text-xl">{laatija.nimi}</h1>
        <div class="flex flex-col md:flex-row space-x-2 my-1">
          <strong> Pätevyystaso: </strong>
          <span>{laatija.patevyys}</span>
        </div>
        <div class="flex flex-col md:flex-row space-x-2 my-1">
          <strong> Päätoiminta-alue: </strong>
          <span>{laatija['toimintaalue-nimi']}</span>
        </div>
        {#if laatija.osoite}
          <div class="flex flex-col md:flex-row space-x-2 my-1">
            <strong> Osoite: </strong>
            <span>{laatija.osoite}</span>
          </div>
        {/if}
        {#if laatija.wwwosoite}
          <div class="flex flex-col md:flex-row space-x-2 my-1">
            <strong> www-osoite </strong>
            <a href={laatija.wwwosoite}> <span>{laatija.wwwosoite}</span> </a>
          </div>
        {/if}
        {#if laatija.email}
          <div class="flex flex-col md:flex-row space-x-2 my-1">
            <strong> Sähköpostiosoite </strong>
            <a href="mailto:{laatija.email}"> <span>{laatija.email}</span> </a>
          </div>
        {/if}
        {#if laatija.puhelin}
          <div class="flex flex-col md:flex-row space-x-2 my-1">
            <strong> Puhelinnumero </strong>
            <a href="tel:{laatija.puhelin}"> <span>{laatija.puhelin}</span> </a>
          </div>
        {/if}
      </div>
    {:catch error}
      <div class="px-3 pb-8 lg:p-8 xl:p-16 w-full">{error}</div>
    {/await}
  </Container>
</div>
