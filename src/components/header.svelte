<script>
  import Logo from '@Asset/logo.svg';
  import NavBar from '@Component/nav-bar';
  import Container, { styles as containerStyles } from '@Component/container';
  import { setLocale, _ } from '@Localization/localization';
</script>

<header>
  <Container {...containerStyles.white}>
    <div
      class="flex justify-between items-center flex-col md:flex-row px-2
      xl:px-16 py-2">
      <div class="flex items-center">
        <img src={Logo} alt="" />
        <h1 class="pl-2">{$_('ENERGIATODISTUSREKISTERI')}</h1>
      </div>
      <nav class="font-semibold text-ashblue">
        <span class="cursor-pointer" on:click={() => setLocale('fi')}>
          suomeksi
        </span>
        |
        <span class="cursor-pointer" on:click={() => setLocale('sv')}>
          på svenska
        </span>
      </nav>
    </div>
  </Container>
  <NavBar />
</header>
