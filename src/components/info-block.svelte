<script>
  import IconInfo from '@Asset/icons/info.svg';

  export let title;
</script>

<style>
  section{
    min-height: 12rem;
  }
  .icon {
    width: auto;
    height: 4em;
  }

  .icon.smaller {
    height: 2.5em;
  }
</style>

<section
  class="flex flex-col justify-center items-left bg-beige sm:px-16 sm:py-8 px-4 py-4">
  <img class="icon smaller sm:hidden mr-4" src={IconInfo} alt="Info icon" />
  <h2 class="font-bold text-ashblue text-xl tracking-widest mb-4 text-left">
    {title}
  </h2>
  <div class="flex items-center">
    <img class="icon mr-4 hidden sm:block" src={IconInfo} alt="Info icon" />
    <p class="font-medium">
      <slot />
    </p>
  </div>
</section>
