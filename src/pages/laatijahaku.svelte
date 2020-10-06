<script>
  import Button, { styles as buttonStyles } from '@Component/button';
  import Input from '@Component/input';
  import InfoBlock from '@Component/info-block';
  import TableLaatijahaku from '@Component/table-laatijahaku';
  import Container, { styles as containerStyles } from '@Component/container';

  const demoData = [
    {
      nimi: 'Teemu Testaaja',
      patevyys: 'Perustaso',
      alue: 'Pirkanmaa',
      postinum: '33200 Tampere',
      link: 'google.com',
      email: 'test@email.fi',
      puh: '050 555 5555'
    },
    {
      nimi: 'Testi Tamminen',
      patevyys: 'Perustaso',
      alue: 'Pirkanmaa',
      postinum: '33200 Tampere',
      link: 'google.com',
      email: 'test@email.fi',
      puh: '050 555 5555'
    },
    {
      nimi: 'Tarja Testeri',
      patevyys: 'Perustaso',
      alue: 'Pirkanmaa',
      postinum: '33200 Tampere',
      link: 'google.com',
      email: 'test@email.fi',
      puh: '050 555 5555'
    },
    {
      nimi: 'Tapio Testi',
      patevyys: 'Perustaso',
      alue: 'Pirkanmaa',
      postinum: '33200 Tampere',
      link: 'google.com',
      email: 'test@email.fi',
      puh: '050 555 5555'
    }
  ];
</script>

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
      <div class="w-full md:w-11/12">
        <Input label={'Hae nimellä'} value={''} />
      </div>
      <aside class="font-normal text-xs italic mt-4">
        Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
      </aside>
      <div class="flex">
        <div class="w-full md:w-11/12">
          <Input label="Hae alueella" value={''} />
        </div>
      </div>
      <div class="w-full md:w-11/12 mt-4 flex flex-col sm:flex-row">
        <Button {...buttonStyles.green}>Hae</Button>
        <Button {...buttonStyles.green}>Tyhjennä hakuehdot</Button>
      </div>
    </div>
    <aside
      class="mt-4 md:mt-0 md:w-3/12 lg:pl-4 border-t-4 md:border-t-0 md:border-l-8 border-ashblue text-ashblue italic text-sm">
      Ylempi pätevyystaso vaaditaan kun lämmönsiirron kokonaisenergiankulutuksen
      laskennassa tulee ottaa huomioon rakenteiden lämmönvarausominaisuus ajasta
      riippuvaisenna. Käytännössä näitä kohteita ovat jäähdytetyt
      uudisrakennukset.
    </aside>
  </div>

  <div class="px-3 lg:px-8 xl:px-16 pb-8 flex flex-col intems-center w-full">
    <h2>Tuloksia</h2>
    <TableLaatijahaku laatijat={demoData} />
  </div>
</Container>
