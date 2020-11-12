<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;
  export let name;
  export let min;
  export let max;
  export let invalidMessage;

  let id;

  // TODO: compare value date to min and max
  $: valid =
    ((min && value.length >= min) || !min) &&
    ((max && value.length <= max) || !max);

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
border-darkgrey
border-green
border-red
-->
<div class="relative w-full  flex flex-col">
  <label for={id} class="sr-only">{label}</label>
  <div
    class:border-red={!valid && value}
    class="input-parent w-full relative inline-block border-b-2 px-4 py-2
    border-darkgrey hover:bg-grey">
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

  {#if invalidMessage && value && !valid}
    <span class="w-full text-xs">{invalidMessage}</span>
  {:else}<span class="w-full text-xs invisible">III</span>{/if}
</div>
