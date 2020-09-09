<script>
  import EtHakuImage from '@Asset/ethaku.jpg';
  import LaatijaHakuImage from '@Asset/laatijahaku.jpg';
  import Logo from '@Asset/logo.svg';

  import BorderImage from '@Component/border-image/border-image';
</script>

<style>
  * {
    @apply font-body;
  }

  header,
  main,
  footer,
  .hero {
    @apply max-w-screen-xl m-auto;
  }

  h1 {
    @apply text-ashblue uppercase font-extrabold;
  }

  h2 {
    @apply uppercase;
  }

  .hero {
    height: 555px;
    background-image: url('@Asset/hero.jpg?{fit:"inside",height:1000,width:2000}');
    background-position: right -175px bottom -200px;
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
    @apply flex flex-grow justify-center px-8 py-4;
  }

  .offsetimage {
    position: absolute;
    top: -20px;
    left: -20px;
  }
</style>

<header class="flex flex-col">
  <div class="flex justify-between px-8 py-2">
    <div class="flex items-center">
      <img src={Logo} alt="Energiatodistusrekisterin logo" />
      <h1 class="pl-2">Energiatodistusrekisteri</h1>
    </div>
    <nav>
      <span>suomeksi</span>
      /
      <span>på svenska</span>
    </nav>
  </div>
  <nav class="px-16 mainnavigation flex">
    <a class="navcontainer bg-lime text-black" href="#">Etusivu</a>
    <a class="navcontainer bg-green text-white" href="#">Energiatodistushaku</a>
    <a class="navcontainer bg-darkgreen text-white" href="#">
      Todistustenlaatijahaku
    </a>
    <a class="navcontainer bg-ashblue text-white" href="#">
      Laatijan kirjautuminen
    </a>
  </nav>
</header>
<div class="hero px-16 flex items-center bg-beige" role="presentation">
  <section class="w-1/3 ml-16 bg-white text-ashblue font-bold">
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
    <section class="mr-8 bg-beige pl-16">
      <h2 class="mb-4">Käytä vain virallista energiatodistusta</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="mr-8">
      <h2 class="mb-4">Motiva Oy:n energiatodistuspavelu</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="mr-8 pr-16">
      <h2 class="mb-4">Tilastot rakennusten energiatodistuksista</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
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
