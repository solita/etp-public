<script>
  import { onMount } from 'svelte';
  import Container, { styles as containerStyles } from '@Component/container';
  import { _, locale } from '@Localization/localization';
  import Seo from '@Component/seo';

  let component;

  onMount(() => {
    component?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
</script>

<style>
  ul {
    list-style: disc;
    @apply my-4;
  }
  li {
    @apply ml-6;
  }
</style>

<Seo
  title="{$_('ENERGIATODISTUSREKISTERI')} - {$_('SAAVUTETTAVUUSSELOSTE')}"
  descriptionFi={$locale == 'fi' ? $_('SAAVUTETTAVUUSSELOSTE') : undefined}
  descriptionSv={$locale == 'sv' ? $_('SAAVUTETTAVUUSSELOSTE') : undefined} />

<Container {...containerStyles.white}>
  <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto" bind:this={component}>
    <div>
      <h1 class="mb-4">{$_('TIETOA')}</h1>
      <ul>
        <li>
          <a href="/saavutettavuusseloste" class="text-darkgreen">
            {$_('SAAVUTETTAVUUSSELOSTE')}
          </a>
        </li>
        <li>
          <a href="/aineistopalvelu-liittyminen" class="text-darkgreen"
            >{$_('AINEISTOPALVELU_LIITTYMINEN')}</a>
        </li>
      </ul>
    </div>
  </div>
</Container>
