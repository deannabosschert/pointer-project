<template>
  <section class="app-socials">
    <div class="app-socials__intro">
      <p class="app-socials__intro-text">Meer mensen wakker schudden?</p>
      <h2 class="app-socials__title">Deel jouw aankopen!</h2>
    </div>
    <div class="app-socials__buttons">
      <a
        :href="twitterLink"
        target="_blank"
        class="app-socials__button"
      >
        <app-icon name="twitter_purple" />
        <span class="sr-only">Deel op Twitter</span>
      </a>
      <a
        :href="facebookLink"
        target="_blank"
        class="app-socials__button"
      >
        <app-icon name="facebook_purple" />
        <span class="sr-only">Deel op Facebook</span>
      </a>
    </div>
  </section>
</template>

<script>
  import AppIcon from '../app-icon/app-icon'

  export default {
    components: {
      AppIcon
    },
    props: {
      content: {
        type: Object,
        default: null
      }
    },
    computed: {
      twitterLink() {
        // TODO: add text with link to our site

        return `https://twitter.com/intent/tweet`
      },
      facebookLink() {
        return `https://www.facebook.com/sharer/sharer.php?u=example.org`
      }
    },
  }
</script>

<style lang="scss">
  .app-socials {
    display: flex;
    align-items: center;
  }

  .app-socials__intro {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    flex-direction:column;
    margin-right: $spacing-small;
  }

  .app-socials__intro-text {
    font-family: $font-stack-headings;
    line-height: 1.25;
  }

  .app-socials__title {
    font-size: $font-size-default;
    font-weight: $font-weight-default;
    line-height: 1.25;
  }

  .app-socials__buttons {
    display: flex;
    justify-content: flex-end;
  }

  .app-socials__button {
    font-size: 60px;
    margin-right: $spacing-tiny;
    display: flex;
    align-items: center;
  }

  .app-socials__buttons .app-socials__button:last-child {
    margin-right: 0;
  }
</style>
