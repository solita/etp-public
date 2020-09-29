<script>
  import Logo from '@Asset/logo.svg';

  import Button, { styles as buttonStyles } from '@Component/button';
  import Container, { styles as containerStyles } from '@Component/container';
</script>

<style>
  .hero {
    height: 555px;
    background-image: url('@Asset/hero.jpg?{fit:"inside",height:1000,width:1440}');
    background-position: right 0 bottom -150px;
  }
</style>

<Container {...containerStyles.hero}>
  <div class="hero flex items-center bg-beige" role="presentation">
    <section class="w-1/3 bg-white text-ashblue ml-16 py-8 px-12">
      <div class="flex items-center mb-8">
        <img src={Logo} alt="Energiatodistusrekisterin logo" />
        <h2 class="pl-2 font-bold">Energiatodistusrekisteri</h2>
      </div>
      <strong class="block mb-8">
        Energiatodistusrekisteri on Asumisen rahoitus- ja kehittämiskeskuksen
        (ARA) tietopalvelu, josta voit hakea laadittuja energiatodistuksia ja
        pätevöityneitä energiatodistusten laatijoita.
      </strong>
      <Button {...buttonStyles.green}>Aloita</Button>
    </section>
  </div>
</Container>
