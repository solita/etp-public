<script>
  import { _, locale } from '@Localization/localization';
  import InfoTooltip, { AnchorPosition } from '@Component/info-tooltip';
  import * as Parsers from '@/utilities/parsers';
  import * as Formats from '@/utilities/formats';

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
        {#each labels as label}
          <div class="w-full flex justify-between">
            <span>{selectByLocaleOrAvailable('label', label)}</span>
            {#if items[label.id]}
              <span class="whitespace-no-wrap">
                {Formats.formatPercent(Parsers.parsePercent(total, items[label.id]))}
              </span>
            {:else}
              <span class="whitespace-no-wrap">
                {Formats.formatPercent(0)}
              </span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
