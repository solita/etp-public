<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;

  let id;

  onMount(
    () =>
      (id = Math.random()
        .toString(36)
        .substr(2, 9))
  );
</script>

<style>
  input {
    background-color: transparent;
  }

  input::placeholder {
    @apply text-black;
  }
</style>

<label for={id} class="sr-only">{label}</label>
<div 
  class="w-full inline-block bg-white rounded-full border-2 px-4 py-2
  border-black hover:bg-lightgrey">
  <input {id} bind:value placeholder={label} class="w-full focus:outline-none" />
</div>
