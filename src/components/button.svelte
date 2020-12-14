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
  export let type = 'submit';

  export let disabled = false;
</script>

<style>
  button:focus:not(:disabled), button:active:not(:disabled), button:hover:not(:disabled){
    box-shadow:
      inset 0 0 0 3px #fff,
      0 0 0 1px #aaa;
  }
</style>
<!-- purgecss: bg-lightgrey bg-green bg-white bg-ashblue bg-darkgreen bg-darkgrey bg-darkashblue cursor-not-allowed shadow-none -->

<button
  on:click
  {disabled}
  {type}
  class:bg-lightgrey={disabled}
  class:cursor-not-allowed={disabled}
  class:shadow-none={disabled}
  class={`w-full flex space-x-2 items-center sm:w-auto m-1 uppercase text-sm font-bold tracking-wider rounded-full px-8 py-3 focus:outline-none text-${text} bg-${bg} hover:bg-${disabled ? 'lightgrey' : focus} focus:bg-${disabled ? 'lightgrey' : focus} border-transparent`}>
  <slot />
</button>
