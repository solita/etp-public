<script>
  import IconHome from '@Asset/icons/home.svg';
  import IconSearchFile from '@Asset/icons/search_file-light.svg';
  import IconSearchPerson from '@Asset/icons/search_person-light.svg';
  import IconLogin from '@Asset/icons/login-light.svg';

  import NavButton, { styles as navbuttonStyles } from '@Component/nav-button';
  import Container, { styles as containerStyles } from '@Component/container';
  import { _ } from '@Localization/localization';

  const configPromise = fetch('config.json').then(response => response.json());
  export let navButtonClicked = () => {};
</script>

<style>
  img {
    width: 2.5em;
    height: 2.5em;
  }
</style>

<Container {...containerStyles.mainnavigation}>
  <nav class="flex xl:px-16 flex-col lg:flex-row">
    <NavButton
      link="/"
      {...navbuttonStyles.lightgreen}
      click={navButtonClicked}>
      <img slot="iconleft" src={IconHome} alt={$_('NAVBAR_ICON_ALT_ETUSIVU')} />
      <span slot="title" class="uppercase">{$_('NAVBAR_ETUSIVU')}</span>
      <span slot="subtitle" class="font-light text-sm">
        {$_('NAVBAR_ETUSIVU_KUVAUS')}
      </span>
    </NavButton>
    <NavButton
      link="/ethaku"
      {...navbuttonStyles.green}
      click={navButtonClicked}>
      <img
        slot="iconleft"
        src={IconSearchFile}
        alt={$_('NAVBAR_ICON_ALT_ETHAKU')} />
      <span slot="title" class="uppercase">
        {$_('NAVBAR_ENERGIATODISTUSHAKU')}
      </span>
      <span slot="subtitle" class="font-light text-sm">
        {$_('NAVBAR_ENERGIATODISTUSHAKU_KUVAUS')}
      </span>
    </NavButton>
    <NavButton
      link="/laatijahaku"
      {...navbuttonStyles.darkgreen}
      click={navButtonClicked}>
      <img
        slot="iconleft"
        src={IconSearchPerson}
        alt={$_('NAVBAR_ICON_ALT_LAATIJAHAKU')} />
      <span slot="title" class="uppercase">{$_('NAVBAR_LAATIJAHAKU')}</span>
      <span slot="subtitle" class="font-light text-sm">
        {$_('NAVBAR_LAATIJAHAKU_KUVAUS')}
      </span>
    </NavButton>
    {#await configPromise then config}
      <NavButton
        link={config.privateSiteUrl}
        {...navbuttonStyles.ashblue}
        click={navButtonClicked}>
        <img
          slot="iconleft"
          src={IconLogin}
          alt={$_('NAVBAR_ICON_ALT_KIRJAUTUMINEN')} />
        <span slot="title" class="uppercase">{$_('NAVBAR_KIRJAUTUMINEN')}</span>
        <span slot="subtitle" class="font-light text-sm">
          {$_('NAVBAR_KIRJAUTUMINEN_KUVAUS')}
        </span>
        <span slot="iconright" class="font-icon lg:text-6xl text-3xl">
          chevron_right
        </span>
      </NavButton>
    {/await}
  </nav>
</Container>
