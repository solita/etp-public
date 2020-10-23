<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;
  export let name;

  let id;

  onMount(() => (id = Math.random().toString(36).substr(2, 9)));
</script>

<style>
  input {
    background-color: transparent;
  }

  input::placeholder {
    @apply text-black;
  }

  span.material-icons {
    top: 0.05em;
    right: 0.2em;
    font-size: 2.2em;
    @apply absolute select-none pointer-events-none my-auto text-ashblue font-semibold;
  }
</style>

<label for={id} class="sr-only">{label}</label>
<div
  class="w-full relative inline-block bg-white rounded-full border-2 px-4 py-2
  border-green hover:bg-lightgrey">
  <input
    {id}
    {name}
    bind:value
    placeholder={label}
    class="w-full focus:outline-none" />
  <span class="material-icons"> search </span>
</div>
