<script>
  import Logo from '@Asset/logo.svg';
  import NavBar from '@Component/nav-bar';
  import Container, { styles as containerStyles } from '@Component/container';
</script>

<header>
  <Container {...containerStyles.white}>
    <div class="flex justify-between items-center xl:px-16 py-2">
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
  </Container>
  <NavBar />
</header>
