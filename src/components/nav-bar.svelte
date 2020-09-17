<script>
  import IconHome from '@Asset/icons/home.svg';
  import IconSearchFile from '@Asset/icons/search_file.svg';
  import IconSearchPerson from '@Asset/icons/search_person.svg';
  import IconLogin from '@Asset/icons/login.svg';
  import IconNext from '@Asset/icons/back.svg';

  import NavButton from '@Component/nav-button';
  import { activePath } from '@Component/router/router';
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

<nav class="mainnavigation flex">
  <NavButton
    link="/"
    title="Etusivu"
    subtitle="Tervetuloa energiatodistusrekisteriin"
    colorText="text-black"
    colorBackground="bg-lightgreen"
    iconLeft={IconHome} />
  <NavButton
    link="/ethaku"
    title="Energiatodistushaku"
    subtitle="Täältä löydät tarvitsemasi energiatodistukset"
    colorText="text-white"
    colorBackground="bg-green"
    iconLeft={IconSearchFile} />
  <NavButton
    link="/laatijahaku"
    title="Todistustenlaatijahaku"
    subtitle="Täältä löydät energiatodistusten pätevät laatijat"
    colorText="text-white"
    colorBackground="bg-darkgreen"
    iconLeft={IconSearchPerson} />
  <NavButton
    link="/laatijankirjautuminen"
    title="Laatijan kirjautuminen"
    subtitle="Energiatodistusten laatijoille"
    colorText="text-white"
    colorBackground="bg-ashblue"
    iconLeft={IconLogin}
    iconRight={IconNext} />
</nav>
