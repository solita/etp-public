<script>
  import { onMount } from 'svelte';
  import { each } from 'svelte/internal';

  export let label;
  export let value;
  export let options = [];
  export let name;
  export let invalidMessage;

  let id;
  let used = false;
  let min = 0;
  let max = options.length;
  $: valid = value && ((min && value.length >= min) || !min) && used;
  // ((max && value.length <= max) || !max);

  $: {
    console.log(value);
  }

  onMount(() => (id = Math.random().toString(36).substr(2, 9)));
</script>

<!-- purgecss: 
border-lightgrey
border-green
border-red
-->
<div class="relative w-full  flex flex-col">
  <label for={id} class="sr-only">{label}</label>
  <div
    class:border-lightgrey={!used}
    class:text-darkgrey={!used}
    class:italic={!used}
    class:border-green={valid && used}
    class:border-red={!valid && used}
    class="w-full relative inline-block border-b-2 px-4 py-2 focus-within:bg-grey hover:bg-grey">
    <select
      class="w-full h-full"
      {id}
      {name}
      bind:value
      on:blur={() => {
        used = true;
      }}>
      <option value="-1" class="hidden text-darkgrey italic">{label}</option>
      {#each options as op}
        <option value={op}>{op}</option>
      {/each}
    </select>
  </div>
  {#if invalidMessage && used && !valid}
    <span class="w-full text-xs">{invalidMessage}</span>
  {/if}
</div>
