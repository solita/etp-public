<script>
  import Header from '@Component/header';
  import { _ } from '@Localization/localization';
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

<div class="applicationcontainer font-body font-medium w-full">
  <Container {...containerStyles.red}>
    <Disclaimer>
      Energiatodistuspavelua uudistetaan. Tämä on uuden palvelun kehitysversio.
    </Disclaimer>
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
