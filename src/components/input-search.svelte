<script>
  import { onMount } from 'svelte';

  export let label;
  export let name;
  export let validation = () => true;

  export let value;

  let id;

  let valid = true;

  export const validate = () => {
    valid = validation(value);
  };

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

<!-- purgecss: invalid -->

<label for={id} class="sr-only">{label}</label>
<div
  class="w-full relative inline-block bg-white rounded-full border-2 px-4 py-2
  border-green hover:bg-lightgrey"
  class:border-red={!valid}>
  <input
    {id}
    {name}
    {value}
    placeholder={label}
    class="w-full focus:outline-none"
    on:change />
  <span class="material-icons"> search </span>
</div>
