<script>
  import * as LaatijaUtils from '@/utilities/laatija';
  import * as GeoUtils from '@/utilities/geo';
  import * as FormUtils from '@/utilities/form';
  import { navigate } from '@/router/router';
  import {
    laatijat as laatijatStore,
    patevyydet,
    toimintaalueet,
    postinumerot,
    kunnat
  } from '@/stores';

  import Button, { styles as buttonStyles } from '@Component/button';
  import Input from '@Component/input-search';
  import InfoBlock from '@Component/info-block';
  import TableLaatijahaku from '@Component/table-laatijahaku';
  import TableLaatijahakuFilter from '@Component/table-laatijahaku-filter';
  import Container, { styles as containerStyles } from '@Component/container';
  import Spinner from '@Component/spinner';
  import Pagination from '@Component/pagination';
  import Seo from '@Component/seo';

  const delayLaatijat = l =>
    new Promise(resolve => setTimeout(() => resolve(l), 200));

  export let nimihaku = '';
  export let aluehaku = '';
  export let page = 0;
  export let filterPatevyydet = '1,2';

  const pageSize = 10;

  let shownLaatijat = new Promise(() => {});

  $: haetutToimintaalueet = Promise.all([
    Promise.resolve(aluehaku ?? ''),
    $toimintaalueet,
    $kunnat,
    $postinumerot
  ]).then(([...args]) => GeoUtils.findToimintaalueIds(...args));

  $: shownLaatijat = Promise.all([
    Promise.resolve(aluehaku ?? ''),
    Promise.resolve(nimihaku ?? ''),
    $laatijatStore,
    haetutToimintaalueet,
    Promise.resolve(filterPatevyydet)
  ]).then(
    ([aluehaku, nimihaku, laatijat, haetutToimintaalueet, filterPatevyydet]) =>
      LaatijaUtils.laatijatByHakukriteerit(
        aluehaku,
        nimihaku,
        laatijat,
        haetutToimintaalueet,
        filterPatevyydet
      ).sort(
        (a, b) =>
          LaatijaUtils.calculateLaatijaWeight(haetutToimintaalueet, b) -
          LaatijaUtils.calculateLaatijaWeight(haetutToimintaalueet, a)
      )
  );

  const commitSearch = (nimihaku, aluehaku) => {
    const qs = [
      ...(nimihaku ? [['nimihaku', nimihaku].join('=')] : []),
      ...(aluehaku ? [['aluehaku', aluehaku].join('=')] : []),
      ...[['filterPatevyydet', filterPatevyydet].join('=')],
      ...[['page', 0].join('=')]
    ].join('&');
    navigate(`/laatijahaku${qs ? '?' + qs : ''}`);
    haetutToimintaalueet = Promise.all([
      Promise.resolve(aluehaku ?? ''),
      $toimintaalueet,
      $kunnat,
      $postinumerot
    ]).then(([...args]) => GeoUtils.findToimintaalueIds(...args));
  };
</script>

<Seo
  title="Energiatodistusrekisteri - Laatijahaku"
  descriptionSv="Laatijahaku" />

<svelte:window
  on:popstate={_ => {
    haetutToimintaalueet = Promise.all([
      Promise.resolve(aluehaku ?? ''),
      $toimintaalueet,
      $kunnat,
      $postinumerot
    ]).then(([...args]) => GeoUtils.findToimintaalueIds(...args));
  }} />

<Container {...containerStyles.beige}>
  <InfoBlock title="Laatijalla pitää olla pätevyys">
    Energiatodistuksen voi laatia vain siihen pätevöitynyt tekniikan alan
    ammattilainen. He ovat suorittaneet virallisen pätevyystentin. Jos laatijaa
    ei löydy haustamme, hänellä ei ole pätevyyttä todistuksen tekoon.
  </InfoBlock>
</Container>
<Container {...containerStyles.white}>
  <div
    class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto flex flex-col md:flex-row items-center md:items-start">
    <div class="flex flex-col w-full md:w-9/12">
      <form
        on:submit|preventDefault={evt => {
          const fd = FormUtils.deserialize(evt.target);
          commitSearch(fd.nimi, fd.alue);
        }}
        on:reset|preventDefault={_ => commitSearch('', '')}>
        <div class="w-full md:w-11/12">
          <Input label={'Hae nimellä'} name="nimi" value={nimihaku} />
        </div>
        <aside class="font-normal text-xs italic mt-4">
          Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
        </aside>
        <div class="flex">
          <div class="w-full md:w-11/12">
            <Input label="Hae alueella" name="alue" value={aluehaku} />
          </div>
        </div>
        <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
          <Button type={'submit'} {...buttonStyles.green}>Hae</Button>
        </div>
      </form>
    </div>
    <aside
      class="mt-4 md:mt-0 md:w-3/12 md:pl-4 md:border-l-8 border-ashblue text-ashblue italic text-sm">
      Ylempi pätevyystaso vaaditaan kun lämmönsiirron kokonaisenergiankulutuksen
      laskennassa tulee ottaa huomioon rakenteiden lämmönvarausominaisuus ajasta
      riippuvaisenna. Käytännössä näitä kohteita ovat jäähdytetyt
      uudisrakennukset.
    </aside>
  </div>
</Container>

<Container {...containerStyles.white}>
  {#await Promise.all([
    shownLaatijat,
    haetutToimintaalueet,
    $patevyydet,
    Promise.resolve(parseInt(page ?? 0)),
    Promise.resolve(pageSize),
    Promise.resolve(filterPatevyydet)
  ])}
    <div class="flex justify-center">
      <Spinner />
    </div>
  {:then [l, h, patevyydet, page, pageSize, filterPatevyydet]}
    <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col w-full">
      <TableLaatijahaku
        laatijaCount={l.length}
        laatijat={l.slice(page * pageSize, (page + 1) * pageSize)}
        let:currentPageItemCount
        haetutToimintaalueet={h}
        {patevyydet}
        {page}>
        <div slot="filter">
          <TableLaatijahakuFilter
            on:change={evt => navigate(`/laatijahaku?${[...(nimihaku ? [['nimihaku', nimihaku].join('=')] : []), ...(aluehaku ? [['aluehaku', aluehaku].join('=')] : []), ...[['filterPatevyydet', evt.target.value].join('=')], ...[['page', 0].join('=')]].join('&')}`)}
            showPatevyydet={filterPatevyydet}
            {patevyydet} />
        </div>
        <div slot="pagination">
          <Pagination
            {page}
            {pageSize}
            {currentPageItemCount}
            itemCount={l.length}
            queryStringFn={page => `/laatijahaku?${[...(nimihaku ? [['nimihaku', nimihaku].join('=')] : []), ...(aluehaku ? [['aluehaku', aluehaku].join('=')] : []), ...[['filterPatevyydet', filterPatevyydet].join('=')], ...[['page', page].join('=')]].join('&')}`} />
        </div>
      </TableLaatijahaku>
    </div>
  {:catch error}
    <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col w-full">{error}</div>
  {/await}
</Container>
