<script>
  import Button, { styles as buttonStyles } from '@Component/button';
  import Container, { styles as containerStyles } from '@Component/container';

  import { _ } from '@Localization/localization';
</script>

<Container {...containerStyles.grey}>
  <footer class="flex flex-col bg-grey px-2 sm:px-16 py-4 sm:py-16">
    <article class="flex flex-col md:flex-row md:my-0 md:space-x-4">
      <section class="md:w-1/3 py-4 md:py-0">
        <h2 class="mb-4">{$_('FOOTER_LAKI')}</h2>
        <p>{$_('FOOTER_ARA_VIRANOMAINEN')}</p>
        <a href="/" class="underline text-green">{$_('FOOTER_ARA_LINKKI')}</a>
      </section>
      <section class="md:w-1/3 flex flex-col justify-between py-4 md:py-0">
        <h2 class="mb-4">{$_('FOOTER_YHTEYSTIEDOT')}</h2>
        <address class="not-italic">
          <span>{$_('EMAIL')}:</span>
          <a href="/" class="underline text-green">energiatodistus@ara.fi</a>
        </address>
        <address class="not-italic">
          <ol>
            <li>Asumisen rahoitus- ja kehittämiskeskus</li>
            <li>PL 30</li>
            <li>15141</li>
            <li>LAHTI</li>
          </ol>
        </address>
        <address class="not-italic">
          <span>{$_('PUHELINVAIHDE')}:</span>
          <a href="/" class="underline text-green">029 525 0800</a>
        </address>
        <a href="/" class="block underline text-green">
          {$_('TIETOA_SIVUSTOSTA')}
        </a>
      </section>
      <div class="md:w-1/3 flex flex-col py-4 md:py-0">
        <section>
          <h2 class="mb-4">{$_('LAATIJOIDEN_PALVELU')}</h2>
          <Button {...buttonStyles.ashblue}>{$_('KIRJAUDU')}</Button>
        </section>
        <section class="py-4">
          <h2 class="mb-4">{$_('FOOTER_PALAUTE')}</h2>
          <Button {...buttonStyles.green}>
            {$_('FOOTER_LAHETA_PALAUTETTA')}
          </Button>
        </section>
      </div>
    </article>

    <div class="my-8 border-t-2 border-gray-400">
      <img
        src="images/ara-logo.png"
        alt="ARA - asumisen rakennus- ja kehityskeskus" />
    </div>
  </footer>
</Container>
