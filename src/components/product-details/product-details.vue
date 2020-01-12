<template>
  <div class="product-details">
    <h2>{{ product.naam }}</h2>
    <button
      v-if="amount === 0"
      @click="$emit('add-to-cart-click')"
      class="product-details__button"
    >
      <span class="sr-only">Voeg toe aan winkelmandje</span>
      <app-icon name="plus_black" />
    </button>

    <div
      v-else
      class="product-details__controls"
    >
      <button
        @click="$emit('remove-from-cart-click')"
        class="product-details__button"
      >
        <span class="sr-only">Verwijder één uit winkelmandje</span>
        <app-icon name="min_black" />
      </button>
      <p>{{ amount || 'onbekend' }}</p>
      <button
        @click="$emit('add-to-cart-click')"
        class="product-details__button"
      >
        <span class="sr-only">Voeg één toe aan winkelmandje</span>
        <app-icon name="plus_black" />
      </button>
    </div>
  </div>
</template>

<script>
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
      amount: {
        type: Number,
        default: 0
      }
    },
  }
</script>

<style lang="scss">
  .product-details,
  .product-details__controls {
    display: flex;
  }

  .product-details__button {
    font-size: 1rem;
  }
</style>
