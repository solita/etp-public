<script>
  import IconHome from '@Asset/icons/home.svg';
  import IconSearchFile from '@Asset/icons/search_file.svg';
  import IconSearchPerson from '@Asset/icons/search_person.svg';
  import IconLogin from '@Asset/icons/login.svg';
  import IconNext from '@Asset/icons/back.svg';

  import NavButton from '@Component/nav-button';
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

  .title {
    font-size: 1.2vw;
  }
  .subtitle {
    font-size: 1.1vw;
  }
</style>

<nav class="mainnavigation flex">
  <NavButton
    link="/"
    title="Etusivu"
    subtitle="Tervetuloa energiatodistusrekisteriin"
    colorText="text-black"
    colorBackground="bg-lightgreen"
    iconLeft={IconHome}>
    <span class="title uppercase">Etusivu</span>
    <span class="subtitle italic font-light">Tervetuloa
      energiatodistusrekisteriin</span>
  </NavButton>
  <NavButton
    link="/ethaku"
    colorText="text-white"
    colorBackground="bg-green"
    iconLeft={IconSearchFile}>
    <span class="title uppercase">Energiatodistushaku</span>
    <span class="subtitle italic font-light">Täältä löydät tarvitsemasi
      energiatodistukset</span>
  </NavButton>
  <NavButton
    link="/laatijahaku"
    colorText="text-white"
    colorBackground="bg-darkgreen"
    iconLeft={IconSearchPerson}>
    <span class="title uppercase">Todistustenlaatijahaku</span>
    <span class="subtitle italic font-light">Täältä löydät energiatodistusten
      pätevät laatijat</span>
  </NavButton>
  <NavButton
    link="/laatijankirjautuminen"
    colorText="text-white"
    colorBackground="bg-ashblue"
    iconLeft={IconLogin}
    iconRight={IconNext}>
    <span class="title uppercase">Laatijan kirjautuminen</span>
    <span class="subtitle italic font-light">Energiatodistusten laatijoille</span>
  </NavButton>
</nav>
