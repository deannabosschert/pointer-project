<template>
  <main class="shop-page">
    <h1 class="sr-only">Shop met de winst</h1>
    <p
      v-if="selectedData"
      class="shop-page__intro-text"
    >
      Wat koop jij met de winst van {{ selectedData.naam }}?
    </p>
    <p class="shop-page__budget" v-if="selectedData">
      <span class="shop-page__budget-intro">Jouw budget:</span>
      <span class="shop-page__budget-budget">€{{ selectedData.winst.toLocaleString() }}</span>
    </p>
    <product-list :products="shopItems" />
    <nuxt-link to="/stats">Bekijk de cijfers</nuxt-link>
  </main>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import AppCart from '~/components/app-cart/app-cart'
  import ProductList from '~/components/product-list/product-list'

  export default {
    components: {
      AppCart,
      ProductList
    },
    computed: {
      ...mapGetters({
        selectedData: 'selectedData'
      }),
      ...mapState({
        shopItems: state => state.shop.shopItems
      })
    }
  }
</script>

<style lang="scss">
  .shop-page {
    padding: $spacing-default $spacing-medium;
  }

  .shop-page__intro-text {
    margin-bottom: $spacing-small;
    text-align: center;
  }

  .shop-page__budget {
    display: flex;
    flex-direction: column;
    margin-bottom: $spacing-default;
    text-align: center;
    font-family: $font-stack-headings;
  }

  .shop-page__budget-intro {
    font-size: $font-size-medium;
  }

  .shop-page__budget-budget {
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
  }
</style>
