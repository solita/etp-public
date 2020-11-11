<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;
  export let options = [];
  export let name;
  export let invalidMessage;

  let id;
  let used = false;
  // let min = 0;
  // let max = options.length;
  $: valid =
    // value &&
    // ((min && value.length >= min) || !min) &&
    // ((max && value.length <= max) || !max) &&
    used;

  onMount(() => (id = Math.random().toString(36).substr(2, 9)));
</script>

<style>
  .input-parent:focus-within {
    @apply bg-grey border-green;
  }

  select {
    background-color: transparent;
  }
</style>

<!-- purgecss: 
border-darkgrey
border-green
border-red
text-darkgrey
italic
-->
<div class="relative w-full flex flex-col">
  <label for={id} class="sr-only">{label}</label>
  <div
    class:text-darkgrey={!used}
    class:border-red={!valid && used}
    class="input-parent w-full relative inline-block border-b-2 px-2 py-2 border-darkgrey hover:bg-grey">
    <select
      class:italic={!used}
      class="w-full h-full"
      {id}
      {name}
      bind:value
      on:change={() => {
        used = true;
      }}
      on:blur={() => {
        used = true;
      }}>
      <option value="-1" class="hidden">{label}</option>
      {#each options as op}
        <option value={op}>{op}</option>
      {/each}
    </select>
  </div>
  {#if invalidMessage && used && !valid}
    <span class="w-full text-xs">{invalidMessage}</span>
  {:else}<span class="w-full text-xs invisible">III</span>{/if}
</div>
