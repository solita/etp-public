<script>
  export let title = '';
  export let labels;
  export let items;
</script>

<div class="w-full flex flex-col space-y-2">
  {#if items}
    <div class="w-full flex flex-col">
      {#if title}
        <h2 class="my-4 text-green">{title}</h2>
      {/if}
      <div class="w-full flex flex-col">
        {#each items as item, i}
          <div class="w-full flex justify-between">
            <span>{labels[i] || ''}</span>
            <span>{item}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
