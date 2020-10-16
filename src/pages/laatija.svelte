<script>
  import * as LaatijaUtils from '@/utilities/laatija';

  import { laatijat as laatijatStore } from '@/stores';

  import Container, { styles as containerStyles } from '@Component/container';
  import Button, { styles as buttonStyles } from '@Component/button';
  import Spinner from '@Component/spinner';

  export let id;

  let laatija = new Promise(() => {});
</script>

<style>
</style>

<svelte:window
  on:load={async _ => {
    let laatijat = await $laatijatStore;
    laatija = laatijat.find(laatija => laatija.id == id);
  }} />

<div>
  <Container {...containerStyles.beige}>
    <div
      class="flex flex-col justify-center items-left sm:px-16 sm:py-8 px-4 py-4">
      <a href="/laatijahaku">
        <Button {...buttonStyles.green}>
          <span class="material-icons"> arrow_back </span>
          <span>Takaisin laatijahakuun</span>
        </Button>
      </a>
    </div>
  </Container>
  <Container {...containerStyles.white}>
    {#await laatija}
      <div class="flex justify-center">
        <Spinner />
      </div>
    {:then laatija}
      <div
        class="flex flex-col px-4 lg:px-8 xl:px-16 py-16 mx-auto items-center md:items-start">
        <h1 class="text-xl">{laatija.etunimi} {laatija.sukunimi}</h1>
        <div class="flex flex-col md:flex-row space-x-2 my-1">
          <strong> Pätevyystaso: </strong>
          <span>{laatija.patevyystaso}</span>
        </div>
        <div class="flex flex-col md:flex-row space-x-2 my-1">
          <strong> Päätoiminta-alue: </strong>
          <span>{laatija.toimintaalue}</span>
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
      <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col w-full">{error}</div>
    {/await}
  </Container>
</div>
