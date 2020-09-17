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
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    @apply flex flex-grow px-1 py-2 flex-row items-center;
  }
  .active {
    /* box-shadow: 0px 5px 0px 0px black; */
    z-index: 1;
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }
  .icon {
    width: 2vw;
    height: auto;
    overflow: hidden;
    filter: invert(1);
    @apply flex-none mx-auto mx-1;
  }
  .text-black .icon {
    filter: invert(0);
  }
  .text-base{
    font-size: 1.2vw;
  }
  .text-sm{
    font-size: 1.1vw;
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
    <span class="uppercase text-base">{title}</span>
    <span class="text-sm italic font-light"> {subtitle} </span>
  </div>
  {#if iconRight}
    <img
      class="icon {colorText === 'black' ? 'dark' : ''}"
      src={iconRight}
      alt="Icon" />
  {/if}
</a>
