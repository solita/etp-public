<script>
  import { _ } from '@Localization/localization';

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
    <span>{$_('HAKU_TULOKSIA_EI')}</span>
    <slot name="filter" />
  {:else}
    <h2>{$_('HAKU_TULOKSIA')} {laatijaCount}</h2>
    <slot name="filter" />
    {#if currentPageItemCount > 0}
      <div class="w-full overflow-auto">
        <table class="w-full table-auto text-left my-2">
          <thead>
            <tr>
              <th>{$_('LHAKU_TH_NIMI')}</th>
              <th>{$_('LHAKU_TH_PATEVYYS')}</th>
              <th>{$_('LHAKU_TH_PAATOIMINTAALUE')}</th>
              <th>{$_('LHAKU_TH_POSTITOIMIPAIKKA')}</th>
              <th>{$_('LHAKU_TH_WWW')}</th>
              <th>{$_('LHAKU_TH_EMAIL')}</th>
              <th>{$_('LHAKU_TH_PUH')}</th>
            </tr>
          </thead>
          <tbody>
            {#each laatijat as laatija}
              <tr>
                <td>
                  <span class="m-title">{$_('LHAKU_TH_NIMI')}</span>
                  <a class="text-black underline md:text-green md:no-underline" href="/laatija?id={laatija.id}">{laatija.nimi || '-'}</a>
                </td>
                <td>
                  <span class="m-title">{$_('LHAKU_TH_PATEVYYS')}</span>
                  <span>{laatija.patevyys || '-'}</span>
                </td>
                <td>
                  <span class="m-title">{$_('LHAKU_TH_PAATOIMINTAALUE')}</span>
                  <span>{laatija['toimintaalue-nimi'] || '-'}</span>
                </td>
                <td>
                  <span class="m-title">{$_('LHAKU_TH_POSTITOIMIPAIKKA')}</span>
                  <span>{laatija.postitoimipaikka || '-'}</span>
                </td>
                <td>
                  <span class="m-title">{$_('LHAKU_TH_WWW')}</span>
                  {#if laatija.wwwosoite}
                    <a href={laatija.wwwosoite} title={laatija.wwwosoite}>
                      <img
                        class="icon md:mx-auto"
                        src={IconWeb}
                        alt="Website link icon" />
                    </a>
                  {:else}
                  <span>-</span>
                  {/if}
                </td>
                <td>
                  <span class="m-title">{$_('LHAKU_TH_EMAIL')}</span>
                  {#if laatija.email}
                    <a href="mailto:{laatija.email}" title={laatija.email}>
                      <img
                        class="icon md:mx-auto"
                        src={IconMail}
                        alt="Email icon" />
                    </a>
                  {:else}
                  <span>-</span>
                  {/if}
                </td>
                <td>
                  <span class="m-title">{$_('LHAKU_TH_PUH')}</span>
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
                  {:else}
                  <span>-</span>
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
