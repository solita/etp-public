<script>
  import { _ } from '@Localization/localization';

  export let data;
</script>

<div class="w-full flex flex-col">
  <h2 class="my-4 text-green">{$_('TILASTOT_E_LUKU')}</h2>

  <div class="w-full flex justify-between">
    <span>{$_('TILASTOT_KESKIARVO')}</span>
    <span>{data?.avg.toFixed(0) || 0}{$_('TILASTOT_E_LUKU_UNIT')}</span>
  </div>
  {#if data?.['percentile-15']}
    <div class="w-full flex justify-between">
      <span>{$_('TILASTOT_PARAS_15')}</span>
      <span>
        {$_('TILASTOT_ALLE')}
        {data?.['percentile-15'].toFixed(0) || 0}{$_('TILASTOT_E_LUKU_UNIT')}</span>
    </div>
  {/if}
  {#if data?.['percentile-85']}
    <div class="w-full flex justify-between">
      <span>{$_('TILASTOT_HEIKOIN_15')}</span>
      <span>
        {$_('TILASTOT_YLI')}
        {data?.['percentile-85'].toFixed(0) || 0}{$_('TILASTOT_E_LUKU_UNIT')}</span>
    </div>
  {/if}
</div>
