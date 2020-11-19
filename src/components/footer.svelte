<script>
  import Button, { styles as buttonStyles } from '@Component/button';
  import ButtonLink, {
    styles as buttonLinkStyles
  } from '@Component/buttonlink';
  import Container, { styles as containerStyles } from '@Component/container';
  import IconLogin from '@Asset/icons/login-light.svg';
  import IconChat from '@Asset/icons/chat.svg';
  import ImgLogo from '@Asset/ara_logo.svg';

  import { _ } from '@Localization/localization';
</script>

<Container {...containerStyles.grey}>
  <footer class="flex flex-col bg-grey px-2 sm:px-16 py-4 sm:py-16">
    <article class="flex flex-col md:flex-row md:my-0 md:space-x-4">
      <section class="md:w-1/3 py-4 md:py-0">
        <h2 class="mb-4">{$_('FOOTER_LAKI')}</h2>
        <p>{$_('FOOTER_ARA_VIRANOMAINEN')}</p>
        <a
          href="https://www.ara.fi"
          class="underline text-green">{$_('FOOTER_ARA_LINKKI')}</a>
      </section>
      <section class="md:w-1/3 flex flex-col justify-between py-4 md:py-0">
        <h2 class="mb-4">{$_('FOOTER_YHTEYSTIEDOT')}</h2>
        <address class="not-italic">
          <span>{$_('EMAIL')}:</span>
          <a
            href="mailto:energiatodistus@ara.fi"
            class="underline text-green">energiatodistus@ara.fi</a>
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
          <a href="tel:0295250800" class="underline text-green">029 525 0800</a>
        </address>
        <a href="/saavutettavuusseloste" class="block underline text-green">
          {$_('TIETOA_SIVUSTOSTA')}
        </a>
      </section>
      <div class="md:w-1/3 flex flex-col py-4 md:py-0">
        <section>
          <h2 class="mb-4">{$_('LAATIJOIDEN_PALVELU')}</h2>
          <ButtonLink
            href={`https://private.${window.location.host}`}
            {...buttonLinkStyles.ashblue}>
            <img src={IconLogin} alt="Login icon" class="h-6" />
            <span>{$_('KIRJAUDU')}</span>
          </ButtonLink>
        </section>
        <section class="py-4">
          <h2 class="mb-4">{$_('FOOTER_PALAUTE')}</h2>
          <ButtonLink
            href={'https://www.ara.fi/fi-FI/ARA/Yhteystiedot/Anna_palautetta(1280)?r=10559'}
            {...buttonStyles.green}>
            <img src={IconChat} alt="Palaute icon" class="h-6" />
            <span>{$_('FOOTER_LAHETA_PALAUTETTA')}</span>
          </ButtonLink>
        </section>
      </div>
    </article>

    <div class="my-8 border-t-2 border-gray-400 pt-3">
      <img
        src={ImgLogo}
        alt="ARA - asumisen rakennus- ja kehityskeskus"
        class="h-10 w-auto" />
    </div>
  </footer>
</Container>
