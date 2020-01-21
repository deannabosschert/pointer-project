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
    max-width: $layout-medium;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (min-width: $layout-small) {
      justify-content: flex-start;
    }
  }

  .product-list .product-card {
    flex: 0 0 100%;
    margin-bottom: 1rem;

    @media (min-width: $layout-tiny) {
      flex: 0 0 calc(50% - #{$spacing-small})
    }

    @media (min-width: $layout-small) {
      flex: 0 0 calc(33.3333333% - #{$spacing-small})
    }
  }
</style>
