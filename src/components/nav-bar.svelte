<script>
  import IconHome from '@Asset/icons/home.svg';
  import IconSearchFile from '@Asset/icons/search_file-light.svg';
  import IconSearchPerson from '@Asset/icons/search_person-light.svg';
  import IconLogin from '@Asset/icons/login-light.svg';
  import IconNext from '@Asset/icons/back-light.svg';

  import NavButton, { styles as navbuttonStyles } from '@Component/nav-button';
  import Container, { styles as containerStyles } from '@Component/container';
</script>

<Container {...containerStyles.mainnavigation}>
  <nav class="flex xl:px-16 flex-col lg:flex-row">
    <NavButton link="/" {...navbuttonStyles.lightgreen} iconLeft={IconHome}>
      <span slot="title" class="uppercase">Etusivu</span>
      <span slot="subtitle" class="italic font-light">
        Tervetuloa energiatodistusrekisteriin
      </span>
    </NavButton>
    <NavButton
      link="/ethaku"
      {...navbuttonStyles.green}
      iconLeft={IconSearchFile}>
      <span slot="title" class="uppercase">Energiatodistushaku</span>
      <span slot="subtitle" class="italic font-light">
        Täältä löydät tarvitsemasi energiatodistukset
      </span>
    </NavButton>
    <NavButton
      link="/laatijahaku"
      {...navbuttonStyles.darkgreen}
      iconLeft={IconSearchPerson}>
      <span slot="title" class="uppercase">Todistustenlaatijahaku</span>
      <span slot="subtitle" class="italic font-light">
        Täältä löydät energiatodistusten pätevät laatijat
      </span>
    </NavButton>
    <NavButton
      link="/laatijankirjautuminen"
      {...navbuttonStyles.ashblue}
      iconLeft={IconLogin}
      iconRight={IconNext}>
      <span slot="title" class="uppercase">Laatijan kirjautuminen</span>
      <span slot="subtitle" class="italic font-light">
        Energiatodistusten laatijoille
      </span>
      <span slot="iconright" class="font-icon lg:text-6xl text-4xl">
        chevron_right
      </span>
    </NavButton>
  </nav>
</Container>
