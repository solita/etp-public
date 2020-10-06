<script>
  import { locale } from '@Localization/localization';

  import IconInfo from '@Asset/icons/info.svg';
  import IconWeb from '@Asset/icons/web.svg';
  import IconMail from '@Asset/icons/mail.svg';
  import IconPhone from '@Asset/icons/phone.svg';

  export let laatijat;
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

  .icon-container:hover .info-popup {
    bottom: 135%;
    left: -1rem;
    @apply block absolute z-10 bg-white text-black border border-black rounded-lg p-2;
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
</style>

<div class="table-container">
  <div class="flex">
    <div class="flex items-center space-x-1 mr-3">
      <input id="perustaso" type="checkbox" />
      <label for="perustaso">Perustaso</label>
      <div class="icon-container relative">
        <img class="icon" src={IconInfo} alt="Info icon" />
        <div class="info-popup">
          <strong>Perustaso:</strong>
          <p>
            Voi laatia energiatodistuksen rakennukselle tai rakennuksen osalle,
            jossa laskennallisen kokonaisenergiankulutuksen laskemiseen
            käytetään kuukausitason laskentamenetelmää. Tyypillinen tällainen
            rakennus on esimerkiksi omakotitalo.
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center space-x-1">
      <input id="ylempitaso" type="checkbox" />
      <label for="ylempitaso">Ylempi taso</label>
      <div class="icon-container relative">
        <img class="icon" src={IconInfo} alt="Info icon" />
        <div class="info-popup">
          <strong>Ylempi taso:</strong>
          <p>???</p>
        </div>
      </div>
    </div>
  </div>
  {#if laatijat.length < 1}
    <span>Ei tuloksia.</span>
  {:else}
    <div class="w-full overflow-x-scroll lg:overflow-auto">
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
          {#each laatijat as laatija}
            <tr>
              <td data-title="Nimi">{laatija.nimi}</td>
              <td data-title="Pätevyys">{laatija.patevyystaso}</td>
              <td data-title="Päätoiminta">{laatija.toimialue}</td>
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
              <td data-title="Puhelinnumero" class="flex flex-no-wrap">
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
