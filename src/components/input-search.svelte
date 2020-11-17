<script>
  import { onMount } from 'svelte';

  export let label;
  export let name;

  export let model = {};
  export let path = '';

  $: value = model[path];

  export let validation = () => true;
  export let validate = false;
  export let parse = a => a;
  export let set = val => (value = val);

  let id;
  let valid = true;

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
    bind:value
    placeholder={label}
    class="w-full focus:outline-none"
    on:input={async evt => {
      if (validate) {
        valid = validation(evt.target.value);
      }
      set(evt.target.value);
    }} />
  <span class="material-icons"> search </span>
</div>
