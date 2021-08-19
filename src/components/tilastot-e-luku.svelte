<script>
  import { _ } from '@Localization/localization';
  import InfoTooltip, { AnchorPosition } from '@Component/info-tooltip';

  export let data;
  export let tooltip = '';
  export let tooltipAnchorPosition = AnchorPosition.bottomLeft;
</script>

<div class="w-full flex flex-col">
  <div class="my-4">
    <InfoTooltip
      anchor={tooltipAnchorPosition}
      title={$_('TILASTOT_E_LUKU')}
      {tooltip}>
      <h2>{$_('TILASTOT_E_LUKU')}</h2>
    </InfoTooltip>
  </div>

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
