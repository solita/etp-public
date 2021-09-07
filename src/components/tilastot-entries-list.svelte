<script>
  import { _, locale } from '@Localization/localization';
  import InfoTooltip, { AnchorPosition } from '@Component/info-tooltip';

  export let title = '';
  export let tooltip = '';
  export let tooltipAnchor = AnchorPosition.bottomLeft;
  export let labels;
  export let items;
  export let total;

  $: selectByLocaleOrAvailable = (prefix, property) => {
    if ($locale === 'sv' && property?.[prefix + '-sv'])
      return property[prefix + '-sv'];
    else if (
      $locale === 'fi' &&
      !property?.[prefix + '-fi'] &&
      property?.[prefix + '-sv']
    )
      return property[prefix + '-sv'];
    else if (property?.[prefix + '-fi']) return property[prefix + '-fi'];
    else return '';
  };
</script>

<div class="w-full flex flex-col space-y-2">
  {#if items}
    <div class="w-full flex flex-col">
      <div class="my-4">
        <InfoTooltip anchor={tooltipAnchor} {title} {tooltip}>
          <h2>{title}</h2>
        </InfoTooltip>
      </div>
      <div class="w-full flex flex-col">
        {#each Object.entries(items) as obj}
          <div class="w-full flex justify-between">
            <span>{selectByLocaleOrAvailable( 'label', labels.find(lm => lm.id === parseInt(obj[0], 10)) )}</span>
            <span>{((parseInt(obj[1]) / total) * 100).toFixed(0)}{'%'}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
