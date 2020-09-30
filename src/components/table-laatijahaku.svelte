<script>
  import IconInfo from '@Asset/icons/info.svg';
  import IconWeb from '@Asset/icons/web.svg';
  import IconMail from '@Asset/icons/mail.svg';
  import IconPhone from '@Asset/icons/phone.svg';
  export let data;
</script>

<style>
  th {
    @apply uppercase text-green;
  }

  th,
  td {
    border: 1px solid #979797;
  }

  th:first-child,
  td:first-child,
  th:last-child,
  td:last-child {
    border: none;
  }

  tr,
  th,
  td {
    border-top: none;
    border-bottom: none;
  }

  tr:nth-child(even) {
    @apply bg-grey;
  }

  td:first-child {
    @apply text-green;
  }

  .icon {
    width: 25px;
    height: auto;
  }
  .icon.smaller {
    width: 20px;
  }
  .pages span {
    border-left: 1px solid #979797;
  }
  .pages span:last-child {
    border-right: 1px solid #979797;
  }

  .info-popup {
    display: none;
  }

  .icon-container:hover .info-popup {
    display: block;
    position: absolute;
    bottom: 135%;
    left: -1rem;
    z-index: 1;
    @apply bg-white text-black border border-black rounded-lg p-2;
  }

  .info-popup::after{
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

<div>
  <div class="flex">
    <div class="flex items-center space-x-1 mr-3">
      <input base type="checkbox" />
      <label for="base">Perustaso</label>
      <div class="icon-container relative">
        <img class="icon" src={IconInfo} alt="Info icon"/>
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
      <input upper type="checkbox" />
      <label for="upper">Ylempi taso</label>
      <div class="icon-container relative">
        <img class="icon" src={IconInfo} alt="Info icon"/>
        <div class="info-popup">
          <strong>Ylempi taso:</strong>
          <p>
            ???
          </p>
        </div>
      </div>
    </div>
  </div>
  {#if data.length < 1}
    <span>Ei tuloksia.</span>
  {:else}
    <table class="table-auto text-left">
      <thead>
        <tr>
          <th class="px-4 py-2">Nimi</th>
          <th class="px-4 py-2">Pätevyys</th>
          <th class="px-4 py-2">Päätoiminta-alue</th>
          <th class="px-4 py-2">Postitoimipaikka</th>
          <th class="px-4 py-2">WWW</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Puhelinnumero</th>
        </tr>
      </thead>
      <tbody>
        {#each data as laatija}
          <tr>
            <td class="border px-4 py-2">{laatija.nimi}</td>
            <td class="border px-4 py-2">{laatija.patevyys}</td>
            <td class="border px-4 py-2">{laatija.alue}</td>
            <td class="border px-4 py-2">{laatija.postinum}</td>
            <td class="border px-4 py-2">
              <a href={laatija.link} title={laatija.link}>
                <img
                  class="icon mx-auto"
                  src={IconWeb}
                  alt="Website link icon" />
              </a>
            </td>
            <td class="border px-4 py-2">
              <a href="mailto:{laatija.email}" title={laatija.email}>
                <img class="icon mx-auto" src={IconMail} alt="Email icon" />
              </a>
            </td>
            <td class="border px-4 py-2 flex flex-no-wrap">
              <img class="icon smaller mr-1" src={IconPhone} alt="Phone icon" />
              <span>{laatija.puh}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="flex w-full justify-start my-3">
      <div class="counter">Tuloksia {data.length}</div>
      <div
        class="flex self-center mx-auto text-green text-center font-semibold">
        <span class="cursor-pointer uppercase mr-2">edellinen</span>
        <div class="flex pages">
          <span class="cursor-pointer uppercase px-1">1</span>
          <span class="cursor-pointer uppercase px-1">2</span>
          <span class="cursor-pointer uppercase px-1">3</span>
          <span class="px-2">-</span>
          <span class="cursor-pointer uppercase px-1">18</span>
          <span class="cursor-pointer uppercase px-1">19</span>
          <span class="cursor-pointer uppercase px-1">20</span>
        </div>
        <span class="cursor-pointer uppercase ml-2">seuraava</span>
      </div>
    </div>
  {/if}
</div>
