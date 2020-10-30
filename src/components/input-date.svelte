<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;
  export let name;
  export let min;
  export let max;

  let id;

  onMount(() => (id = Math.random().toString(36).substr(2, 9)));
</script>

<style>
  input {
    background-color: transparent;
  }

  input::placeholder {
    @apply text-darkgrey italic;
  }
</style>

<label for={id} class="sr-only">{label}</label>
<div
  class="w-full relative inline-block bg-grey border-b-2 px-4 py-2
  border-ashblue hover:bg-lightgrey">
  <input
    {id}
    {name}
    {min}
    {max}
    bind:value
    placeholder={label}
    type="date"
    class="w-full focus:outline-none" />
</div>
