<template>
  <section class="app-socials">
    <h2 class="app-socials__title">Deel je ervaring en aankopen!</h2>
    <div class="app-socials__buttons">
      <button
        @click="shareToTwitter"
        class="app-socials__button"
      >
        <app-icon name="twitter" />
        <span class="sr-only">Deel op Twitter</span>
      </button>
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
    }
  }
</script>

<style lang="scss">

</style>
