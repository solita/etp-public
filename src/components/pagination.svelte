<script>
  export let page;
  export let pageSize;
  export let itemCount;
  export let currentPageItemCount;
  export let queryStringFn;

  $: numberOfPages = Math.ceil(itemCount / pageSize);
</script>

<style>
  .pagination {
    @apply flex mx-auto text-green text-center font-semibold;
  }

  .pagelink {
    @apply border-darkgrey border-l px-2;
  }
  .pagelink:last-child {
    @apply border-r;
  }
</style>

<!-- purgecss: text-black text-lightgrey -->

<div
  class="flex w-full align-center items-center justify-center my-1 flex-col
  md:flex-row relative">
  <span class="top-0 left-0 md:justify-self-start relative md:absolute">
    {itemCount ? `Tulokset ${page * pageSize + 1}...${page * pageSize + currentPageItemCount}/${itemCount}` : ''}
  </span>
  <nav class="pagination w-full md:w-auto select-none">
    {#if numberOfPages > 1}
      <a
        class="uppercase mr-2 hidden md:inline-block"
        href={page > 0 ? queryStringFn(page - 1) : null}
        class:text-lightgrey={page <= 0}>
        edellinen
      </a>
      <a
        class="material-icons md:hidden px-2 py-2 md:py-0"
        href={page > 0 ? queryStringFn(page - 1) : null}
        class:text-lightgrey={page <= 0}>
        navigate_before
      </a>

      <div class="cursor-default flex items-center flex-grow">
        {#each [...Array(numberOfPages).keys()] as link}
          <a
            class="pagelink uppercase py-2 md:py-0 flex-grow"
            class:text-black={page === link}
            href={page !== link ? queryStringFn(link) : null}>
            {link + 1}
          </a>
        {/each}
      </div>
      <a
        class="uppercase ml-2 hidden md:inline-block"
        href={page + 1 < numberOfPages ? queryStringFn(page + 1) : null}
        class:text-lightgrey={page + 1 >= numberOfPages}>
        seuraava
      </a>
      <a
        class="material-icons md:hidden px-2 py-2 md:py-0"
        href={page + 1 < numberOfPages ? queryStringFn(page + 1) : null}
        class:text-lightgrey={page + 1 >= numberOfPages}>
        navigate_next
      </a>
    {/if}
  </nav>
</div>
