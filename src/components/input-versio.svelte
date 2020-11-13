<script>
  import { _ } from '@Localization/localization';

  export let versio = 0;
</script>

<style type="text/postcss">
  .checkbox-container input:focus ~ .checkbox-text {
    @apply underline;
  }
  .checkbox-container input {
    @apply absolute opacity-0 cursor-pointer select-none outline-none pointer-events-none;
  }
  .checkbox-container .material-icons {
    @apply select-none text-4xl;
  }
  .checkbox-container input:checked ~ .checked,
  .checkbox-container input ~ .unchecked {
    @apply inline-block;
  }
  .checkbox-container input ~ .checked,
  .checkbox-container input:checked ~ .unchecked {
    @apply hidden;
  }
</style>

<label class="checkbox-container flex items-center p-2 md:p-0">
  <input on:input type="radio" bind:group={versio} value={0} />
  <span class="material-icons checked text-green"> radio_button_checked </span>
  <span class="material-icons unchecked"> radio_button_unchecked </span>
  <span class="ml-1 checkbox-text">{$_('KAIKKI')}</span>
</label>
<label class="checkbox-container flex items-center p-2 ml-3 md:p-0">
  <input on:input type="radio" bind:group={versio} value={2018} />
  <span class="material-icons checked text-green"> radio_button_checked </span>
  <span class="material-icons unchecked"> radio_button_unchecked </span>
  <span class="ml-1 checkbox-text">2018</span>
</label>
<label class="checkbox-container flex items-center p-2 ml-3 md:p-0">
  <input on:input type="radio" bind:group={versio} value={2013} />
  <span class="material-icons checked text-green"> radio_button_checked </span>
  <span class="material-icons unchecked"> radio_button_unchecked </span>
  <span class="ml-1 checkbox-text">2013</span>
</label>
