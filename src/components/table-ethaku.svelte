<script>
  import { _ } from '@Localization/localization';
  export let etCount;
  export let eTodistukset;

  let currentPageItemCount = eTodistukset.length;

  $: currentPageItemCount = eTodistukset.length;
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
  {#if etCount < 1}
    <span>Ei tuloksia.</span>
    <slot name="filter" />
  {:else}
    <h2>Tuloksia {etCount}</h2>
    <slot name="filter" />
    {#if currentPageItemCount > 0}
      <div class="w-full overflow-auto">
        <table class="w-full table-auto text-left my-2">
          <thead>
            <tr>
              <th>{$_('ETHAKU_TH_TUNNUS')}</th>
              <th>{$_('ETHAKU_TH_ETLUOKKA')}</th>
              <th>{$_('ETHAKU_TH_OSOITE')}</th>
              <th>{$_('ETHAKU_TH_KAYTTOTARKOITUS')}</th>
              <th>{$_('ETHAKU_TH_VOIMASSA')}</th>
            </tr>
          </thead>
          <tbody>
            {#each eTodistukset as todistus}
              <tr>
                <td data-title={$_('ETHAKU_TH_TUNNUS')}>{todistus.tunnus}</td>
                <td data-title={$_('ETHAKU_TH_ETLUOKKA')}>{todistus.luokka}</td>
                <td data-title={$_('ETHAKU_TH_OSOITE')}>{todistus.osoite}</td>
                <td data-title={$_('ETHAKU_TH_KAYTTOTARKOITUS')}>
                  {todistus.tarkoitus}
                </td>
                <td data-title={$_('ETHAKU_TH_VOIMASSA')}>
                  {todistus.voimassa}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/if}
  <slot name="pagination" currentPageItemCount={eTodistukset.length} />
</div>
