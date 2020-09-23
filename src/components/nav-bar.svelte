<script>
  import IconHome from '@Asset/icons/home.svg';
  import IconSearchFile from '@Asset/icons/search_file-light.svg';
  import IconSearchPerson from '@Asset/icons/search_person-light.svg';
  import IconLogin from '@Asset/icons/login-light.svg';
  import IconNext from '@Asset/icons/back-light.svg';

  import NavButton, { styles as navbuttonStyles } from '@Component/nav-button';
</script>

<style>
  .mainnavigation {
    background: rgb(197, 225, 145);
    background: linear-gradient(
      90deg,
      rgba(197, 225, 145, 1) 50%,
      rgba(46, 80, 83, 1) 50%
    );
  }
</style>

<nav class="mainnavigation flex px-16">
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
  </NavButton>
</nav>
