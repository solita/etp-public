<script>
  import Container, { styles as containerStyles } from '@Component/container';
  import Button, { styles as buttonStyles } from '@Component/button';

  export let laatija;
</script>

<style>
</style>

<div>
  <Container {...containerStyles.beige}>
    <a href="/laatijahaku">
      <Button {...buttonStyles.green}>
        <span class="material-icons"> arrow_back </span>
        <span>Takaisin laatijahakuun</span>
      </Button>
    </a>
  </Container>
  <Container {...containerStyles.white}>
    <div class="flex flex-col">
      <h1>{laatija.nimi}</h1>
      <div class="flex flex-col md:flex-row">
        <span> Pätevyystaso: </span>
        <span>{laatija.patevyys}</span>
      </div>
      <div class="flex flex-col md:flex-row">
        <span> Päätoiminta-alue: </span>
        <span>{laatija.postitoimipaikka}</span>
      </div>
      {#if laatija.osoite}
        <div class="flex flex-col md:flex-row">
          <span> Osoite: </span>
          <span>{laatija.osoite}</span>
        </div>
      {/if}
      {#if laatija.wwwosoite}
        <div class="flex flex-col md:flex-row">
          <span> www-osoite </span>
          <a href={laatija.wwwosoite}> <span>{laatija.wwwosoite}</span> </a>
        </div>
      {/if}
      {#if laatija.email}
        <div class="flex flex-col md:flex-row">
          <span> Sähköpostiosoite </span>
          <a href="mailto:{laatija.email}"> <span>{laatija.email}</span> </a>
        </div>
      {/if}
      {#if laatija.puhelin}
        <div class="flex flex-col md:flex-row">
          <span> Puhelinnumero </span>
          <a href="tel:{laatija.puhelin}"> <span>{laatija.puhelin}</span> </a>
        </div>
      {/if}
    </div>
  </Container>
</div>
