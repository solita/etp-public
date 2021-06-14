<script>
  import { _ } from '@Localization/localization';
  import StatELuku from '@Component/tilastot-e-luku';
  import StatNoData from '@Component/tilastot-no-data';
  import StatChart from '@Component/tilastot-chart';

  export let version;
  export let count;
  export let eLukuData;
  export let chartData;

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
      <h2 class="my-4 text-green">{$_('TILASTOT_ET_LUOKKA')}</h2>
      <StatChart data={chartData} />
    </div>
    <StatELuku data={eLukuData} />
  {:else}
    <StatNoData label={noDataLabel} />
  {/if}
</div>
