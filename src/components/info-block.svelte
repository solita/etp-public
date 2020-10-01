<script>
  export let title;
</script>

<style>
</style>

<section class="px-16 flex flex-col justify-center items-center bg-beige py-8">
  <h2 class="font-bold text-ashblue text-xl tracking-widest mb-4">{title}</h2>
  <div class="flex items-center">
    <span class="font-icon text-6xl mr-4 text-ashblue">info</span>
    <p class="font-medium">
      <slot></slot>
    </p>
  </div>
</section>
