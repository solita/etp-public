<script>
    import Container, { styles as containerStyles } from '@Component/container';
    import { _, locale } from '@Localization/localization';
    import Seo from '@Component/seo';

    import PdfFi from '@Asset/Saavutettavuus.pdf';
    import PdfSv from '@Asset/Saavutettavuus.pdf';
</script>


<Seo
  title="{$_('ENERGIATODISTUSREKISTERI')} - {$_('SAAVUTETTAVUUSSELOSTE')}"
  descriptionFi={$locale == 'fi' ? $_('SAAVUTETTAVUUSSELOSTE') : undefined}
  descriptionSv={$locale == 'sv' ? $_('SAAVUTETTAVUUSSELOSTE') : undefined}
/>

<Container {...containerStyles.white}>

    <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto">
        <div>
            <h1 class="mb-4">{$_('SAAVUTETTAVUUSSELOSTE_TIETOA')}</h1>
        {#if $locale == 'sv'}
            <a href={PdfSv} target="_blank" class="text-darkgreen">
                {$_('SAAVUTETTAVUUSSELOSTE_LINK_LABEL')}
            </a>
        {:else}
            <a href={PdfFi} target="_blank" class="text-darkgreen">
                {$_('SAAVUTETTAVUUSSELOSTE_LINK_LABEL')}
            </a>
            {/if}
        </div>
    </div>
</Container>