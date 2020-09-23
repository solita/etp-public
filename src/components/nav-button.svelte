<script context="module">
  export const styles = {
    lightgreen: {
      text: 'black',
      background: 'lightgreen'
    },
    green: {
      text: 'white',
      background: 'green'
    },
    darkgreen: {
      text: 'white',
      background: 'darkgreen'
    },
    ashblue: {
      text: 'white',
      background: 'ashblue'
    }
  };
</script>

<script>
  export let link;
  export let text;
  export let background;
  export let iconLeft;
  export let iconRight;

  import { activePath } from '@Router/router';
</script>

<style>
  a {
    transition: box-shadow 0.1s;
  }
  .icon {
    width: 3.5em;
    height: auto;
  }
</style>

<!-- purgecss: 
dark active 
bg-lightgreen 
bg-green 
bg-darkgreen 
bg-ashblue
text-white
text-black
hover:shadow-lightgreen
hover:shadow-green
hover:shadow-darkgreen
hover:shadow-ashblue
focus:shadow-lightgreen
focus:shadow-green
focus:shadow-darkgreen
focus:shadow-ashblue -->
<a
  class="flex flex-full items-center py-4 px-1 navcontainer bg-{background}
  text-{text} focus:shadow-{background} focus:z-10 hover:shadow-{background}
  hover:z-10 focus:outline-none xl:flex-row flex-col"
  class:active={$activePath === link}
  href={link}>
  {#if iconLeft}
    <img
      class="icon inline-block flex-none"
      class:dark={text === 'black'}
      src={iconLeft}
      alt="Icon" />
  {/if}
  <div class="inline-flex flex-full flex-col items-center xl:items-start">
    <slot name="title" />
    <slot name="subtitle" />
  </div>
  {#if iconRight}
    <img
      class="icon inline-block flex-none"
      class:dark={text === 'black'}
      src={iconRight}
      alt="Icon" />
  {/if}
</a>
