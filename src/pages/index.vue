<template>
  <main class="shop-page">
    <h1>This is the shop</h1>
    <nuxt-link to="/stats">To stats</nuxt-link>
    <div class="products-view">
      <product-card
        v-for="product in shopItems"
        :product="product"
        :key="product.naam"
      />
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex'

  import ProductCard from '~/components/product-card/product-card'

  export default {
    components: {
      ProductCard
    },
    computed: {
      ...mapState({
        shopItems: state => state.shop.shopItems
      })
    }
  }
</script>

<style lang="scss">
  .products-view {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .products-view .product-card {
    flex: 0 0 100%;
    margin-bottom: 1rem;
  }
</style>
