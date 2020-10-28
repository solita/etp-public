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
  import Input from '@Component/input';
  import InfoBlock from '@Component/info-block';
  import TableLaatijahaku from '@Component/table-laatijahaku';
  import Container, { styles as containerStyles } from '@Component/container';
  import Spinner from '@Component/spinner';
  import Seo from '@Component/seo';

  const delayLaatijat = l =>
    new Promise(resolve => setTimeout(() => resolve(l), 200));

  export let nimihaku = '';
  export let aluehaku = '';
  export let page = 0;

  let laatijat = [];
  let shownLaatijat = new Promise(() => {});
  let haetutToimintaalueet = new Set([]);

  Promise.all([$laatijatStore, $toimintaalueet, $postinumerot, $kunnat])
    .then(([l, toimintaalueet, postinumerot, kunnat]) => {
      laatijat = l;
      haetutToimintaalueet = GeoUtils.findToimintaalueIds(
        aluehaku,
        toimintaalueet,
        kunnat,
        postinumerot
      );
      shownLaatijat = delayLaatijat(
        LaatijaUtils.laatijatByHakukriteerit(
          aluehaku,
          nimihaku,
          l,
          haetutToimintaalueet
        )
      );
    })
    .catch(error => (shownLaatijat = Promise.reject(error)));

  const commitSearch = async (nimihaku, aluehaku, laatijat) => {
    const qs = [
      ...(nimihaku ? [['nimihaku', nimihaku].join('=')] : []),
      ...(aluehaku ? [['aluehaku', aluehaku].join('=')] : [])
    ].join('&');
    navigate(`/laatijahaku${qs ? '?' + qs : ''}`);
    const geo = await Promise.all([$toimintaalueet, $kunnat, $postinumerot]);
    haetutToimintaalueet = GeoUtils.findToimintaalueIds(aluehaku, ...geo);
    shownLaatijat = delayLaatijat(
      LaatijaUtils.laatijatByHakukriteerit(
        aluehaku,
        nimihaku,
        laatijat,
        haetutToimintaalueet
      )
    );
  };

  const goToTablePage = event => {
    const pageNum = event.detail;
    const qs = [
      ...(nimihaku ? [['nimihaku', nimihaku].join('=')] : []),
      ...(aluehaku ? [['aluehaku', aluehaku].join('=')] : []),
      ...[['page', pageNum].join('=')]
    ].join('&');
    navigate(`/laatijahaku${qs ? '?' + qs : ''}`);
  };
</script>

<Seo title="Energiatodistusrekisteri - Laatijahaku" descriptionSv="Laatijahaku" />

<svelte:window
  on:popstate={async _ => {
    haetutToimintaalueet = GeoUtils.findToimintaalueIds(aluehaku ?? '', ...(await Promise.all(
        [$toimintaalueet, $kunnat, $postinumerot]
      )));
    shownLaatijat = delayLaatijat(LaatijaUtils.laatijatByHakukriteerit(aluehaku, nimihaku ?? '', laatijat, haetutToimintaalueet));
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
          commitSearch(fd.nimi, fd.alue, laatijat);
        }}
        on:reset|preventDefault={_ => commitSearch('', '', laatijat)}>
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
  {#await Promise.all([shownLaatijat, $patevyydet])}
    <div class="flex justify-center">
      <Spinner />
    </div>
  {:then [l, patevyydet]}
    <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col w-full">
      <TableLaatijahaku
        laatijat={l}
        {haetutToimintaalueet}
        {patevyydet}
        {page}
        on:updatePage={goToTablePage} />
    </div>
  {:catch error}
    <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col w-full">{error}</div>
  {/await}
</Container>
