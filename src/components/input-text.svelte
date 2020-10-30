<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;
  export let name;
  export let min;
  export let max;
  export let invalidMessage;

  let id;
  let used = false;
  $: valid =
    value &&
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
</style>

<!-- purgecss: 
border-lightgrey
border-green
border-red
-->
<div class="relative w-full  flex flex-col">
  <label for={id} class="sr-only">{label}</label>
  <div
    class:border-lightgrey={!used}
    class:border-green={valid && used}
    class:border-red={!valid && used}
    class="w-full relative inline-block border-b-2 px-4 py-2 focus-within:bg-grey hover:bg-grey">
    <input
      {id}
      {name}
      {min}
      {max}
      bind:value
      placeholder={label}
      on:change={() => {
        used = true;
      }}
      class="w-full focus:outline-none" />
  </div>
  {#if invalidMessage && used && !valid}
    <span class="w-full text-xs">{invalidMessage}</span>
  {/if}
</div>
