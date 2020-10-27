<script>
  import { createEventDispatcher } from 'svelte';
  import * as LaatijaUtils from '@/utilities/laatija';
  import { locale, labelLocale } from '@Localization/localization';

  import IconWeb from '@Asset/icons/web.svg';
  import IconMail from '@Asset/icons/mail.svg';
  import IconPhone from '@Asset/icons/phone.svg';

  export let laatijat;
  export let haetutToimintaalueet;
  export let patevyydet;
  export let page = 0;

  const dispatch = createEventDispatcher();
  const pageSize = 10;
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
  $: numberOfPages = Math.ceil(sortedLaatijat.length / pageSize);
  $: currentPage = Math.max(Math.min(numberOfPages - 1, parseInt(page)), 0);
  $: laatijatInPage = sortedLaatijat.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const goToPage = pageNum => {
    if (pageNum < 0 || pageNum >= numberOfPages) return;
    dispatch('updatePage', pageNum);
  };
  const nextPage = () => {
    goToPage(currentPage + 1);
  };
  const prevPage = () => {
    goToPage(currentPage - 1);
  };
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
    @apply relative;
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
  /* Table, Pagination styling in main.css */
</style>

<div class="table-container">
  {#if sortedLaatijat.length < 1 && showPatevyydet == '1,2'}
    <span>Ei tuloksia.</span>
  {:else}
    <h2>Tuloksia {sortedLaatijat.length}</h2>
    <div class="flex flex-col md:flex-row">
      <div class="flex items-start space-x-1 py-3 md:py-0 mr-3">
        <label class="radio-container">
          <input
            id="kaikkitasot"
            type="radio"
            bind:group={showPatevyydet}
            value={'1,2'} />
          <span class="radio-visual" />
          Kaikki tasot</label>

        <div class="icon-container hidden md:block">
          <span class="material-icons text-green"> error_outline </span>
          <div class="info-popup">
            <strong>Kaikki:</strong>
            <p>{'Perustason ja ylemmän tason laatijat näkyvät tuloksissa.'}</p>
          </div>
        </div>
      </div>
      <div class="flex items-start space-x-1 py-3 md:py-0 mr-3">
        <label class="radio-container">
          <input
            id="perustaso"
            type="radio"
            bind:group={showPatevyydet}
            value={'1'} />
          <span class="radio-visual" />
          {labelLocale($locale, patevyydet[0])}
        </label>
        <div class="icon-container hidden md:block">
          <span class="material-icons text-green"> error_outline </span>
          <div class="info-popup">
            <strong>Perustaso:</strong>
            <p>
              {'Voi laatia energiatodistuksen rakennukselle tai rakennuksen osalle, \njossa laskennallisen kokonaisenergiankulutuksen laskemiseen \nkäytetään kuukausitason laskentamenetelmää. \nTyypillinen tällainen rakennus on esimerkiksi omakotitalo.'}
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-start space-x-1 py-3 md:py-0">
        <label class="radio-container">
          <input
            id="ylempitaso"
            type="radio"
            bind:group={showPatevyydet}
            value={'2'} />
          <span class="radio-visual" />
          {labelLocale($locale, patevyydet[1])}
        </label>
        <div class="icon-container hidden md:block">
          <!-- <img class="icon" src={IconInfo} alt="Info icon" /> -->
          <span class="material-icons text-green"> error_outline </span>
          <div class="info-popup">
            <strong>Ylempi taso:</strong>
            <p>{'Vain ylemmän tason laatijat näkyvät tuloksissa.'}</p>
          </div>
        </div>
      </div>
      <div class="hidden md:block md:ml-auto">
        Tulokset
        {currentPage * pageSize + 1 + '...' + (currentPage * pageSize + laatijatInPage.length) + ' / ' + sortedLaatijat.length}
      </div>
    </div>
    {#if sortedLaatijat.length > 0}
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
            {#each laatijatInPage as laatija}
              <tr>
                <td data-title="Nimi">
                  <a href="/laatija?id={laatija.id}">{laatija.nimi}</a>
                </td>
                <td data-title="Pätevyys">{laatija.patevyys}</td>
                <td data-title="Päätoiminta-alue">
                  {laatija['toimintaalue-nimi']}
                </td>
                <td data-title="Postitoimipaikka">
                  {laatija.postitoimipaikka}
                </td>
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
      {#if numberOfPages > 1}
        <div
          class="flex w-full align-center md:justify-start my-3 flex-col md:flex-row">
          <div class="mx-auto md:hidden">
            Tulokset
            {currentPage * pageSize + 1 + '...' + (currentPage * pageSize + laatijatInPage.length) + ' / ' + sortedLaatijat.length}
          </div>
          <div class="pagination w-full md:w-auto">
            {#if currentPage > 0}
              <span
                class="cursor-pointer uppercase mr-2 hidden md:inline-block"
                on:click={prevPage}>edellinen</span>
              <span
                class="material-icons cursor-pointer md:hidden px-2 py-2 md:py-0"
                on:click={prevPage}>
                navigate_before
              </span>
            {:else}
              <span
                class="cursor-not-allowed uppercase mr-2 text-lightgrey hidden md:inline-block">edellinen</span>
              <span
                class="material-icons text-lightgrey md:hidden px-2 py-2 md:py-0">
                navigate_before
              </span>
            {/if}
            <div class="pages cursor-default flex items-center flex-grow">
              {#if currentPage > 2}
                <span
                  class="cursor-pointer uppercase py-2 md:py-0 flex-grow"
                  on:click={() => goToPage(0)}>1</span>
              {/if}
              {#if currentPage > 4}
                <span class="font-normal flex-grow py-2 md:py-0">-</span>
              {:else if currentPage == 4}
                <span
                  class="cursor-pointer uppercase py-2 md:py-0 flex-grow"
                  on:click={() => goToPage(1)}>2</span>
              {/if}
              {#if currentPage - 2 >= 0}
                <span
                  class="cursor-pointer uppercase py-2 md:py-0 flex-grow"
                  on:click={() => goToPage(currentPage - 2)}>{currentPage - 1}</span>
              {/if}
              {#if currentPage > 0}
                <span
                  class="cursor-pointer uppercase py-2 md:py-0 flex-grow"
                  on:click={prevPage}>{currentPage}</span>
              {/if}
              <span
                class="cursor-default uppercase text-black py-2 md:py-0 flex-grow">{currentPage + 1}</span>
              {#if currentPage + 1 < numberOfPages}
                <span
                  class="cursor-pointer uppercase py-2 md:py-0 flex-grow"
                  on:click={nextPage}>{currentPage + 2}</span>
              {/if}
              {#if currentPage + 2 < numberOfPages}
                <span
                  class="cursor-pointer uppercase py-2 md:py-0 flex-grow"
                  on:click={() => goToPage(currentPage + 2)}>{currentPage + 3}</span>
              {/if}
              {#if currentPage < numberOfPages - 5}
                <span class="font-normal py-2 md:py-0 flex-grow">-</span>
              {:else if currentPage == numberOfPages - 5}
                <span
                  class="cursor-pointer uppercase py-2 md:py-0 flex-grow"
                  on:click={() => goToPage(numberOfPages - 5)}>{numberOfPages - 1}</span>
              {/if}
              {#if currentPage < numberOfPages - 3}
                <span
                  class="cursor-pointer uppercase py-2 md:py-0 flex-grow"
                  on:click={() => goToPage(numberOfPages - 1)}>{numberOfPages}</span>
              {/if}
            </div>
            {#if currentPage + 1 < numberOfPages}
              <span
                class="cursor-pointer uppercase ml-2 hidden md:inline-block"
                on:click={nextPage}>seuraava</span>
              <span
                class="material-icons cursor-pointer md:hidden px-2 py-2 md:py-0"
                on:click={nextPage}>
                navigate_next
              </span>
            {:else}
              <span
                class="cursor-default uppercase ml-2 text-lightgrey hidden md:inline-block">seuraava</span>
              <span
                class="material-icons text-lightgrey md:hidden px-2 py-2 md:py-0">
                navigate_next
              </span>
            {/if}
          </div>
        </div>
      {/if}
    {/if}
  {/if}
</div>
