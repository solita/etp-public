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
  export let href;
</script>

<a
  {href}
  class={`w-full sm:w-auto m-1 uppercase text-sm font-bold tracking-wider rounded-full px-8 py-3 focus:outline-none text-${text} bg-${bg} inline-flex space-x-2 pl-3 items-center`}>
  <slot />
</a>
