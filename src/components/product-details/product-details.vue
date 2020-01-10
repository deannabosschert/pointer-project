<template>
  <div class="product-details">
    <h2>{{ product.naam }}</h2>
    <button
      @click="$emit('add-to-cart-click')"
      class="product-details__button"
    >
      <span class="sr-only">Voeg toe aan winkelmandje</span>
      <app-icon name="plus" />
    </button>

    <div
      v-if="amount > 0"
      class="product-details__controls"
    >
      <button
        @click="$emit('remove-from-cart-click')"
        class="product-details__button"
      >
        <span class="sr-only">Verwijder één uit winkelmandje</span>
        <app-icon name="min" />
      </button>
      <p>{{ amount || 'onbekend' }}</p>
      <button
        @click="$emit('add-to-cart-click')"
        class="product-details__button"
      >
        <span class="sr-only">Voeg één toe aan winkelmandje</span>
        <app-icon name="plus" />
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import AppIcon from '../app-icon/app-icon'

  export default {
    components: {
      AppIcon
    },
    props: {
      product: {
        type: Object,
        required: true
      },
    },
    computed: {
      ...mapState({
        shoppingBag: state => state.shop.shoppingBag,
      }),
      amount() {
        const foundProduct = this.shoppingBag.find(product => {
          return product.naam === this.product.naam
        })

        return foundProduct && foundProduct.amount
      }
    }
  }
</script>

<style lang="scss">
  .product-details,
  .product-details__controls {
    display: flex;
  }
</style>
