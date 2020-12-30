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
      background: 'altgreen'
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
  export let click = () => {};

  import { activePath } from '@Router/router';
</script>

<style>
  a {
    transition: box-shadow 0.1s;
  }
  .icon {
    width: 2.5em;
    height: 2.5em;
  }
</style>

<!-- purgecss: 
dark 
bg-lightgreen 
bg-green 
bg-altgreen 
bg-ashblue
text-white
text-black
shadow-lightgreen
shadow-green
shadow-altgreen
shadow-ashblue 
shadow-none 
border-lightgreen
border-green
border-darkgreen
border-altgreen
border-ashblue
border-black
border-white
-->
<a
  class="flex box-border lg:flex-full flex-auto py-4 xl:py-6 px-2 navcontainer 
  bg-{background} text-{text} border-{text} focus:z-10 hover:z-10 hover:underline 
  focus:outline-none xl:flex-row lg:flex-col flex-row lg:items-center 
  xl:items-center md:items-start {$activePath === link ? 'border-l-4' : 'border-l-0'} lg:border-l-0 lg:border-{background} 
  lg:shadow-{$activePath === link ? background : 'none'} focus:underline"
  href={link}
  on:click={click}>
  {#if iconLeft}
    <img
      class="icon inline-block flex-none mx-2"
      class:dark={text === 'black'}
      src={iconLeft}
      alt="Icon" />
  {/if}
  <div class="flex flex-col ml-2 flex-1 flex-grow items-start justify-start">
    <slot name="title" />
    <slot name="subtitle" />
  </div>
  <div class="inline-flex items-start justify-end flex-shrink lg:hidden">
    <slot name="iconright" />
  </div>
</a>
