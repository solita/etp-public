<script>
  import EtHakuImage from '@Asset/ethaku.jpg';
  import LaatijaHakuImage from '@Asset/laatijahaku.jpg';
  import ETMalli from '@Asset/energiatodistusmalli_2018.pdf';

  import BorderImage from '@Component/border-image';

  import Hero from '@Component/hero';
  import Button, { styles as buttonStyles } from '@Component/button';
  import ButtonLink from '@Component/buttonlink';
  import Input from '@Component/input-search';
  import Container, { styles as containerStyles } from '@Component/container';

  import Seo from '@Component/seo';

  import { _ } from '@Localization/localization';
</script>

<style>
  h3 {
    @apply text-green uppercase tracking-wider font-bold;
  }
</style>

<Seo
  title="Energiatodistusrekisterin kotisivu"
  descriptionFi="Energiatodistusrekisterin kotisivu" />

<Hero />

<Container {...containerStyles.beige}>
  <article class="flex pb-16 px-2 sm:px-16">
    <div class="flex sm:-mx-16 flex-col lg:flex-row">
      <section
        class="lg:w-1/2 justify-between sm:px-16 flex flex-col flex-auto">
        <div class="flex justify-center lg:justify-start">
          <BorderImage src={EtHakuImage} />
        </div>
        <div>
          <h2 class="mb-4">{$_('HOME_ENERGIATODISTUSHAKU')}</h2>
          <p>{$_('HOME_ENERGIATODISTUSHAKU_KUVAUS')}</p>
        </div>
        <div class="flex flex-col items-start -my-4">
          <strong class="block py-4">
            {$_('HOME_ENERGIATODISTUSHAKU_TITLE')}
          </strong>
          <Input
            label={$_('HOME_ENERGIATODISTUSHAKU_TODISTUSTUNNUKSELLA')}
            value={''} />
          <aside class="italic text-sm font-normal mt-4">
            {$_('HOME_ENERGIATODISTUSHAKU_ASIDE')}
          </aside>
          <Input label={$_('HOME_ENERGIATODISTUSHAKU_ALUEELLA')} value={''} />
          <div class="mt-4">
            <Button {...buttonStyles.green}>{$_('HAE')}</Button>
          </div>
        </div>
      </section>
      <section
        class="lg:w-1/2 justify-between sm:px-16 flex flex-col flex-auto mt-16
        lg:mt-0">
        <div class="flex justify-center lg:justify-start">
          <BorderImage src={LaatijaHakuImage} />
        </div>
        <div>
          <h2 class="mb-4">{$_('HOME_LAATIJAHAKU')}</h2>
          <p>{$_('HOME_LAATIJAHAKU_KUVAUS')}</p>
        </div>
        <div class="flex flex-col items-start -my-4">
          <strong class="block py-4">{$_('HOME_LAATIJAHAKU_TITLE')}</strong>
          <Input label={$_('HOME_LAATIJAHAKU_NIMELLA')} value={''} />
          <aside class="italic text-sm font-normal mt-4">
            {$_('HOME_LAATIJAHAKU_ASIDE')}
          </aside>
          <Input label={$_('HOME_LAATIJAHAKU_ALUEELLA')} value={''} />
          <div class="mt-4">
            <Button {...buttonStyles.green}>{$_('HAE')}</Button>
          </div>
        </div>
      </section>
    </div>
  </article>
</Container>
<Container {...containerStyles.ashbluewhite}>
  <article class="flex lg:flex-row flex-col">
    <section
      class="text-white bg-ashblue lg:w-1/3 py-4 sm:py-16 px-2 sm:px-16 lg:pr-4">
      <span class="font-icon text-6xl">info</span>
      <h2 class="mb-4 text-white">{$_('INFO_TITLE')}</h2>
      <p>{$_('INFO_KUVAUS')}</p>
      <div class="mt-4">
        <ButtonLink {...buttonStyles.white}
        href={ETMalli}
        target="_blank">
          {$_('INFO_ENERGIATODISTUSMALLI')}
        </ButtonLink>
      </div>
    </section>
    <section class="bg-white lg:w-2/3 lg:pl-8 px-2 sm:px-16 py-4 sm:py-16">
      <h2 class="mb-4 text-ashblue text-lg">{$_('LISATIETOA_TITLE')}</h2>
      <div class="flex -mx-4 flex-col md:flex-row -my-4 md:my-0">
        <section class="px-4 md:w-1/2 py-4 md:py-0">
          <h3 class="mb-4">{$_('LISATIETOA_MOTIVAN_PALVELUT')}</h3>
          <div class="flex flex-col -my-2">
            <div class="py-2">
              <strong>{$_('LISATIETOA_KULUTTAJALLE')}</strong>
              <ul>
                <li>{$_('LISATIETOA_ENERGIATODISTUS')}</li>
                <li>{$_('LISATIETOA_LUKEMINEN')}</li>
                <li>{$_('LISATIETOA_TARVE')}</li>
                <li>{$_('LISATIETOA_FAQ')}</li>
              </ul>
            </div>
            <div class="py-2">
              <strong>{$_('LISATIETOA_AMMATTILAISILLE')}</strong>
              <ul>
                <li>{$_('LISATIETOA_LAATIJOILLE')}</li>
                <li>{$_('LISATIETOA_PATEVYYS')}</li>
              </ul>
            </div>
            <a href="/" class="block py-2 underline text-green">
              {$_('LISATIETOA_MOTIVA_LINKKI')}
            </a>
          </div>
        </section>
        <section class="px-4 md:w-1/2 py-4 md:py-0">
          <h3 class="mb-4">{$_('LISATIETOA_TILASTOT')}</h3>
          <div class="flex flex-col -my-2">
            <p class="block py-2">{$_('LISATIETOA_ARAN_JULKAISUT')}</p>
            <a href="/" class="block py-2 underline text-green">
              {$_('LISATIETOA_TILASTOT_LINKKI')}
            </a>
          </div>
        </section>
      </div>
    </section>
  </article>
</Container>
