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
</script>

<button
  on:click
  class={`uppercase text-sm font-bold tracking-wider rounded-full px-8 py-3 focus:outline-none text-${text} bg-${bg}`}>
  <slot />
</button>
