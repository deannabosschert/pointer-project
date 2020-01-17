<template>
  <div class="product-card">
    <figure class="product-card__image-container">
      <fixed-ratio :height="1" :width="1">
        <img
          :src="product.mediaLink"
          :alt="product.naam"
          class="product-card__image"
          :class="{ 'product-card__image--is-blurred': !hasEnoughBudget }"
        >
      </fixed-ratio>
      <figcaption class="product-card__price">
        <dl>
          <dt class="sr-only">Prijs:</dt>
          <dd>{{ formattedPrice }}</dd>
        </dl>
      </figcaption>
    </figure>
    <product-details
      :product="product"
      :amount="amount"
      :budget="budget"
      @add-to-cart-click="addToShoppingBag"
      @remove-from-cart-click="removeFromShoppingBag"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import FixedRatio from '../fixed-ratio/fixed-ratio'
  import ProductDetails from '../product-details/product-details'

  export default {
    components: {
      FixedRatio,
      ProductDetails
    },
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState({
        shoppingBag: state => state.shop.shoppingBag
      }),
      ...mapGetters({
        budget: 'budget'
      }),
      formattedPrice() {
        return `€ ${this.product.prijs.toLocaleString()}`
      },
      amount() {
        return this.shoppingBag[this.product.naam] &&
          this.shoppingBag[this.product.naam].amount || 0
      },
      hasEnoughBudget() {
        return this.budget > this.product.prijs
      }
    },
    methods: {
      addToShoppingBag() {
        this.$store.dispatch('shop/addToShoppingBag', {
          item: this.product,
          amount: this.amount
        })
      },
      removeFromShoppingBag() {
        this.$store.dispatch('shop/removeFromShoppingBag', {
          item: this.product,
          amount: this.amount
        })
      }
    }
  }
</script>

<style lang="scss">
  .product-card {
    overflow: hidden;
  }

  .product-card__image-container {
    width: 100%;
    position: relative;
    background: $color-white;
  }

  .product-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: $color-gray;
  }

  .product-card__image--is-blurred {
    filter: blur(3px);
  }

  .product-card__price {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: $spacing-tiny $spacing-default;
    color: $color-highlight-purple;
    font-weight: $font-weight-bold;
    background: $color-gray;
  }
</style>
