<script context="module">
  import { writable, derived } from 'svelte/store';
  import sv from '@Asset/sv.json';

  const translations = { fi: {}, sv };

  const navigatorLanguage = navigator.language.split('-')[0];

  export const locale = writable(
    ['fi', 'sv'].includes(navigatorLanguage) ? navigatorLanguage : 'fi'
  );

  export const _ = derived(locale, $locale => str =>
    translations[$locale][str] || str
  );

  export const labelLocale = (locale, obj) => obj?.[`label-${locale}`];
</script>
