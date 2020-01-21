<template>
  <main class="cart-page">
    <app-cart />
    <nuxt-link
      to="/stats"
      class="button"
    >
      Waar komt de winst vandaan?
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
    },
    head() {
      return {
        htmlAttrs: {
          class: 'is-cart-page'
        }
      }
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

  .is-cart-page .app-header__button--search {
    display: none;
  }

  .is-cart-page .app-header__button--shop {
    display: block;
  }
</style>
