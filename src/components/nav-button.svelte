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
focus:shadow-ashblue 
border-lightgreen
border-green
border-darkgreen
border-ashblue
border-black
-->
<a
  class="flex box-border lg:flex-full flex-auto py-4 px-2 navcontainer bg-{background}
  text-{text} focus:z-10
  hover:z-10 hover:underline focus:outline-none xl:flex-row lg:flex-col flex-row
  lg:items-center xl:items-center md:items-start border-l-4 lg:border-l-0 border-{$activePath === link ? text : background} lg:border-{background} lg:shadow-{$activePath === link ? background : 'none'} focus:underline"
  href={link}>
  {#if iconLeft}
    <img
      class="icon inline-block flex-none"
      class:dark={text === 'black'}
      src={iconLeft}
      alt="Icon" />
  {/if}
  <div class="flex flex-col ml-2 flex-1 flex-grow">
    <slot name="title" />
    <slot name="subtitle" />
  </div>
  <div class="inline-flex items-start justify-end flex-shrink lg:hidden xl:block">
    <slot name="iconright" />
  </div>
</a>
