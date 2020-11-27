<script>
  import { _ } from '@Localization/localization';
  export let etCount;
  export let eTodistukset;

  let currentPageItemCount = eTodistukset.length;

  $: currentPageItemCount = eTodistukset.length;
</script>

<style>
  /* Table styling in main.css */
</style>

<div class="table-container">
  {#if etCount < 1}
    <span>Ei tuloksia.</span>
  {:else}
    <h2>Tuloksia {etCount}</h2>
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
              <td data-title={$_('ETHAKU_TH_TUNNUS')}><a href={'/energiatodistus?id='+todistus.id+'&versio='+todistus.versio}>{todistus.id}</a></td>
                <td data-title={$_('ETHAKU_TH_ETLUOKKA')}>
                  <strong>{todistus.tulokset['e-luokka']}</strong>
                  <span class="text-xs">{todistus.versio}</span>
                </td>
                <td data-title={$_('ETHAKU_TH_OSOITE')}>{todistus.perustiedot['katuosoite-fi']}</td>
                <td data-title={$_('ETHAKU_TH_KAYTTOTARKOITUS')}>
                  {todistus.perustiedot.kayttotarkoitus}
                </td>
                <td data-title={$_('ETHAKU_TH_VOIMASSA')}>
                  {new Date(todistus['voimassaolo-paattymisaika']).toLocaleDateString()}
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
