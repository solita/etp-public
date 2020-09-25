<script>
  import Logo from '@Asset/logo.svg';
  import NavBar from '@Component/nav-bar';
</script>

<header class="flex flex-col">
  <div class="flex justify-between items-center px-3 py-2">
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
  <NavBar />
</header>
