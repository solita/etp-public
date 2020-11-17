<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;
  export let name;
  export let min;
  export let max;
  export let step;
  export let invalidMessage;

  export let model = {};
  export let path = '';
  export let set = val => (value = val);

  $: value = model[path];

  export let validation = () => true;
  export let validate = false;

  let valid = true;

  $: valid = validation(value);

  let id;
  let focused = false;

  onMount(() => (id = Math.random().toString(36).substr(2, 9)));
</script>

<style>
  input {
    background-color: transparent;
  }

  input::placeholder {
    @apply text-darkgrey italic;
  }

  .input-parent:focus-within {
    @apply bg-grey border-green;
  }
  .errortext {
    @apply text-xs absolute;
    bottom: 1em;
    left: 0;
  }
</style>

<!-- purgecss: 
border-red
-->
<div class="relative w-full  flex flex-col pb-8">
  <label for={id} class="sr-only">{label}</label>
  <div
    class:border-red={!valid && value}
    class="input-parent w-full relative inline-block border-b-2 px-4 py-2 border-darkgrey
   hover:bg-grey">
    <input
      {id}
      {name}
      {min}
      {max}
      {step}
      bind:value
      on:input={evt => set(evt.target.value)}
      type="number"
      placeholder={label}
      class="w-full focus:outline-none"
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)} />
  </div>
  {#if !focused && invalidMessage && !valid && value}
    <span class="errortext">{invalidMessage}</span>
  {/if}
</div>
