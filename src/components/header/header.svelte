<script>
  import Logo from '@Asset/logo.svg';
  import IconHome from '@Asset/icons/home.svg';
  import IconSearchFile from '@Asset/icons/search_file.svg';
  import IconSearchPerson from '@Asset/icons/search_person.svg';
  import IconLogin from '@Asset/icons/login.svg';
  import IconNext from '@Asset/icons/back.svg';
</script>

<style>
  header {
    @apply max-w-full m-auto;
  }

  .mainnavigation {
    background: rgb(197, 225, 145);
    background: linear-gradient(
      90deg,
      rgba(197, 225, 145, 1) 50%,
      rgba(46, 80, 83, 1) 50%
    );
  }

  .navcontainer {
    flex-basis: 100%;
    @apply flex flex-grow py-3 flex-row items-center px-1;
  }

  .icon {
    width: 35px;
    height: auto;
    overflow: hidden;
    @apply flex-none mx-auto mx-1;
  }
  .icon.light {
    filter: invert(1);
  }
</style>

<header class="flex flex-col">
  <div>
    <div class="flex justify-between max-w-screen-xl m-auto px-3 py-2">
      <div class="flex items-center">
        <img src={Logo} alt="Energiatodistusrekisterin logo" />
        <h1 class="pl-2">Energiatodistusrekisteri</h1>
      </div>
      <nav class="font-semibold text-ashblue">
        <span>suomeksi</span>
        |
        <span>på svenska</span>
      </nav>
    </div>
  </div>
  <div class="mainnavigation">
    <nav class="px-1 max-w-screen-xl m-auto flex">
      <a class="navcontainer bg-lime text-black" href="/">
        <img class="icon" src={IconHome} alt="Icon" />
        <div class="flex flex-col flex-grow self-start px-1">
          <span class="uppercase">Etusivu</span>
          <span class="text-sm italic font-light">
            Tervetuloa energiatodistusrekisteriin
          </span>
        </div>
      </a>
      <a class="navcontainer bg-green text-white" href="/ethaku">
        <img class="icon light" src={IconSearchFile} alt="Icon" />
        <div class="flex flex-col flex-grow self-start px-1">
          <span class="uppercase">Energiatodistushaku</span>
          <span class="text-sm italic font-light">
            Täältä löydät tarvitsemasi energiatodistukset
          </span>
        </div>
      </a>
      <a class="navcontainer bg-darkgreen text-white" href="/laatijahaku">
        <img class="icon light" src={IconSearchPerson} alt="Icon" />
        <div class="flex flex-col flex-grow self-start px-1">
          <span class="uppercase">Todistustenlaatijahaku</span>
          <span class="text-sm italic font-light">
            Täältä löydät energiatodistusten pätevät laatijat
          </span>
        </div>
      </a>
      <a
        class="navcontainer bg-ashblue text-white"
        href="/laatijankirjautuminen">
        <img class="icon light" src={IconLogin} alt="Icon" />
        <div class="flex flex-col flex-grow self-start px-1">
          <span class="uppercase">Laatijan kirjautuminen</span>
          <span class="text-sm italic font-light">
            Energiatodistusten laatijoille.
          </span>
        </div>
        <img class="icon light" src={IconNext} alt="Icon" />
      </a>
    </nav>
  </div>
</header>
