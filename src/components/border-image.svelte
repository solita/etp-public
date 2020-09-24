<script>
  export let src;

  let box;
  let image;

  let width = 0;
  let height = 0;
</script>

<style>
  .offset {
    top: -15px;
    left: 15px;
  }
</style>

<svelte:window
  on:resize={_ => {
    width = image.width;
    height = image.height;
  }} />

<div class="offset relative inline-block">
  <div
    bind:this={box}
    style={`width:${width}px;height:${height}px;`}
    class="absolute offset border-4 border-white" />
  <img
    bind:this={image}
    on:load={evt => {
      width = evt.target.width;
      height = evt.target.height;
    }}
    {src}
    alt="" />
</div>
