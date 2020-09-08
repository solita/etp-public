<script>

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

  .hero {
    height: 555px;
  }
</style>

<header class="px-16 flex flex-col bg-green-200">
  <div class="flex justify-between px-8 py-2">
    <img src="images/logo.png" alt="Energiatodistusrekisteri" />
    <nav>
      <span>suomeksi</span>
      /
      <span>på svenska</span>
    </nav>
  </div>
  <nav class="flex">
    <div class="flex-grow flex justify-center px-8 py-4">
      <a href="#">Etusivu</a>
    </div>
    <div class="flex-grow flex justify-center px-8 py-4">
      <a href="#">Energiatodistushaku</a>
    </div>
    <div class="flex-grow flex justify-center px-8 py-4">
      <a href="#">Todistustenlaatijahaku</a>
    </div>
    <div class="flex-grow flex justify-center px-8 py-4">
      <a href="#">Laatijan kirjautuminen</a>
    </div>
  </nav>
</header>
<div class="hero bg-red-300 flex items-center" role="presentation">
  <section class="w-1/3 ml-16">
    <h2 class="mb-4">Energiatodistusrekisteri</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel ex
      vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis. Aenean
      sit amet mollis urna. Nam posuere sed lorem in aliquet.
    </p>
  </section>
</div>
<main class="px-16 bg-teal-200">
  <article class="flex">
    <section class="mr-16">
      <img src="images/ethaku.png" alt="" />
      <h2 class="mb-4">Hae rakennuksen energiatodistus</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
    <section class="mr-16">
      <img src="images/laatijahaku.png" alt="" />
      <h2 class="mb-4">Tarvitsetko energiatodistuksen? Löydä laatija!</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
  </article>
  <section class="flex justify-center py-16">
    <div class="flex flex-col w-7/12">
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
  <article class="flex py-16">
    <section class="mr-8">
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
    <section class="mr-8">
      <h2 class="mb-4">Tilastot rakennusten energiatodistuksista</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a mi vel
        ex vulputate porttitor. Ut rutrum sapien ut lacus blandit lobortis.
        Aenean sit amet mollis urna. Nam posuere sed lorem in aliquet.
      </p>
    </section>
  </article>
</main>

<footer class="flex flex-col bg-indigo-300 pt-16 px-16">
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
