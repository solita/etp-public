<script>
  import Container, { styles as containerStyles } from '@Component/container';
  import InfoBlock from '@Component/info-block';
  import { _ } from '@Localization/localization';
</script>

<style>
  ol {
    list-style: decimal;
  }
  h2 {
    @apply mb-2;
  }
</style>

<Container {...containerStyles.beige}>
  <InfoBlock title={$_('REOHJ_INFO_TITLE')}>{$_('REOHJ_INFO_TEXT')}</InfoBlock>
</Container>

<Container {...containerStyles.white}>
  <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto">
    <div class="border-b border-grey pb-8 mb-8">
      <h2>{$_('REOHJ_KUINKA_LISATAAN')}</h2>
      <p>{$_('REOHJ_PATEVYYSKOKEEN_SUORITTANEET')}</p>
    </div>
    <div class="border-b border-grey pb-8 mb-8">
      <h2>{$_('REOHJ_KUINKA_KAYTTAMAAN')}</h2>
      <strong>{$_('REOHJ_TEHNYT_KOKEEN_JALKEEN')}</strong>
      <ol class="ml-6">
        <li>{$_('REOHJ_JALKEEN_1')}</li>
        <li>{$_('REOHJ_JALKEEN_2')}</li>
      </ol>

      <p class="my-4">{$_('REOHJ_KIRJAUTUMINEN_EI_ONNISTU')}</p>

      <strong>{$_('REOHJ_TEHNYT_KOKEEN_ENNEN')}</strong>
      <br />
      <p>{$_('REOHJ_ENNEN')}</p>
    </div>
    <div class="mb-8">
      <h2>{$_('REOHJ_TARVITSET')}</h2>
      <p>{$_('REOHJ_HANKI')}</p>
      <div class="my-4">
        <div class="flex flex-col md:flex-row md:space-x-1">
          <span>{$_('REOHJ_POLIISILTA')}</span>
          <a
            class="text-darkgreen"
            href="https://poliisi.fi/etusivu">{$_('REOHJ_SIIRRY_POLIISIN')}</a>
        </div>
        <div class="flex flex-col md:flex-row md:space-x-1">
          <span>{$_('REOHJ_LISATIETOJA')}</span>
          <a
            class="text-darkgreen"
            href="https://dvv.fi/varmenteet">{$_('REOHJ_SIIRRY_DVV')}</a>
        </div>
      </div>
      <div>
        <p>{$_('REOHJ_KORTINLUKULAITTEEN')}</p>
        <a
          class="text-darkgreen"
          href="https://dvv.fi/kortinlukijaohjelmisto">{$_('REOHJ_SIIRRY_OHJELMISTON')}</a>
      </div>
    </div>
  </div>
</Container>
