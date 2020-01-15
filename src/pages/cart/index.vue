<template>
  <main class="cart-page">
    <app-cart :selectedCompany="selectedCareCompany" />
    <nuxt-link
      to="/stats"
      class="button"
    >
      Check de cijfers
    </nuxt-link>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'

  import AppCart from '~/components/app-cart/app-cart'

  export default {
    components: {
      AppCart
    },
    computed: {
      ...mapGetters({
        selectedCareCompany: 'selectedCareCompany'
      })
    }
  }
</script>

<style lang="scss">

</style>
