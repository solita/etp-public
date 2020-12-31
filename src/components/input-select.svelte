<script>
  import { onMount } from 'svelte';

  export let label;
  export let value;
  export let format = a => a;
  export let options = [];
  export let name;
  export let disabled;
  export let disabledLabel;

  let id;

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
-->
<div class="relative w-full flex flex-col pb-8">
  <label for={id} class="sr-only">{label}</label>
  <div
    class="input-parent w-full relative inline-block border-b-2 px-2 py-2 border-darkgrey {disabled ? 'cursor-not-allowed': 'hover:bg-grey'}">
    <select
      class="w-full h-full"
      class:cursor-not-allowed={disabled}
      {id}
      {name}
      {disabled}
      title={disabled ? disabledLabel : ''}
      bind:value
      on:blur|stopPropagation={evt => evt.target.dispatchEvent(new Event('change'))}>
      <!-- <option value="-1" class="hidden">{label}</option> -->
      {#each options as op}
        <option value={op}>{format(op)}</option>
      {/each}
    </select>
  </div>
</div>
