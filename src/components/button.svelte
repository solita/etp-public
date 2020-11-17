<script context="module">
  export const styles = {
    green: { text: 'white', bg: 'green' },
    white: { text: 'ashblue', bg: 'white' },
    ashblue: { text: 'white', bg: 'ashblue' }
  };
</script>

<script>
  export let text;
  export let bg;
  export let type = 'submit';

  export let disabled = false;
</script>

<!-- purgecss: bg-lightgrey cursor-not-allowed -->

<button
  on:click
  {disabled}
  {type}
  class:bg-lightgrey={disabled}
  class:cursor-not-allowed={disabled}
  class={`w-full flex space-x-2 items-center sm:w-auto m-1 uppercase text-sm font-bold tracking-wider rounded-full px-8 py-3 focus:outline-none text-${text} bg-${bg}`}>
  <slot />
</button>
