<script>
  import { tick } from 'svelte';
  import { slide } from 'svelte/transition';
  import Button, { styles as buttonStyles } from '@Component/button';
  import InputSearch from '@Component/input-search';
  import InputText from '@Component/input-text';
  import InputNumber from '@Component/input-number';
  import InputDate from '@Component/input-date';
  import InputSelect from '@Component/input-select';
  import InputVersio from '@Component/input-versio';
  import InfoBlock from '@Component/info-block';
  import Container, { styles as containerStyles } from '@Component/container';
  import { _ } from '@Localization/localization';
  import { navigate } from '@/router/router';

  import * as EtHakuUtils from '@/utilities/ethaku';
  import * as EtApi from '@/api/energiatodistus-api';
  import * as parsers from '@/utilities/parsers';

  export let where = '[[]]';
  export let alue = '';
  export let offset = 0;

  const pageSize = 25;

  let tarkennettuShown = true;

  const luokat = ['test 1', 'test 2', 'test 3'];

  const validationModel = EtHakuUtils.validationModel();

  const parseValues = model => {
    const parseModel = EtHakuUtils.parseModel();

    return Object.keys(model).reduce(
      (acc, item) => ({
        ...acc,
        [item]: parseModel[item] ? parseModel[item](model[item]) : model[item]
      }),
      {}
    );
  };

  const validateValues = (tarkennettu, validationModel, model) => {
    const keys = [
      ...new Set(['id', ...(tarkennettu ? Object.keys(model) : [])])
    ];

    const validate = {
      ...validationModel,
      'perustiedot.valmistumisvuosi_min': validationModel[
        'perustiedot.valmistumisvuosi_min'
      ](1000, new Date().getFullYear()),
      'perustiedot.valmistumisvuosi_max': validationModel[
        'perustiedot.valmistumisvuosi_max'
      ](new Date().getFullYear(), 2900),
      'voimassaolo-paattymisaika_min': validationModel[
        'voimassaolo-paattymisaika_min'
      ]('', model['voimassaolo-paattymisaika_max']),
      'voimassaolo-paattymisaika_max': validationModel[
        'voimassaolo-paattymisaika_max'
      ](model['voimassaolo-paattymisaika_min'], ''),
      'tulokset.e-luku_min': validationModel['tulokset.e-luku_min'](
        0,
        validationModel['tulokset.e-luku_max']
      ),
      'tulokset.e-luku_max': validationModel['tulokset.e-luku_max'](
        validationModel['tulokset.e-luku_min'],
        1000
      )
    };

    return keys.map(item => {
      console.log(item, model[item], validate[item](model[item]));
      return validate[item](model[item]);
    });
  };

  const numberOrDefault = (def, v) => {
    const value = parsers.parseInteger(v);

    if (isNaN(value)) return def;

    return value;
  };

  $: keyword = alue;

  $: deserializedWhere = EtHakuUtils.deserializeWhere(
    EtHakuUtils.defaultSearchModel(),
    where
  );

  $: searchmodel = { ...deserializedWhere };

  $: setter = key => value => (searchmodel = { ...searchmodel, [key]: value });

  $: isValid = validateValues(
    tarkennettuShown,
    validationModel,
    searchmodel
  ).reduce((acc, item) => acc && item, true);

  $: console.log(isValid);

  $: result = EtApi.energiatodistukset(fetch, {
    where: EtHakuUtils.whereQueryString(
      EtHakuUtils.where(tarkennettuShown, deserializedWhere)
    ),
    alue,
    offset,
    limit: pageSize
  });

  const commitSearch = model => {
    const where = EtHakuUtils.where(tarkennettuShown, model);

    const whereString = EtHakuUtils.whereQueryString(where);
    const qs = [
      `${
        !whereString.length || whereString === '[[]]'
          ? ''
          : `where=${whereString}`
      }`,
      `${keyword && keyword.length ? `keyword=${keyword}` : ''}`
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
            model={searchmodel}
            path={'id'}
            parse={parsers.parseInteger}
            set={setter('id')}
            validation={validationModel.id}
            validate={true} />
        </div>
        <aside class="font-normal text-xs italic mt-4">
          Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
        </aside>
        <div class="flex">
          <div class="w-full md:w-11/12">
            <InputSearch
              label="Hae alueella"
              model={{ keyword }}
              path={'keyword'}
              set={value => (keyword = value)} />
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

          <div class="w-full md:w-1/2 pb-3">
            <div class="flex justify-start">
              <InputVersio
                set={setter('versio')}
                versio={searchmodel['versio']} />
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
              model={searchmodel}
              path={'perustiedot.nimi'}
              set={setter('perustiedot.nimi')}
              validation={validationModel['perustiedot.nimi']}
              validate={true}
              invalidMessage={'Nimi voi olla korkeintaan 100 merkkiä'} />
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
              model={searchmodel}
              path={'perustiedot.rakennustunnus'}
              set={setter('perustiedot.rakennustunnus')}
              validation={validationModel['perustiedot.rakennustunnus']}
              validate={true}
              invalidMessage={'Syötetty arvo ei ole validi rakennustunnus.'} />
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
                max={numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_max'])}
                model={searchmodel}
                path={'perustiedot.valmistumisvuosi_min'}
                set={setter('perustiedot.valmistumisvuosi_min')}
                step="1"
                validation={validationModel['perustiedot.valmistumisvuosi_min'](1000, numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_max']))}
                invalidMessage={'Sallittu arvo 1000-' + numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_max'])} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={'vvvv'}
                min={numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_min'])}
                model={searchmodel}
                path={'perustiedot.valmistumisvuosi_max'}
                set={setter('perustiedot.valmistumisvuosi_max')}
                max="2900"
                step="1"
                validation={validationModel['perustiedot.valmistumisvuosi_max'](numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_min']), 2900)}
                invalidMessage={'Sallittu arvo ' + numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_min']) + '-2900'} />
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
                model={searchmodel}
                path={'voimassaolo-paattymisaika_min'}
                set={setter('voimassaolo-paattymisaika_min')}
                max={searchmodel['voimassaolo-paattymisaika_max']}
                invalidMessage={'Voimassaolon päättymisajan alku ei voi olla lopun jälkeen.'}
                validation={validationModel['voimassaolo-paattymisaika_min']('', searchmodel['voimassaolo-paattymisaika_max'])}
                validate={true} />
            </div>
            <span
              class="material-icons text-darkgrey w-full md:w-auto select-none">
              horizontal_rule
            </span>
            <div class="w-full md:w-2/5">
              <InputDate
                label={'pp.kk.vvvv'}
                model={searchmodel}
                path={'voimassaolo-paattymisaika_max'}
                set={setter('voimassaolo-paattymisaika_max')}
                min={searchmodel['voimassaolo-paattymisaika_min']}
                invalidMessage={'Voimassaolon päättymisajan loppu ei voi olla alun jälkeen'}
                validation={validationModel['voimassaolo-paattymisaika_max'](searchmodel['voimassaolo-paattymisaika_min'], '')}
                validate={true} />
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
                max={numberOrDefault(1000, searchmodel['tulokset.e-luku_max'])}
                model={searchmodel}
                path={'tulokset.e-luku_min'}
                set={setter('tulokset.e-luku_min')}
                step="1"
                validation={validationModel['tulokset.e-luku_min'](0, numberOrDefault(1000, searchmodel['tulokset.e-luku_max']))}
                validate={true}
                invalidMessage={`Arvo voi olla väliltä 0 - ${numberOrDefault(1000, searchmodel['tulokset.e-luku_max'])}`} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={''}
                min={numberOrDefault(1, searchmodel['tulokset.e-luku_min'])}
                model={searchmodel}
                path={'tulokset.e-luku_max'}
                set={setter('tulokset.e-luku_max')}
                step="1"
                validation={validationModel['tulokset.e-luku_max'](numberOrDefault(1, searchmodel['tulokset.e-luku_min']), 1000)}
                validate={true}
                invalidMessage={`Arvo voi olla väliltä ${numberOrDefault(1, searchmodel['tulokset.e-luku_min'])} - 1000`} />
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
                model={searchmodel}
                path={'lahtotiedot.lammitetty-nettoala_min'}
                set={setter('lahtotiedot.lammitetty-nettoala_min')} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                label={''}
                min={searchmodel['lahtotiedot.lammitetty-nettoala_min']}
                model={searchmodel}
                path={'lahtotiedot.lammitetty-nettoala_max'}
                set={setter('lahtotiedot.lammitetty-nettoala_max')} />
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
      <Button {...buttonStyles.green} disabled={!isValid} type="submit">
        {$_('HAE')}
      </Button>
      <Button {...buttonStyles.ashblue} type="reset">
        {$_('HAKU_TYHJENNA')}
      </Button>
    </div>
  </form>
</Container>
