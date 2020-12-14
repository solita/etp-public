<script context="module">
  export const styles = {
    green: { text: 'white', bg: 'green', focus: 'darkgreen' },
    white: { text: 'ashblue', bg: 'white', focus: 'darkgrey' },
    ashblue: { text: 'white', bg: 'ashblue', focus: 'darkashblue' }
  };
</script>

<script>
  export let text;
  export let bg;
  export let focus;
  export let href;
  export let target;
</script>

<style>
a:focus, a:active, a:hover{
  box-shadow:
    inset 0 0 0 3px #fff,
    0 0 0 1px #aaa;
}
</style>

<!-- purgecss: bg-lightgrey bg-green bg-white bg-ashblue bg-darkgreen bg-darkgrey bg-darkashblue cursor-not-allowed shadow-none -->
<a
  {href} {target}
  class={`w-full sm:w-auto m-1 uppercase text-sm font-bold tracking-wider rounded-full px-8 py-3 focus:outline-none text-${text} bg-${bg} hover:bg-${focus} focus:bg-${focus} inline-flex space-x-2 items-center`}>
  <slot />
</a>
