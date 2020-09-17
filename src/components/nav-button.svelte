<script>
  export let link;
  export let title;
  export let subtitle;
  export let colorText;
  export let colorBackground;
  export let iconLeft;
  export let iconRight;

  import { activePath } from '@Component/router/router';
</script>

<style>
  .navcontainer {
    flex-basis: 100%;
    @apply flex flex-grow px-1 py-3 flex-row items-center;
  }
  .active {
    box-shadow: 0px 5px 0px 0px black;
    z-index: 1;
  }
  .icon {
    width: 35px;
    height: auto;
    overflow: hidden;
    filter: invert(1);
    @apply flex-none mx-auto mx-1;
  }
  .text-black .icon {
    filter: invert(0);
  }
</style>

<a
  class="navcontainer {colorBackground}
    {colorText}
    {$activePath === link ? 'active' : ''}"
  href={link}>
  {#if iconLeft}
    <img
      class="icon {colorText === 'black' ? 'dark' : ''}"
      src={iconLeft}
      alt="Icon" />
  {/if}
  <div class="flex flex-col flex-grow self-start px-1">
    <span class="uppercase">{title}</span>
    <span class="text-sm italic font-light"> {subtitle} </span>
  </div>
  {#if iconRight}
    <img
      class="icon {colorText === 'black' ? 'dark' : ''}"
      src={iconRight}
      alt="Icon" />
  {/if}
</a>
