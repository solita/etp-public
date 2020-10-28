<script>
  export let title;
  export let noindex = true;
  export let nofollow = true;
  export let descriptionFi;
  export let descriptionSv;
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}

  <meta
    name="robots"
    content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
  <meta
    name="googlebot"
    content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />

  {#if descriptionFi}
    <meta name="description" lang="fi" content={descriptionFi} />
  {/if}
  {#if descriptionSv}
    <meta name="description" lang="sv" content={descriptionSv} />
  {/if}
</svelte:head>
