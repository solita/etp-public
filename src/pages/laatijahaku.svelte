<script>
  import Button, { styles as buttonStyles } from '@Component/button';
  import Input from '@Component/input';
  import InfoBlock from '@Component/info-block';
  import TableLaatijahaku from '@Component/table-laatijahaku';

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

<article class="flex flex-col bg-white">
  <InfoBlock title="Laatijalla pitää olla pätevyys">
    Energiatodistuksen voi laatia vain siihen pätevöitynyt tekniikan alan
    ammattilainen. He ovat suorittaneet virallisen pätevyystentin. Jos laatijaa
    ei löydy haustamme, hänellä ei ole pätevyyttä todistuksen tekoon.
  </InfoBlock>
  <div class="px-16 py-8 flex items-start">
    <div class="flex flex-col w-9/12">
      <div class="w-1/2">
        <Input label={'Hae nimellä'} value={''} />
      </div>
      <aside class="font-normal text-xs italic mt-4">
        Voit hakea maakunnalla, kunnalla, postinumerolla tai -toimipaikalla.
      </aside>
      <div class="flex">
        <div class="w-1/2">
          <Input label="Hae alueella" value={''} />
        </div>
      </div>
      <div class="mt-2">
        <Button {...buttonStyles.green}>Hae</Button>
        <Button {...buttonStyles.green}>Tyhjennä hakuehdot</Button>
      </div>
    </div>
    <aside
      class="w-3/12 pl-4 border-l-8 border-ashblue text-ashblue italic text-sm">
      Ylempi pätevyystaso vaaditaan kun lämmönsiirron kokonaisenergiankulutuksen
      laskennassa tulee ottaa huomioon rakenteiden lämmönvarausominaisuus ajasta
      riippuvaisenna. Käytännössä näitä kohteita ovat jäähdytetyt
      uudisrakennukset.
    </aside>
  </div>

  <div class="px-16 py-8 flex flex-col items-start">
    <h2>Tuloksia</h2>
    <TableLaatijahaku laatijat={demoData} />
  </div>
</article>
