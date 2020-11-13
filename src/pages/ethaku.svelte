<script>
  import { tick } from 'svelte';
  import { slide } from 'svelte/transition';
  import Button, { styles as buttonStyles } from '@Component/button';
  import InputSearch from '@Component/input-search';
  import InputText from '@Component/input-text';
  import InputNumber from '@Component/input-number';
  import InputDate from '@Component/input-date';
  import InputSelect from '@Component/input-select';
  import InfoBlock from '@Component/info-block';
  import Container, { styles as containerStyles } from '@Component/container';
  import { _ } from '@Localization/localization';
  import { navigate } from '@/router/router';

  import * as EtHakuUtils from '@/utilities/ethaku';

  export let where = '[[]]';
  export let keyword = '';
  export let offset = 0;

  const pageSize = 25;

  let tarkennettuShown = true;

  const luokat = ['test 1', 'test 2', 'test 3'];

  const deserializeWhere = (model, where) => {
    let res;
    try {
      res = JSON.parse(where);
    } catch (e) {
      res = [[]];
    }

    const [and] = res;

    return and
      .map(([op, key, value]) => ({
        [`${key}${op !== '=' ? (op === '>=' ? '_min' : '_max') : ''}`]: value
      }))
      .reduce((acc, item) => ({ ...acc, ...item }), model);
  };

  $: deserializedWhere = deserializeWhere(
    EtHakuUtils.defaultSearchModel(),
    where
  );

  $: searchmodel = { ...deserializedWhere };

  const eq = (key, model) => ['=', key, model[key]];
  const lte = (key, model) => ['<=', key, model[`${key}_max`]];
  const gte = (key, model) => ['>=', key, model[`${key}_min`]];

  const commitSearch = model => {
    const where = [
      eq('id', model),
      ...(tarkennettuShown
        ? [
            eq('versio', model),
            eq('perustiedot.nimi', model),
            eq('perustiedot.rakennustunnus', model),
            gte('perustiedot.valmistumisvuosi', model),
            lte('perustiedot.valmistumisvuosi', model),

            lte('voimassaolo-paattymisaika', model),
            gte('tulokset.e-luku', model),
            lte('tulokset.e-luku', model),
            ...(model['tulokset.e-luokka'].length
              ? [eq('tulokset.e-luokka', model)]
              : []),
            gte('lahtotiedot.lammitetty-nettoala', model),
            lte('lahtotiedot.lammitetty-nettoala', model)
          ]
        : [])
    ];

    const whereString = JSON.stringify([
      where.filter(item => {
        const [value] = [...item].reverse();
        return value;
      })
    ]);

    const qs = [
      `offset=0`,
      `${whereString === '[[]]' ? '' : `where=${whereString}`}`,
      `${keyword.length ? `keyword=${keyword}` : ''}`
    ]
      .filter(item => item.length)
      .join('&');

    navigate(`/ethaku${qs.length ? `?${qs}` : ''}`);
  };
</script>

<style>
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

  .tarkennettu-row:focus-within .tarkennettu-label {
    @apply font-bold;
  }
</style>

<Container {...containerStyles.beige}>
  <InfoBlock
    title="Tarvitset energiatodistuksen myydessä, vuokratessa ja rakennuslupaa
  hakiessa">
    Energiatodistus tarvitaan lähes aina myytäessä asuntoa tai rakennusta. Se on
    hyvä hankkia jo ennen myyntiin laittoa. Lain mukaan energiatehokkuusluokan
    pitää näkyä myynti-ilmoituksessa ja energiatodistuksen olla nähtävillä
    asunnon tai talon esittelyssä. Energiatodistus tarvitaan myös lähes aina
    haettaessa rakennuslupaa ja päivitettävä, kun rakennus otetaan käyttöön.
  </InfoBlock>
</Container>
<Container {...containerStyles.white}>
  <form
    class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto"
    on:reset={async () => {
      await tick();
      tarkennettuShown = false;
      keyword = '';
      searchmodel = EtHakuUtils.defaultSearchModel();
    }}
    on:submit|preventDefault={() => commitSearch(searchmodel)}>
    <div class="flex flex-col md:flex-row items-center md:items-start">
      <div class="flex flex-col w-full md:w-9/12">
        <div class="w-full md:w-11/12">
          <InputSearch
            label={'Hae todistustunnuksella'}
            bind:value={searchmodel['id']} />
        </div>
        <aside class="font-normal text-xs italic mt-4">
          Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
        </aside>
        <div class="flex">
          <div class="w-full md:w-11/12">
            <InputSearch label="Hae alueella" bind:value={keyword} />
          </div>
        </div>
      </div>
      <aside
        class="mt-4 md:mt-0 md:w-3/12 md:pl-4 md:border-l-8 border-ashblue text-ashblue italic text-sm">
        Energiatodistuksesta saa nähtäväksi koosteen eli kahden ensimmäisen
        sivun tiedot (henkilötietosuojan vuoksi ei kuitenkaan 1-2 huoneistoa
        koskevista kohteista).
      </aside>
    </div>
    <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
      <button
        class="inline-flex items-center self-center ml-4 text-green focus:text-ashblue focus:outline-none"
        aria-expanded={tarkennettuShown}
        type="button"
        on:click={() => {
          tarkennettuShown = !tarkennettuShown;
        }}>
        {#if tarkennettuShown}
          <span
            class="uppercase font-bold">{$_('ETHAKU_HAKUEHDOT_PIILOITA')}</span>
          <span class="font-icon text-4xl">expand_less</span>
        {:else}
          <span
            class="uppercase font-bold">{$_('ETHAKU_HAKUEHDOT_NAYTA')}</span>
          <span class="font-icon text-4xl">expand_more</span>
        {/if}
      </button>
    </div>
    {#if tarkennettuShown}
      <div
        class="tarkennettu-haku w-full lg:w-5/6 flex flex-col my-4 py-4 border-t-2 border-b-2 border-green space-y-2"
        transition:slide>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_VERSIO')}
          </span>

          <div class="w-full md:w-1/2">
            <div class="flex justify-start">
              <label class="checkbox-container flex items-center p-2 md:p-0">
                <input
                  type="radio"
                  bind:group={searchmodel['versio']}
                  value={''} />
                <span class="material-icons checked text-green">
                  radio_button_checked
                </span>
                <span class="material-icons unchecked">
                  radio_button_unchecked
                </span>
                <span class="ml-1 checkbox-text">{$_('KAIKKI')}</span>
              </label>
              <label
                class="checkbox-container flex items-center p-2 ml-3 md:p-0">
                <input
                  type="radio"
                  bind:group={searchmodel['versio']}
                  value={'2018'} />
                <span class="material-icons checked text-green">
                  radio_button_checked
                </span>
                <span class="material-icons unchecked">
                  radio_button_unchecked
                </span>
                <span class="ml-1 checkbox-text">2018</span>
              </label>
              <label
                class="checkbox-container flex items-center p-2 ml-3 md:p-0">
                <input
                  type="radio"
                  bind:group={searchmodel['versio']}
                  value={'2013'} />
                <span class="material-icons checked text-green">
                  radio_button_checked
                </span>
                <span class="material-icons unchecked">
                  radio_button_unchecked
                </span>
                <span class="ml-1 checkbox-text">2013</span>
              </label>
            </div>
          </div>
        </div>

        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_KAYTTOTARKOITUSLUOKKA')}
          </span>
          <div class="w-full md:w-1/2">
            <InputSelect options={luokat} label={$_('KAIKKI')} value={''} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_ALAKAYTTOTARKOITUSLUOKKA')}
          </span>
          <div class="w-full md:w-1/2">
            <InputSelect options={luokat} label={$_('KAIKKI')} value={''} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_RAKENNUKSEN_NIMI')}
          </span>
          <div class="w-full md:w-1/2">
            <InputText
              label={''}
              bind:value={searchmodel['perustiedot.nimi']} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_RAKENNUSTUNNUS')}
          </span>
          <div class="w-full md:w-1/2">
            <InputText
              label={''}
              bind:value={searchmodel['perustiedot.rakennustunnus']} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_RAKENNUS_VUOSI')}
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputNumber
                label={'vvvv'}
                min="1000"
                max={new Date().getFullYear()}
                bind:value={searchmodel['perustiedot.valmistumisvuosi_min']}
                step="1"
                invalidMessage={'Sallittu arvo 1000-' + new Date().getFullYear()} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={'vvvv'}
                min={new Date().getFullYear()}
                bind:value={searchmodel['perustiedot.valmistumisvuosi_max']}
                max="2900"
                step="1"
                invalidMessage={'Sallittu arvo ' + new Date().getFullYear() + '-2900'} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_LAATIMISPAIVA')}
          </span>
          <div
            class="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center text-center">
            <div class="w-full md:w-2/5">
              <InputDate label={'pp.kk.vvvv'} max={''} value={''} />
            </div>
            <span
              class="material-icons text-darkgrey w-full md:w-auto select-none">
              horizontal_rule
            </span>
            <div class="w-full md:w-2/5">
              <InputDate label={'pp.kk.vvvv'} min={''} value={''} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_VIIMEINEN_VOIMASSAOLOPAIVA')}
          </span>
          <div
            class="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center text-center">
            <div class="w-full md:w-2/5">
              <InputDate
                label={'pp.kk.vvvv'}
                max={searchmodel['voimassaolo-paattymisaika_max']}
                bind:value={searchmodel['voimassaolo-paattymisaika_min']} />
            </div>
            <span
              class="material-icons text-darkgrey w-full md:w-auto select-none">
              horizontal_rule
            </span>
            <div class="w-full md:w-2/5">
              <InputDate
                label={'pp.kk.vvvv'}
                min={searchmodel['voimassaolo-paattymisaika_min']}
                bind:value={searchmodel['voimassaolo-paattymisaika_max']} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_E_KOKONAISLUKU')}
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputNumber
                label={''}
                min="0"
                max={searchmodel['tulokset.e-luku_max']}
                step="1"
                bind:value={searchmodel['tulokset.e-luku_min']} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={''}
                min={searchmodel['tulokset.e-luku_min']}
                step="1"
                bind:value={searchmodel['tulokset.e-luku_max']} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_E_LUKU')}
          </span>
          <div
            class="w-full md:w-1/2 flex flex-row flex-wrap sm:justify-between items-center">
            <label
              class="checkbox-container flex items-center px-3 py-2 md:p-0">
              <input
                type="checkbox"
                bind:group={searchmodel['tulokset.e-luokka']}
                value={'A'} />
              <span class="material-icons checked text-green"> check_box </span>
              <span class="material-icons unchecked">
                check_box_outline_blank
              </span>
              <span class="ml-1 checkbox-text">A</span>
            </label>

            <label
              class="checkbox-container flex items-center px-3 py-2 md:p-0">
              <input
                type="checkbox"
                bind:group={searchmodel['tulokset.e-luokka']}
                value={'B'} />
              <span class="material-icons checked text-green"> check_box </span>
              <span class="material-icons unchecked">
                check_box_outline_blank
              </span>
              <span class="ml-1 checkbox-text">B</span>
            </label>

            <label
              class="checkbox-container flex items-center px-3 py-2 md:p-0">
              <input
                type="checkbox"
                bind:group={searchmodel['tulokset.e-luokka']}
                value={'C'} />
              <span class="material-icons checked text-green"> check_box </span>
              <span class="material-icons unchecked">
                check_box_outline_blank
              </span>
              <span class="ml-1 checkbox-text">C</span>
            </label>
            <label
              class="checkbox-container flex items-center px-3 py-2 md:p-0">
              <input
                type="checkbox"
                bind:group={searchmodel['tulokset.e-luokka']}
                value={'D'} />
              <span class="material-icons checked text-green"> check_box </span>
              <span class="material-icons unchecked">
                check_box_outline_blank
              </span>
              <span class="ml-1 checkbox-text">D</span>
            </label>
            <label
              class="checkbox-container flex items-center px-3 py-2 md:p-0">
              <input
                type="checkbox"
                bind:group={searchmodel['tulokset.e-luokka']}
                value={'E'} />
              <span class="material-icons checked text-green"> check_box </span>
              <span class="material-icons unchecked">
                check_box_outline_blank
              </span>
              <span class="ml-1 checkbox-text">E</span>
            </label>

            <label
              class="checkbox-container flex items-center px-3 py-2 md:p-0">
              <input
                type="checkbox"
                bind:group={searchmodel['tulokset.e-luokka']}
                value={'F'} />
              <span class="material-icons checked text-green"> check_box </span>
              <span class="material-icons unchecked">
                check_box_outline_blank
              </span>
              <span class="ml-1 checkbox-text">F</span>
            </label>

            <label
              class="checkbox-container flex items-center px-3 py-2 md:p-0">
              <input
                type="checkbox"
                bind:group={searchmodel['tulokset.e-luokka']}
                value={'G'} />
              <span class="material-icons checked text-green"> check_box </span>
              <span class="material-icons unchecked">
                check_box_outline_blank
              </span>
              <span class="ml-1 checkbox-text">G</span>
            </label>

            <!-- <label
                class="checkbox-container flex items-center p-2 md:p-0 xl:pr-6 invisible">
                <input type="checkbox" />
                <span class="material-icons inline-block">
                  check_box_outline_blank
                </span>
                <span class="ml-1 checkbox-text">X</span>
              </label> -->
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_LAMMITETTY_NETTOALA')}
          </span>
          <div
            class="w-full md:w-1/2 flex justify-between items-center text-center">
            <div class="w-2/5">
              <InputNumber
                label={''}
                min="0"
                max={searchmodel['lahtotiedot.lammitetty-nettoala_max']}
                bind:value={searchmodel['lahtotiedot.lammitetty-nettoala_min']} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={''}
                min={searchmodel['lahtotiedot.lammitetty-nettoala_min']}
                bind:value={searchmodel['lahtotiedot.lammitetty-nettoala_max']} />
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
      <Button {...buttonStyles.green} type="submit">{$_('HAE')}</Button>
      <Button {...buttonStyles.ashblue} type="reset">
        {$_('HAKU_TYHJENNA')}
      </Button>
    </div>
  </form>
</Container>
