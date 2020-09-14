<script>
  import Logo from '@Asset/logo.svg';
</script>

<style>
  header {
    /* @apply max-w-full m-auto; */
    @apply max-w-screen-xl m-auto;
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
    width: 25px;
    height: 33px;
    border: 1px solid white;
    @apply flex-none mx-auto mx-1;
  }
</style>

<header class="flex flex-col">
    <div class="flex justify-between px-16 py-2">
      <div class="flex items-center">
        <img src={Logo} alt="Energiatodistusrekisterin logo" />
        <h1 class="pl-2">Energiatodistusrekisteri</h1>
      </div>
      <nav><span>suomeksi</span> / <span>på svenska</span></nav>
    </div>
  <nav class="px-16 mainnavigation flex">
    <a class="navcontainer bg-lime text-black" href="/">
      <div class="icon">X</div>
      <div class="flex flex-col flex-grow self-start px-1">
        <span class="uppercase">Etusivu</span>
        <span class="text-sm italic font-light">Tervetuloa
          energiatodistusrekisteriin</span>
      </div>
    </a>
    <a class="navcontainer bg-green text-white" href="/">
      <div class="icon">X</div>
      <div class="flex flex-col flex-grow self-start px-1">
        <span class="uppercase">Energiatodistushaku</span>
        <span class="text-sm italic font-light">Täältä löydät tarvitsemasi
          energiatodistukset</span>
      </div>
    </a>
    <a class="navcontainer bg-darkgreen text-white" href="/">
      <div class="icon">X</div>
      <div class="flex flex-col flex-grow self-start px-1">
        <span class="uppercase">Todistustenlaatijahaku</span>
        <span class="text-sm italic font-light">Täältä löydät energiatodistusten
          pätevät laatijat</span>
      </div>
    </a>
    <a class="navcontainer bg-ashblue text-white" href="/">
      <div class="icon">X</div>
      <div class="flex flex-col flex-grow self-start px-1">
        <span class="uppercase">Laatijan kirjautuminen</span>
        <span class="text-sm italic font-light">Energiatodistusten laatijoille.</span>
      </div>
      <div class="icon">{'>'}</div>
    </a>
  </nav>
</header>
