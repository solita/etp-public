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
  import InputELuokka from '@Component/input-e-luokka';
  import InfoBlock from '@Component/info-block';
  import Spinner from '@Component/spinner';
  import Container, { styles as containerStyles } from '@Component/container';
  import { _, locale, labelLocale } from '@Localization/localization';
  import { navigate } from '@/router/router';
  import TableEThaku from '@Component/table-ethaku';
  import Pagination from '@Component/pagination';

  import * as EtHakuUtils from '@/utilities/ethaku';
  import * as EtApi from '@/api/energiatodistus-api';
  import * as parsers from '@/utilities/parsers';

  export let where = '[[]]';
  export let keyword = '';
  export let offset = 0;
  export let page = 0;

  const pageSize = 100;

  let tarkennettuShown = false;

  const validationModel = EtHakuUtils.validationModel();

  let idInput;
  let nimiInput;
  let rakennustunnusInput;
  let allekirjoitusaikaMinInput;
  let allekirjoitusaikaMaxInput;
  let voimassaoloMinInput;
  let voimassaoloMaxInput;
  let valmistumisvuosiMinInput;
  let valmistumisvuosiMaxInput;
  let eLukuMinInput;
  let eLukuMaxInput;
  let nettoalaMinInput;
  let nettoalaMaxInput;

  let kayttotarkoitusluokat = Promise.all([
    EtApi.kayttotarkoitusluokat(fetch, 2013),
    EtApi.kayttotarkoitusluokat(fetch, 2018),
    EtApi.alakayttotarkoitusluokat(fetch, 2013),
    EtApi.alakayttotarkoitusluokat(fetch, 2018)
  ]).then(([kt2013, kt2018, akt2013, akt2018]) => ({
    '0': {
      kayttotarkoitusluokat: [],
      alakayttotarkoitusluokat: []
    },
    '2013': {
      kayttotarkoitusluokat: kt2013,
      alakayttotarkoitusluokat: akt2013
    },
    '2018': {
      kayttotarkoitusluokat: kt2018,
      alakayttotarkoitusluokat: akt2018
    }
  }));

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
      ](
        1000,
        numberOrDefault(
          new Date().getFullYear(),
          searchmodel['perustiedot.valmistumisvuosi_max']
        )
      ),
      'perustiedot.valmistumisvuosi_max': validationModel[
        'perustiedot.valmistumisvuosi_max'
      ](
        numberOrDefault(
          new Date().getFullYear(),
          searchmodel['perustiedot.valmistumisvuosi_min']
        ),
        2900
      ),
      allekirjoitusaika_min: validationModel['allekirjoitusaika_min'](
        '',
        model['allekirjoitusaika_max']
      ),
      allekirjoitusaika_max: validationModel['allekirjoitusaika_max'](
        model['allekirjoitusaika_min'],
        ''
      ),
      'voimassaolo-paattymisaika_min': validationModel[
        'voimassaolo-paattymisaika_min'
      ]('', model['voimassaolo-paattymisaika_max']),
      'voimassaolo-paattymisaika_max': validationModel[
        'voimassaolo-paattymisaika_max'
      ](model['voimassaolo-paattymisaika_min'], ''),
      'tulokset.e-luku_min': validationModel['tulokset.e-luku_min'](
        0,
        numberOrDefault(1000, searchmodel['tulokset.e-luku_max'])
      ),
      'tulokset.e-luku_max': validationModel['tulokset.e-luku_max'](
        numberOrDefault(1, searchmodel['tulokset.e-luku_min']),
        1000
      )
    };

    return keys.map(item =>
      validate[item] ? validate[item](model[item]) : true
    );
  };

  const numberOrDefault = (def, v) => {
    const value = parsers.parseInteger(v);

    if (isNaN(value)) return def;

    return value;
  };

  $: deserializedWhere = EtHakuUtils.deserializeWhere(
    EtHakuUtils.defaultSearchModel(),
    where
  );

  $: tarkennettuShown =
    Object.keys(deserializedWhere).filter(item => item !== 'id').length > 0;

  $: searchmodel = {
    ...EtHakuUtils.defaultSearchModel(),
    ...deserializedWhere
  };

  $: setter = key => value => (searchmodel = { ...searchmodel, [key]: value });

  $: isValid = validateValues(
    tarkennettuShown,
    validationModel,
    searchmodel
  ).reduce((acc, item) => acc && item, true);

  $: result = EtApi.energiatodistukset(fetch, {
    where: EtHakuUtils.whereQuery(
      EtHakuUtils.where(
        tarkennettuShown,
        parseValues({
          ...EtHakuUtils.defaultSearchModel(),
          ...deserializedWhere
        })
      )
    ),
    keyword,
    offset,
    limit: pageSize
  });


  const commitSearch = model => {
    const where = EtHakuUtils.where(tarkennettuShown, parseValues(model));
    const whereQuery = EtHakuUtils.whereQuery(where);
    const whereString = JSON.stringify(whereQuery);
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
  .tarkennettu-label {
    @apply text-lg;
  }
  .tarkennettu-row:focus-within .tarkennettu-label {
    @apply font-bold;
  }
</style>

<Container {...containerStyles.beige}>
  <InfoBlock
    title={$_('ETHAKU_INFO_TITLE')}>
    {$_('ETHAKU_INFO_TEXT')}
  </InfoBlock>
</Container>
<Container {...containerStyles.white}>
  <form
    class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto"
    on:change={async evt => {
      switch (evt.target.name) {
        case 'keyword':
          keyword = evt.target.value;
          break;
        case 'tulokset.e-luokka_in':
          const currentSelection = [...new Set([
              ...searchmodel['tulokset.e-luokka_in'],
              evt.target.value
            ])];

          searchmodel = { ...searchmodel, 'tulokset.e-luokka_in': evt.target.checked ? currentSelection : currentSelection.filter(item => item !== evt.target.value) };
          break;
        case 'versio':
          searchmodel = { ...searchmodel, versio: evt.target.value, 'perustiedot.kayttotarkoitus_in': [], 'perustiedot.kayttotarkoitus': '' };
          break;
        case 'perustiedot.kayttotarkoitus_in':
          const alakayttotarkoitusluokat = await kayttotarkoitusluokat.then(
            ktl =>
              ktl[searchmodel['versio']]['alakayttotarkoitusluokat']
                .filter(
                  item =>
                    item['kayttotarkoitusluokka-id'] ===
                    parseInt(evt.target.value)
                )
                .map(item => item.id)
          );

          const alakayttotarkoitusluokka = alakayttotarkoitusluokat.includes(searchmodel['perustiedot.kayttotarkoitus']) ? searchmodel['perustiedot.kayttotarkoitus'] : '';

          searchmodel = { ...searchmodel, [evt.target.name]: alakayttotarkoitusluokat, 'perustiedot.kayttotarkoitus': alakayttotarkoitusluokka };
          break;
        default:
          searchmodel = { ...searchmodel, [evt.target.name]: evt.target.value };
      }

      await tick();

      idInput.validate();
      if (tarkennettuShown) {
        nimiInput.validate();
        rakennustunnusInput.validate();
        allekirjoitusaikaMinInput.validate();
        allekirjoitusaikaMaxInput.validate();
        voimassaoloMinInput.validate();
        voimassaoloMaxInput.validate();
        valmistumisvuosiMinInput.validate();
        valmistumisvuosiMaxInput.validate();
        eLukuMinInput.validate();
        eLukuMaxInput.validate();
        nettoalaMinInput.validate();
        nettoalaMaxInput.validate();
      }
    }}
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
            bind:this={idInput}
            label={$_('ETHAKU_HAE_TUNNUKSELLA')}
            value={searchmodel['id']}
            name={'id'}
            validation={validationModel.id} />
        </div>
        <aside class="font-normal text-xs italic mt-4">
          {$_('ETHAKU_HAE_ASIDE')}
        </aside>
        <div class="flex">
          <div class="w-full md:w-11/12">
            <InputSearch
              label={$_('ETHAKU_HAE_ALUEELLA')}
              value={keyword ?? ''}
              name={'keyword'} />
          </div>
        </div>
      </div>
      <aside
        class="mt-4 md:mt-0 md:w-3/12 md:pl-4 md:border-l-8 border-ashblue text-ashblue italic text-sm">
        {$_('ETHAKU_ASIDE')}
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
        transition:slide|local>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_VERSIO')}
          </span>

          <div class="w-full md:w-1/2 pb-8">
            <div class="flex justify-start">
              <InputVersio name={'versio'} model={searchmodel} />
            </div>
          </div>
        </div>

        {#await kayttotarkoitusluokat}
          <div
            class="tarkennettu-row w-full mx-auto center flex justify-center">
            <Spinner />
          </div>
        {:then ktluokat}
          {#if searchmodel['versio'] !== '0'}
            <div transition:slide|local class="w-full">
              <div
                class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
                <span
                  class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
                  {$_('ETHAKU_KAYTTOTARKOITUSLUOKKA')}
                </span>
                <div class="w-full md:w-1/2">
                  <InputSelect
                    name={'perustiedot.kayttotarkoitus_in'}
                    format={id => {
                      if (id === -1) return $_('KAIKKI');
                      const item = ktluokat[searchmodel['versio']]['kayttotarkoitusluokat'].find(item => item.id === parseInt(id));
                      if (item) return labelLocale($locale, item);
                      return $_('KAIKKI');
                    }}
                    options={[-1, ...ktluokat[searchmodel['versio']]['kayttotarkoitusluokat'].map(item => item['id'])]}
                    value={ktluokat[searchmodel['versio']]['alakayttotarkoitusluokat'].find(item => item.id === searchmodel['perustiedot.kayttotarkoitus_in'][0])?.['kayttotarkoitusluokka-id'] || -1} />
                </div>
              </div>
              <div
                class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
                <span
                  class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
                  {$_('ETHAKU_ALAKAYTTOTARKOITUSLUOKKA')}
                </span>
                <div class="w-full md:w-1/2">
                  <InputSelect
                    name={'perustiedot.kayttotarkoitus'}
                    format={id => {
                      if (id === '') return $_('KAIKKI');
                      const item = ktluokat[searchmodel['versio']]['alakayttotarkoitusluokat'].find(item => item.id === id);
                      if (item) return labelLocale($locale, item);
                      return $_('KAIKKI');
                    }}
                    options={['', ...ktluokat[searchmodel['versio']][
                        'alakayttotarkoitusluokat'
                      ]
                        .filter(item =>
                          searchmodel['perustiedot.kayttotarkoitus_in'].length
                            ? searchmodel[
                                'perustiedot.kayttotarkoitus_in'
                              ].includes(item['id'])
                            : true
                        )
                        .map(item => item['id'])]}
                    label={$_('KAIKKI')}
                    value={searchmodel['perustiedot.kayttotarkoitus']} />
                </div>
              </div>
            </div>
          {/if}
        {/await}
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_RAKENNUKSEN_NIMI')}
          </span>
          <div class="w-full md:w-1/2">
            <InputText
              bind:this={nimiInput}
              label={''}
              value={searchmodel['perustiedot.nimi']}
              name={'perustiedot.nimi'}
              validation={validationModel['perustiedot.nimi']}
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
              bind:this={rakennustunnusInput}
              label={''}
              value={searchmodel['perustiedot.rakennustunnus']}
              name={'perustiedot.rakennustunnus'}
              validation={validationModel['perustiedot.rakennustunnus']}
              invalidMessage={'Syötetty arvo ei ole oikeamuotoinen rakennustunnus'} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_RAKENNUS_VUOSI')}
          </span>
          <div class="w-full md:w-1/2 flex justify-between items-center">
            <div class="w-2/5">
              <InputNumber
                bind:this={valmistumisvuosiMinInput}
                label={'vvvv'}
                min="0"
                max={numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_max'])}
                model={searchmodel}
                name={'perustiedot.valmistumisvuosi_min'}
                step="1"
                validation={validationModel['perustiedot.valmistumisvuosi_min'](0, numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_max']))}
                invalidMessage={'Arvon tulee olla loppuarvoa pienempi'} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                bind:this={valmistumisvuosiMaxInput}
                label={'vvvv'}
                min={numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_min'])}
                model={searchmodel}
                name={'perustiedot.valmistumisvuosi_max'}
                max="2900"
                step="1"
                validation={validationModel['perustiedot.valmistumisvuosi_max'](numberOrDefault(new Date().getFullYear(), searchmodel['perustiedot.valmistumisvuosi_min']), 2900)}
                invalidMessage={'Arvon tulee olla alkuarvoa suurempi'} />
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
            class="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center">
            <div class="w-full md:w-2/5">
              <InputDate
                bind:this={allekirjoitusaikaMinInput}
                model={searchmodel}
                name={'allekirjoitusaika_min'}
                label={'pp.kk.vvvv'}
                max={searchmodel['allekirjoitusaika_max']}
                validation={validationModel['allekirjoitusaika_min']('', searchmodel['allekirjoitusaika_max'])}
                invalidMessage={'Alkupäivämäärän tulee olla ennen loppupäivämäärää'} />
            </div>
            <span
              class="material-icons text-darkgrey w-full md:w-auto select-none">
              horizontal_rule
            </span>
            <div class="w-full md:w-2/5">
              <InputDate
                bind:this={allekirjoitusaikaMaxInput}
                model={searchmodel}
                name={'allekirjoitusaika_max'}
                label={'pp.kk.vvvv'}
                min={searchmodel['allekirjoitusaika_min']}
                validation={validationModel['allekirjoitusaika_max'](searchmodel['allekirjoitusaika_min'], '')}
                invalidMessage={'Loppupäivämäärän tulee olla alkupäivämäärän jälkeen'} />
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
            class="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center">
            <div class="w-full md:w-2/5">
              <InputDate
                bind:this={voimassaoloMinInput}
                label={'pp.kk.vvvv'}
                model={searchmodel}
                name={'voimassaolo-paattymisaika_min'}
                max={searchmodel['voimassaolo-paattymisaika_max']}
                invalidMessage={'Alkupäivämäärän tulee olla ennen loppupäivämäärää'}
                validation={validationModel['voimassaolo-paattymisaika_min']('', searchmodel['voimassaolo-paattymisaika_max'])} />
            </div>
            <span
              class="material-icons text-darkgrey w-full md:w-auto select-none">
              horizontal_rule
            </span>
            <div class="w-full md:w-2/5">
              <InputDate
                bind:this={voimassaoloMaxInput}
                label={'pp.kk.vvvv'}
                model={searchmodel}
                name={'voimassaolo-paattymisaika_max'}
                min={searchmodel['voimassaolo-paattymisaika_min']}
                invalidMessage={'Loppupäivämäärän tulee olla alkupäivämäärän jälkeen'}
                validation={validationModel['voimassaolo-paattymisaika_max'](searchmodel['voimassaolo-paattymisaika_min'], '')} />
            </div>
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_E_KOKONAISLUKU')}
          </span>
          <div class="w-full md:w-1/2 flex justify-between items-center">
            <div class="w-2/5">
              <InputNumber
                bind:this={eLukuMinInput}
                label={''}
                min="0"
                max={numberOrDefault(1000, searchmodel['tulokset.e-luku_max'])}
                model={searchmodel}
                name={'tulokset.e-luku_min'}
                step="1"
                validation={validationModel['tulokset.e-luku_min'](0, numberOrDefault(1000, searchmodel['tulokset.e-luku_max']))}
                invalidMessage={'Arvon tulee olla loppuarvoa pienempi'} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                bind:this={eLukuMaxInput}
                label={''}
                min={numberOrDefault(1, searchmodel['tulokset.e-luku_min'])}
                model={searchmodel}
                name={'tulokset.e-luku_max'}
                step="1"
                validation={validationModel['tulokset.e-luku_max'](numberOrDefault(1, searchmodel['tulokset.e-luku_min']), 1000)}
                invalidMessage={'Arvon tulee olla alkuarvoa suurempi'} />
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
            <InputELuokka
              name={'tulokset.e-luokka_in'}
              group={searchmodel['tulokset.e-luokka_in']} />
          </div>
        </div>
        <div
          class="tarkennettu-row w-full mx-auto center flex flex-col md:flex-row items-center">
          <span
            class="tarkennettu-label w-full md:w-1/2 text-ashblue tracking-widest">
            {$_('ETHAKU_LAMMITETTY_NETTOALA')}
          </span>
          <div class="w-full md:w-1/2 flex justify-between items-center">
            <div class="w-2/5">
              <InputNumber
                bind:this={nettoalaMinInput}
                label={''}
                min="0"
                max={searchmodel['lahtotiedot.lammitetty-nettoala_max']}
                model={searchmodel}
                name={'lahtotiedot.lammitetty-nettoala_min'}
                invalidMessage={'Arvon tulee olla loppuarvoa pienempi'} />
            </div>
            <span class="material-icons text-darkgrey"> horizontal_rule </span>
            <div class="w-2/5">
              <InputNumber
                bind:this={nettoalaMaxInput}
                label={''}
                min={searchmodel['lahtotiedot.lammitetty-nettoala_min']}
                model={searchmodel}
                name={'lahtotiedot.lammitetty-nettoala_max'}
                set={setter('lahtotiedot.lammitetty-nettoala_max')}
                invalidMessage={'Arvon tulee olla alkuarvoa suurempi'} />
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



<Container {...containerStyles.white}>
  {#await 
  Promise.all([result,
    Promise.resolve(parseInt(page ?? 0)),
    Promise.resolve(pageSize)])}
    <div class="flex justify-center">
      <Spinner />
    </div>
  {:then [et, page, pageSize]}
    <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col w-full">
      <TableEThaku
        etCount={et.length}
        eTodistukset={et.slice(page * pageSize, (page + 1) * pageSize)}
        let:currentPageItemCount
        {page}>
        <div slot="pagination">
          <Pagination
            {page}
            {pageSize}
            {currentPageItemCount}
            itemCount={et.length}/>
        </div>
      </TableEThaku>
    </div>
  {:catch error}
    <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col w-full">{error}</div>
  {/await}
</Container>
