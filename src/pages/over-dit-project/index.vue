<template>
  <main class="about-page">
    <article>
      <section>
        <h1 class="about-page__title">Over dit project</h1>
        <p><i>Shoppen met zorggeld</i> is opgezet door vier studenten van de opleiding Communication and Multimedia Design van de Hogeschool van Amsterdam in opdracht van <a href="https://pointer.kro-ncrv.nl/">Pointer</a>.</p>
        <ul class="about-page__list">
          <li><a href="https://www.linkedin.com/in/lisacbot/">Lisa Bot</a> (design)</li>
          <li><a href="https://www.linkedin.com/in/lizz-moraal-b7b01662/">Lizz Moraal</a> (design)</li>
          <li><a href="https://www.linkedin.com/in/deannabosschert/">Deanna Bosschert</a> (development)</li>
          <li><a href="https://www.linkedin.com/in/kris-kuiper-0b6897a2/">Kris Kuiper</a> (tech-lead / development)</li>
        </ul>
      </section>
      <section>
        <h2 class="about-page__title">Opdrachtomschrijving</h2>
        <p>De opdrachtomschrijving van dit project luidde als volgt:</p>
        <blockquote class="about-page__quote">
          “Maak een interactieve datavisualisatie waarmee je door de winstcijfers van de zorginstellingen kunt zoeken zodat Pointer nieuwe verhalen kan vinden en/of lezers organisaties kunnen controleren.”
        </blockquote>
      </section>
    </article>
  </main>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  .about-page {
    display: flex;
    flex-direction: column;
    padding: $spacing-default $spacing-medium;
  }

  .about-page section:not(:last-child) {
    margin-bottom: $spacing-large;
  }

  .about-page__title {
    margin-bottom: $spacing-default;
  }

  .about-page i {
    font-style: italic;
  }

  .about-page__list {
    margin: $spacing-small 0;
    padding-left: $spacing-default;
    line-height: 1.25;
    list-style: square;
  }

  .about-page__quote {
    margin: $spacing-default 0;
    border-left: 2px solid $color-darkest;
    padding-left: $spacing-default;
    font-style: italic;
    text-indent: $spacing-default;
  }
</style>
