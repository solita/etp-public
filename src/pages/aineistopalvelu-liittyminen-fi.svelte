<script>
  import Container, { styles as containerStyles } from '@Component/container';
  import InfoBlock from '@Component/info-block';
</script>

<style>
  ol {
    list-style: decimal;
    @apply my-4;
  }
  ul {
    list-style: disc;
    @apply my-4;
  }
  h2 {
    @apply mb-2;
  }
  h3 {
    @apply underline;
  }
  a {
    @apply underline text-darkgreen;
  }
  p {
    @apply mb-4;
  }
</style>

<Container {...containerStyles.beige}>
  <InfoBlock title={'Energiatodistusrekisterin aineistopalvelu'}
    >Energiatodistusrekisterin aineistopalvelu on tarkoitettu
    energiatodistustietojen siirtoon rajapinnan kautta rekisteristä
    aineistopalvelun käyttäjälle.</InfoBlock>
</Container>

<Container {...containerStyles.white}>
  <div class="px-4 lg:px-8 xl:px-16 pt-8 pb-4 mx-auto">
    <p>
      Energiatodistusrekisterin aineistopalvelu käsittää kolme eri
      tietoaineistoa:
    </p>
    <ul class="ml-6">
      <li>suppea henkilötietoja sisältävä aineisto</li>
      <li>laaja henkilötietoja sisältävä aineisto</li>
      <li>laaja ei henkilötietoja sisältävä aineisto</li>
    </ul>

    <h2>Aineistokuvaukset</h2>

    <p>
      Alla lyhyesti tietoaineistojen kuvaukset. Tarkemmat kenttäkohtaiset
      aineistokuvaukset löytyvät Githubista.
    </p>

    <h3>Suppea henkilötietoja sisältävä aineisto</h3>
    <p>
      Sisältää voimassa olevien energiatodistusten tietoja
      energiatodistusrekisteristä toukokuusta 2015 lähtien. Tiedot käsittävät
      energiatodistuksen yksilöiviä tietoja, sekä energiatodistuslaskennasta
      saatavia tuloksia suppeasti. Sisältää myös tiedot 1- ja 2- asunnon
      rakennuksista.
    </p>
    <p>
      Soveltuu esimerkiksi lainoja ja vakuuksia antavien tahojen käyttöön,
      joilla on oikeus käsitellä henkilötietoja.
    </p>

    <h3>Laaja, henkilötietoja sisältävä aineisto</h3>
    <p>
      Sisältää energiatodistusten tietoja energiatodistusrekisteristä
      toukokuusta 2015 lähtien. Tiedot käsittävät laajasti
      energiatodistuslaskennassa käytettäviä rakennuksen tietoja ja
      laskentatuloksia. Sisältää myös tiedot 1- ja 2- asunnon rakennuksista.
    </p>

    <p>
      Soveltuu esimerkiksi tutkimuskäyttöön tahoille, joilla on oikeus käsitellä
      henkilötietoja.
    </p>

    <h3>Laaja, ei henkilötietoja sisältävä aineisto</h3>

    <p>
      Sisältää energiatodistusten tietoja energiatodistusrekisteristä
      toukokuusta 2015 lähtien. Tiedot käsittävät laajasti
      energiatodistuslaskennassa käytettäviä rakennuksen tietoja ja
      laskentatuloksia.
    </p>
    <p>
      Tiedot eivät sisällä henkilötietoja, koska laatijan tiedot,
      todistustunnus, rakennuksen yksilöivät tiedot (nimi, katuosoite, pysyvä
      rakennustunnus) ovat poistettu. Osoitetiedoista postinumero ja
      -toimipaikka on poistettu, jos kyseisellä postinumeroalueella löytyy
      vähemmän kuin 4 rakennusta rekisteristä.
    </p>
    <p>Soveltuu esimerkiksi tutkimuskäyttöön.</p>

    <h2>Maksullisuus</h2>

    <p>
      Aineistopalveluun liittymisestä peritään liittymismaksu sekä vuosimaksu
      hinnastomme mukaisesti. Vuosimaksua ei makseta liittymisvuodelta, sillä
      liittymismaksu kattaa kuluvan vuoden vuosimaksun. Vuosimaksun laskutus
      tapahtuu aina kalenterivuoden alussa.
    </p>
    <p>
      Aineistopalvelu voidaan myös avata kertaluonteisesti esim.
      tutkimuskäyttöön, jolloin perimme kertamaksun hinnastomme mukaisesti.
    </p>
    <p>
      Ilman rajapintaa toteutettavat tietopyynnöt käsittelemme tapauskohtaisesti
      ja veloitamme niistä tuntihinnastomme mukaisesti.
    </p>
    <p>
      Hinnastomme löydät <a
        href="https://www.ara.fi/fi-FI/ARA/Yhteystiedot/Yhteystiedot(477)"
        >ARAn sivuilta</a
      >.
    </p>

    <h2>Aineistopalveluun liittyminen</h2>
    <ol class="ml-6">
      <li>
        Täytä hakemus (löytyy energiatodistusrekisteristä) sekä tutustu
        sopimusluonnokseen
      </li>
      <li>
        Lähetä hakemus sähköpostitse (kirjaamo.ara@ara.fi), jos hakemus sisältää
        salassa pidettävää tietoa, niin lähetä turvaposti (ohje löytyy <a
          href="https://www.ara.fi/fi-FI/ARA/Yhteystiedot/Yhteystiedot(477)"
          >ARAn sivuilta</a
        >)
      </li>
      <li>
        Odota tietolupapäätöstä, joka toimitetaan hakemuksessa ilmoitetulle
        yhteyshenkilölle ja hakijan viralliselle edustajalle sähköpostitse. Jos
        tietolupapäätös on myönteinen, hakijan viralliselle edustajalle
        toimitetaan myös aineistopalvelua koskeva sopimus allekirjoitettavaksi.
      </li>
      <li>
        Sopimuksen allekirjoittamisen jälkeen toimitamme API-keyn
        (rajapinta-avain) turvapostilla hakemuksessa ilmoitetulle tekniselle
        yhteyshenkilölle.
      </li>
      <li>
        Aineistopalvelu on käytettävissäsi. Ks. tarkemmat ohjeet rajapintaan
        liittymisestä <a
          href="https://github.com/solita/etp-core/wiki/Aineistopalvelu"
          >Githubissa</a
        >.
      </li>
    </ol>
  </div>
</Container>
