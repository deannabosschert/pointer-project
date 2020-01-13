<template>
  <div class="product-list">
    <product-card
      v-for="product in products"
      :product="product"
      :key="product.naam"
    />
  </div>
</template>

<script>
  import ProductCard from '../product-card/product-card'

  export default {
    components: {
      ProductCard
    },
    props: {
      products: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .product-list .product-card {
    flex: 0 0 100%;
    margin-bottom: 1rem;
  }
</style>
