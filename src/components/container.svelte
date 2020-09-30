<script context="module">
  export const styles = {
    beige: { background: 'beige' },
    mainnavigation: { background: 'mainnavigation' },
    ashbluewhite: { background: 'ashbluewhite' },
    grey: { background: 'grey' },
    white: { background: 'white' },
    hero: { background: 'heroblurred' }
  };
</script>

<script>
  export let background;
</script>

<style>
  .w-1440 {
    max-width: 1440px;
  }

  .bg-mainnavigation {
    background: rgb(197, 225, 145);
    background: linear-gradient(
      90deg,
      rgba(197, 225, 145, 1) 50%,
      rgba(46, 80, 83, 1) 50%
    );
  }

  .bg-ashbluewhite {
    background: rgb(46, 80, 83);
    background: linear-gradient(
      90deg,
      rgba(46, 80, 83, 1) 33%,
      rgba(255, 255, 255, 1) 33%
    );
  }

  .bg-heroblurred {
    background-image: url('@Asset/heroblurred.jpg?{fit:"inside",height:555,width:1440}');
    background-size: cover;
  }
</style>

<div class="bg-{background}">
  <div class="w-1440 m-auto">
    <slot />
  </div>
</div>
