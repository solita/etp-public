<script>
  import Button, { styles as buttonStyles } from '@Component/button';
  import Input from '@Component/input';
  import InfoBlock from '@Component/info-block';
</script>

<article class="flex flex-col bg-white">
  <InfoBlock
    title="Laatijalla pitää olla pätevyys"
    text="Energiatodistuksen voi laatia vain siihen pätevöitynyt tekniikan alan ammattilainen. He ovat suorittaneet virallisen pätevyystentin. Jos laatijaa ei löydy haustamme, hänellä ei ole pätevyyttä todistuksen tekoon." />
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
        <a class="inline-flex items-center ml-4 text-green" href="/">
          <span class="uppercase font-bold">Lisää hakuehtoja</span>
          <span class="font-icon text-4xl">expand_more</span>
        </a>
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

  <div class="px-16 py-8 flex items-start">Tuloksia</div>
</article>
