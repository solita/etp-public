<script>
  import EtHakuImage from '@Asset/ethaku.jpg';
  import LaatijaHakuImage from '@Asset/laatijahaku.jpg';
  import Logo from '@Asset/logo.svg';

  import BorderImage from '@Component/border-image/border-image';
  import Header from '@Component/header/header';
</script>

<style>
  * {
    @apply font-body;
  }

  main,
  footer,
  .hero {
    @apply max-w-screen-xl m-auto;
  }

  h2 {
    @apply uppercase;
  }

  .hero {
    height: 555px;
    background-image: url('@Asset/hero.jpg?{fit:"inside",height:1000,width:2000}');
    background-position: right -175px bottom -200px;
  }
</style>

<Header />

<div class="hero px-16 flex items-center bg-beige" role="presentation">
  <section class="w-1/3 bg-white text-ashblue font-bold">
    <div class="flex items-center">
      <img src={Logo} alt="Energiatodistusrekisterin logo" />
      <h2 class="pl-2 font-extrabold">Energiatodistusrekisteri</h2>
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel ex
      vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis. Aenean
      sit amet mollis urna. Nam posuere sed lorem in aliquet.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel ex
      vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis. Aenean
      sit amet mollis urna. Nam posuere sed lorem in aliquet.
    </p>
  </section>
</div>
<main>
  <article class="flex px-16 bg-beige">
    <section class="relative mr-16">
      <BorderImage src={EtHakuImage} />
      <h2 class="mb-4">Hae rakennuksen energiatodistus</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="relative mr-16">
      <BorderImage src={LaatijaHakuImage} />
      <h2 class="mb-4">Tarvitsetko energiatodistuksen? Löydä laatija!</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
  </article>
  <section class="flex justify-center p-16 bg-ashblue">
    <div class="text-white flex flex-col w-7/12">
      <h2 class="mb-4">
        Energiatodistus auttaa vertailemaan rakennusten energiankulutusta
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </div>
  </section>
  <article class="flex bg-white">
    <section class="mr-8 bg-beige pl-16 w-1/3">
      <h2 class="mb-4">Käytä vain virallista energiatodistusta</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="w-2/3">
      <h2>Lisätietoa energiatodistuksista</h2>
      <section class="mr-8">
        <h2 class="mb-4">Motiva Oy:n energiatodistuspavelu</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi
          vel ex vulputate porttitor. Ut rutrum sapien ut lacus blandit
          lobortis. Aenean sit amet mollis urna. Nam posuere sed lorem in
          aliquet.
        </p>
      </section>
      <section class="mr-8 pr-16">
        <h2 class="mb-4">Tilastot rakennusten energiatodistuksista</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi
          vel ex vulputate porttitor. Ut rutrum sapien ut lacus blandit
          lobortis. Aenean sit amet mollis urna. Nam posuere sed lorem in
          aliquet.
        </p>
      </section>
    </section>
  </article>
</main>

<footer class="flex flex-col bg-grey pt-16 px-16">
  <article class="flex">
    <section class="mr-8">
      <h2 class="mb-4">
        Energiatodistukset sekä niiden käyttö perustuu lakiin ja sitä valvotaan
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="mr-8">
      <h2 class="mb-4">Ota yhteyttä</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="mr-8">
      <h2 class="mb-4">Laatijoiden pavelu</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
  </article>

  <div class="my-8 border-t-2 border-gray-400">
    <img
      src="images/ara-logo.png"
      alt="ARA - asumisen rakennus- ja kehityskeskus" />
  </div>
</footer>
