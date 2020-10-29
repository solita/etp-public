<script>
  import { slide, scale } from 'svelte/transition';
  import Logo from '@Asset/logo.svg';
  import NavBar from '@Component/nav-bar';
  import Container, { styles as containerStyles } from '@Component/container';
  import { setLocale, _ } from '@Localization/localization';

  let mobileNavShown = false;
</script>

<style>
  .menu-icon {
    grid-column: 1;
    grid-row: 1;
    padding-top: 0.2em;
    font-size: 2em;
    @apply border-green text-green;
  }
  button:focus span {
    @apply text-ashblue;
  }
  button:focus .menu-icon-border {
    @apply border-ashblue font-bold text-ashblue;
  }
</style>

<header>
  <Container {...containerStyles.white}>
    <div class="flex justify-between items-center px-2 py-2 xl:px-16">
      <div
        class="flex justify-between items-center flex-col lg:flex-row lg:w-full">
        <div class="flex items-center">
          <img src={Logo} alt="" />
          <h1 class="pl-2">{$_('ENERGIATODISTUSREKISTERI')}</h1>
        </div>
        <nav class="font-semibold text-ashblue hidden lg:block">
          <span class="cursor-pointer" on:click={() => setLocale('fi')}>
            suomeksi
          </span>
          |
          <span class="cursor-pointer" on:click={() => setLocale('sv')}>
            på svenska
          </span>
        </nav>
      </div>
      <button
        class="flex items-center lg:hidden focus:outline-none rounded-md text-green"
        on:click={() => {
          mobileNavShown = !mobileNavShown;
        }}>
        <span
          class="menu-label uppercase font-bold hidden sm:block mr-1">{$_('MAIN_MENU')}</span>
        <div
          class="menu-icon-border border-2 border-green rounded-full w-12 h-12 grid overflow-hidden icon-container">
          {#if mobileNavShown}
            <span
              class="material-icons menu-icon w-full h-full"
              transition:scale>
              close
            </span>
          {:else}
            <span
              class="material-icons menu-icon w-full h-full"
              transition:scale>
              menu
            </span>
          {/if}
        </div>
      </button>
    </div>
  </Container>
  {#if mobileNavShown}
    <div transition:slide class="lg:hidden">
      <NavBar />
      <nav class="font-semibold text-ashblue p-3 text-center mx-auto bg-grey">
        <span class="cursor-pointer p-2" on:click={() => setLocale('fi')}>
          suomeksi
        </span>
        |
        <span class="cursor-pointer p-2" on:click={() => setLocale('sv')}>
          på svenska
        </span>
      </nav>
    </div>
  {/if}

  <div class="hidden lg:block">
    <NavBar />
  </div>
</header>
