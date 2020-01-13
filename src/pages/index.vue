<template>
  <main class="shop-page">
    <h1>This is the shop</h1>
    <nuxt-link to="/stats">To stats</nuxt-link>
    <product-list :products="shopItems" />
  </main>
</template>

<script>
  import { mapState } from 'vuex'

  import ProductList from '~/components/product-list/product-list'

  export default {
    components: {
      ProductList
    },
    computed: {
      ...mapState({
        shopItems: state => state.shop.shopItems
      })
    }
  }
</script>
