<template>
  <section class="app-socials">
    <h2 class="app-socials__title">Deel je ervaring en aankopen!</h2>
    <div class="app-socials__buttons">
      <a
        class="twitter-share-button"
        :href="twitterLink"
      >
        <app-icon name="facebook" />
        <span>Deel op Twitter</span>
      </a>
      <button
        @click="shareToFacebook"
        class="app-socials__button"
      >
        <app-icon name="facebook" />
        <span class="sr-only">Deel op Facebook</span>
      </button>
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
    },
    methods: {
      shareToTwitter() {
        console.log('sharing to twitter')
      },
      shareToFacebook() {
        // TODO: find a solid FB solution

        console.log('sharing to facebook')
      }
    }
  }
</script>

<style lang="scss">

</style>
