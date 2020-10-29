<script>
  import IconHome from '@Asset/icons/home.svg';
  import IconSearchFile from '@Asset/icons/search_file-light.svg';
  import IconSearchPerson from '@Asset/icons/search_person-light.svg';
  import IconLogin from '@Asset/icons/login-light.svg';
  import IconNext from '@Asset/icons/back-light.svg';

  import NavButton, { styles as navbuttonStyles } from '@Component/nav-button';
  import Container, { styles as containerStyles } from '@Component/container';
  import { _ } from '@Localization/localization';
</script>

<Container {...containerStyles.mainnavigation}>
  <nav class="flex xl:px-16 flex-col lg:flex-row">
    <NavButton link="/" {...navbuttonStyles.lightgreen} iconLeft={IconHome}>
      <span slot="title" class="uppercase">{$_('NAVBAR_ETUSIVU')}</span>
      <span slot="subtitle" class="italic font-light text-sm">
        {$_('NAVBAR_ETUSIVU_KUVAUS')}
      </span>
    </NavButton>
    <NavButton
      link="/ethaku"
      {...navbuttonStyles.green}
      iconLeft={IconSearchFile}>
      <span slot="title" class="uppercase">
        {$_('NAVBAR_ENERGIATODISTUSHAKU')}
      </span>
      <span slot="subtitle" class="italic font-light text-sm">
        {$_('NAVBAR_ENERGIATODISTUSHAKU_KUVAUS')}
      </span>
    </NavButton>
    <NavButton
      link="/laatijahaku"
      {...navbuttonStyles.darkgreen}
      iconLeft={IconSearchPerson}>
      <span slot="title" class="uppercase">{$_('NAVBAR_LAATIJAHAKU')}</span>
      <span slot="subtitle" class="italic font-light text-sm">
        {$_('NAVBAR_LAATIJAHAKU_KUVAUS')}
      </span>
    </NavButton>
    <NavButton
      link={`https://private.${window.location.host}`}
      {...navbuttonStyles.ashblue}
      iconLeft={IconLogin}
      iconRight={IconNext}>
      <span slot="title" class="uppercase">{$_('NAVBAR_KIRJAUTUMINEN')}</span>
      <span slot="subtitle" class="italic font-light text-sm">
        {$_('NAVBAR_KIRJAUTUMINEN_KUVAUS')}
      </span>
      <span slot="iconright" class="font-icon lg:text-6xl text-3xl">
        chevron_right
      </span>
    </NavButton>
  </nav>
</Container>
