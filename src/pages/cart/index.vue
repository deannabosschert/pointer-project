<template>
  <main class="cart-page">
    <app-cart />
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
  .cart-page {
    padding: $spacing-default $spacing-medium;
  }

  .cart-page .app-cart {
    margin-bottom: $spacing-large;
  }
</style>
