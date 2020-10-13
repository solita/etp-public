<script>
  import IconInfo from '@Asset/icons/info.svg';
  import IconWeb from '@Asset/icons/web.svg';
  import IconMail from '@Asset/icons/mail.svg';
  import IconPhone from '@Asset/icons/phone.svg';

  import * as LaatijaUtils from '@/utilities/laatija';
  import { locale, labelLocale } from '@Localization/localization';

  export let laatijat;
  export let haetutToimintaalueet;
  export let patevyydet;

  let showPatevyydet = '1,2';

  $: sortedLaatijat = laatijat
    .filter(laatija =>
      showPatevyydet
        .split(',')
        .map(item => parseInt(item))
        .includes(laatija.patevyystaso)
    )
    .map(laatija => ({
      ...laatija,
      painotus: LaatijaUtils.calculateLaatijaWeight(
        haetutToimintaalueet,
        laatija
      )
    }))
    .sort((a, b) => b.painotus - a.painotus);
</script>

<style>
  .icon {
    width: 1.6em;
    height: auto;
  }
  .icon.smaller {
    width: 1.3em;
  }

  .info-popup {
    display: none;
  }

  .icon-container {
    @apply relative hidden;
  }

  @screen md {
    .icon-container {
      @apply block;
    }
  }

  .icon-container:hover .info-popup {
    bottom: 135%;
    left: -1rem;
    @apply block absolute z-10 bg-white text-black border border-black rounded-lg p-2 whitespace-pre;
  }

  .info-popup::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 10px 10px 0;
    border-color: black transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -10px;
    left: 1rem;
  }

  /* Custom Radio Inputs */
  .radio-container {
    padding-left: 25px;
    @apply select-none block relative;
  }

  .radio-container input {
    @apply absolute opacity-0 cursor-pointer select-none outline-none pointer-events-none;
  }
  .radio-container .radio-visual {
    top: 0.1em;
    left: 0;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    @apply bg-lightgrey absolute;
  }
  .radio-container:hover input ~ .radio-visual {
    @apply bg-darkgrey;
  }
  .radio-container input:checked ~ .radio-visual {
    @apply bg-green;
  }
  .radio-visual:after {
    content: '';
    @apply absolute hidden;
  }
  .radio-container input:checked ~ .radio-visual:after {
    @apply block;
  }
  .radio-container .radio-visual:after {
    top: 7px;
    left: 7px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    @apply bg-white;
  }
</style>

<div class="table-container">
  <div class="flex">
    <div class="flex items-start space-x-1 mr-3">
      <label class="radio-container">
        <input
          id="kaikkitasot"
          type="radio"
          bind:group={showPatevyydet}
          value={'1,2'} />
        <span class="radio-visual" />
        Kaikki tasot</label>

      <div class="icon-container">
        <!-- <img class="icon" src={IconInfo} alt="Info icon" /> -->
        <span class="material-icons text-green"> error_outline </span>
        <div class="info-popup">
          <strong>Kaikki tasot:</strong>
          <p>{'Perustason ja ylemmän tason laatijat näkyvät tuloksissa.'}</p>
        </div>
      </div>
    </div>
    <div class="flex items-start space-x-1 mr-3">
      <label class="radio-container">
        <input
          id="perustaso"
          type="radio"
          bind:group={showPatevyydet}
          value={'1'} />
        <span class="radio-visual" />
        {labelLocale($locale, patevyydet[0])}
      </label>
      <div class="icon-container">
        <!-- <img class="icon" src={IconInfo} alt="Info icon" /> -->
        <span class="material-icons text-green"> error_outline </span>
        <div class="info-popup">
          <strong>Perustaso:</strong>
          <p>
            {'Voi laatia energiatodistuksen rakennukselle tai rakennuksen osalle, \njossa laskennallisen kokonaisenergiankulutuksen laskemiseen \nkäytetään kuukausitason laskentamenetelmää. \nTyypillinen tällainen rakennus on esimerkiksi omakotitalo.'}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-start space-x-1">
      <label class="radio-container">
        <input
          id="ylempitaso"
          type="radio"
          bind:group={showPatevyydet}
          value={'2'} />
        <span class="radio-visual" />
        {labelLocale($locale, patevyydet[1])}
      </label>
      <div class="icon-container">
        <!-- <img class="icon" src={IconInfo} alt="Info icon" /> -->
        <span class="material-icons text-green"> error_outline </span>
        <div class="info-popup">
          <strong>Ylempi taso:</strong>
          <p>{'Vain ylemmän tason laatijat näkyvät tuloksissa.'}</p>
        </div>
      </div>
    </div>
  </div>
  {#if sortedLaatijat.length < 1}
    <span>Ei tuloksia.</span>
  {:else}
    <div class="w-full overflow-auto">
      <table class="w-full table-auto text-left my-2">
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Pätevyys</th>
            <th>Päätoiminta-alue</th>
            <th>Postitoimipaikka</th>
            <th>WWW</th>
            <th>Email</th>
            <th>Puhelinnumero</th>
          </tr>
        </thead>
        <tbody>
          {#each sortedLaatijat as laatija}
            <tr>
              <td data-title="Nimi">{laatija.nimi}</td>
              <td data-title="Pätevyys">{laatija.patevyys}</td>
              <td data-title="Päätoiminta-alue">
                {laatija['toimintaalue-nimi']}
              </td>
              <td data-title="Postitoimipaikka">{laatija.postitoimipaikka}</td>
              <td data-title="WWW">
                {#if laatija.wwwosoite}
                  <a href={laatija.wwwosoite} title={laatija.wwwosoite}>
                    <img
                      class="icon md:mx-auto"
                      src={IconWeb}
                      alt="Website link icon" />
                  </a>
                {/if}
              </td>
              <td data-title="Email">
                {#if laatija.email}
                  <a href="mailto:{laatija.email}" title={laatija.email}>
                    <img
                      class="icon md:mx-auto"
                      src={IconMail}
                      alt="Email icon" />
                  </a>
                {/if}
              </td>
              <td data-title="Puhelinnumero">
                {#if laatija.puhelin}
                  <a
                    class="inline-flex"
                    href="tel:{laatija.puhelin}"
                    title={laatija.puhelin}>
                    <img
                      class="icon smaller mr-1"
                      src={IconPhone}
                      alt="Phone icon" />
                    <span>{laatija.puhelin}</span>
                  </a>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div
      class="flex w-full align-center md:justify-start my-3 flex-col md:flex-row">
      <div class="counter mx-auto md:mx-0">Tuloksia {laatijat.length}</div>
      <div class="pagination">
        <span class="cursor-pointer uppercase mr-2">edellinen</span>
        <div class="flex pages">
          <span class="cursor-pointer uppercase px-1">1</span>
          <span class="cursor-pointer uppercase px-1">2</span>
          <span class="cursor-pointer uppercase px-1">3</span>
          <span class="px-2 font-normal">-</span>
          <span class="cursor-pointer uppercase px-1">18</span>
          <span class="cursor-pointer uppercase px-1">19</span>
          <span class="cursor-pointer uppercase px-1">20</span>
        </div>
        <span class="cursor-pointer uppercase ml-2">seuraava</span>
      </div>
    </div>
  {/if}
</div>
