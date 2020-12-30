<script>
    import Container, { styles as containerStyles } from '@Component/container';
    import { _, locale } from '@Localization/localization';
    import Seo from '@Component/seo';
    import ButtonLink, { styles as buttonStyles } from '@Component/buttonlink';

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
        {#if $locale == 'sv'}
            <h1 class="mb-4">Information om webbplatsen</h1>

            <ButtonLink {...buttonStyles.green} href={PdfSv} target="_blank">
                <span class="material-icons">picture_as_pdf</span>
                <span>Tillgänglighetsförklaring</span>
            </ButtonLink>
        {:else}
            <h1 class="mb-4">{$_('SAAVUTETTAVUUSSELOSTE_TIETOA')}</h1>

            <ButtonLink {...buttonStyles.green} href={PdfFi} target="_blank">
                <span class="material-icons">picture_as_pdf</span>
                <span>{$_('SAAVUTETTAVUUSSELOSTE_LINK_LABEL')}</span>
            </ButtonLink>
            {/if}
        </div>
    </div>
</Container>