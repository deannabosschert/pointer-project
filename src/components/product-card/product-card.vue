<template>
  <div class="product-card">
    <figure class="product-card__image-container">
      <fixed-ratio :height="1" :width="1">
        <img
          :src="product.mediaLink"
          :alt="product.naam"
          class="product-card__image"
        >
      </fixed-ratio>
      <figcaption class="product-card__price">
        <dl>
          <dt class="sr-only">Prijs:</dt>
          <dd>{{ product.prijs }}</dd>
        </dl>
      </figcaption>
    </figure>
    <product-details :product="product" />
  </div>
</template>

<script>
  import FixedRatio from '../fixed-ratio/fixed-ratio'
  import ProductDetails from '../product-details/product-details'

  export default {
    components: {
      AppIcon,
      ProductDetails
    },
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .product-card__image-container {
    width: 100%;
  }

  .product-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: $color-gray;
  }
</style>
