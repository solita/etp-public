<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;
  export let name;
  export let min;
  export let max;
  export let step;
  export let invalidMessage;

  let id;
  $: valid = ((min && value >= min) || !min) && ((max && value <= max) || !max);

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
</style>

<!-- purgecss: 
border-red
-->
<div class="relative w-full  flex flex-col">
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
      type="number"
      placeholder={label}
      class="w-full focus:outline-none" />
  </div>
  {#if invalidMessage && !valid && value}
    <span class="w-full text-xs">{invalidMessage}</span>
  {:else}<span class="w-full text-xs invisible">III</span>{/if}
</div>
