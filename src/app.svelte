<script>
  import Header from '@Component/header';
  import Localization, { _ } from '@Localization/localization';
  import Router from '@Router/router';

  import Container, { styles as containerStyles } from '@Component/container';
  import Disclaimer from '@Component/disclaimer';
  import Footer from '@Component/footer';

  const configPromise = fetch('config.json').then(response => response.json());
</script>

<style>
  :global(h1) {
    @apply text-ashblue uppercase font-bold;
  }

  :global(h2) {
    @apply uppercase tracking-widest font-bold;
  }
</style>

<Localization>
  <div class="applicationcontainer flex flex-col font-body font-medium w-full">
    {#await configPromise then config}
      {#if config.showTestEnvNotification}
        <Container {...containerStyles.red}>
          <Disclaimer>{$_('DISCLAIMER_WIP')}</Disclaimer>
        </Container>
      {/if}
    {/await}

    <Header />

    <main class="flex-grow">
      <Router />
    </main>

    <Footer />
    <!-- {#await configPromise then config}
      {#if config.showTestEnvNotification}
        <div class="sticky bottom-0">
          <Container {...containerStyles.red}>
            <Disclaimer />
          </Container>
        </div>
      {/if}
    {/await} -->
  </div>
</Localization>
