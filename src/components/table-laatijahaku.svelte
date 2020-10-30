<script>
  import * as LaatijaUtils from '@/utilities/laatija';
  import { locale, labelLocale } from '@Localization/localization';

  import IconWeb from '@Asset/icons/web.svg';
  import IconMail from '@Asset/icons/mail.svg';
  import IconPhone from '@Asset/icons/phone.svg';

  export let laatijaCount;
  export let laatijat;

  let currentPageItemCount = laatijat.length;

  $: currentPageItemCount = laatijat.length;
</script>

<style>
  .icon {
    width: 1.6em;
    height: auto;
  }
  .icon.smaller {
    width: 1.3em;
  }

  /* Table styling in main.css */
</style>

<div class="table-container">
  {#if laatijaCount < 1}
    <span>Ei tuloksia.</span>
    <slot name="filter" />
  {:else}
    <h2>Tuloksia {laatijaCount}</h2>
    <slot name="filter" />
    {#if currentPageItemCount > 0}
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
            {#each laatijat as laatija}
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
    {/if}
  {/if}
  <slot name="pagination" currentPageItemCount={laatijat.length} />
</div>
