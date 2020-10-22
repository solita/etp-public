<script>
  import Header from '@Component/header';
  import Localization, { _ } from '@Localization/localization';
  import Router from '@Router/router';

  import Container, { styles as containerStyles } from '@Component/container';
  import Disclaimer from '@Component/disclaimer';
  import Footer from '@Component/footer';
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
  <div class="applicationcontainer font-body font-medium w-full">
    <Container {...containerStyles.red}>
      <Disclaimer>{$_('DISCLAIMER_WIP')}</Disclaimer>
    </Container>

    <Header />

    <main>
      <Router />
    </main>

    <Footer />

    <div class="sticky bottom-0">
      <Container {...containerStyles.red}>
        <Disclaimer />
      </Container>
    </div>
  </div>
</Localization>
