<script>
  import { _ } from '@Localization/localization';
  import StatELuku from '@Component/tilastot-e-luku';
  import StatNoData from '@Component/tilastot-no-data';
  import StatChart from '@Component/tilastot-chart';
  import InfoTooltip, { AnchorPosition } from '@Component/info-tooltip';

  export let version;
  export let count;
  export let eLukuData;
  export let chartData;
  export let tooltipAnchorPosition = AnchorPosition.bottomLeft;

  $: title = `${
    version === '2018' ? $_('TILASTOT_ET_2018') : $_('TILASTOT_ET_2013')
  } (${count || '< 5'} ${$_('TILASTOT_KPL')})`;
  $: noDataLabel =
    version === '2018' ? $_('TILASTOT_NO_2018') : $_('TILASTOT_NO_2013');
</script>

<div class="w-full flex flex-col space-y-2">
  <h1 class="w-full">{title}</h1>
  {#if count > 0}
    <div class="w-full flex flex-col">
      <div class="my-4">
        <InfoTooltip
          anchor={tooltipAnchorPosition}
          title={$_('TILASTOT_ET_LUOKKA')}
          tooltip={$_(`TILASTOT_ET_LUOKKA_${version}_TOOLTIP`)}>
          <h2>{$_('TILASTOT_ET_LUOKKA')}</h2>
        </InfoTooltip>
      </div>
      <StatChart data={chartData} />
    </div>
    <StatELuku
      data={eLukuData}
      tooltip={version === '2018' ? $_('TILASTOT_E_LUKU_2018_TOOLTIP') : ''} />
  {:else}
    <StatNoData label={noDataLabel} />
  {/if}
</div>
