<template>
  <header class="app-header">
    <div class="app-header__logo-container">
      <nuxt-link to="/">
        <img src="/images/pointer-logo.svg" class="app-header__logo" alt="Logo van Pointer"/>
      </nuxt-link>
    </div>
    <div class="app-header__triangle"></div>
    <div class="app-header__icons">
      <button class="app-header__button app-header__button--search">
        <app-icon
          class="app-header__icon"
          name="search-icon"
        />
        <span class="sr-only">Zoek een zorginstelling</span>
      </button>
      <button class="app-header__button app-header__button--shop">
        <app-icon-with-counter
          name="shop_white"
          :amount="shoppingBagItemsQuantity"
          message="Aantal producten in winkelmandje"
        />
      </button>
      <button class="app-header__button">
        <app-icon
          class="app-header__icon"
          name="menu-icon"
        />
        <span class="sr-only">Open het menu</span>
      </button>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'

  import AppIcon from '../app-icon/app-icon'
  import AppIconWithCounter from '../app-icon-with-counter/app-icon-with-counter'

  export default {
    components: {
      AppIcon,
      AppIconWithCounter
    },
    computed: {
      ...mapGetters({
        shoppingBagItemsQuantity: 'shop/shoppingBagItemsQuantity'
      })
    }
  }
</script>

<style lang="scss">
  $app-header-height: 60px;

  .app-header {
    height: $app-header-height;
    background-color: $color-darkest;
    display: flex;
    margin-bottom: $spacing-medium;
  }

  .app-header__logo-container {
    background-color: $color-dimmed-purple;
    flex: 0 0 100px;
    padding: 0 0.625rem;
    display: flex;
    align-items: center;
  }

  .app-header__logo {
    width: 100%;
  }

  .app-header__triangle {
    width: 0;
    height: 0;
    border-bottom: $app-header-height solid $color-highlight-yellow;
    border-right: $app-header-height solid transparent;
  }

  .app-header__icons {
    display: flex;
    margin-left: auto;
    padding: 1rem;
  }

  .app-header__icon {
    width: 1em;
    height: 1em;
    font-size: 1.725rem;
  }

  .app-header__button {
    margin-left: 0.625rem;
  }

  .app-header__button--search {
    display: block;
  }

  .app-header__button--shop {
    display: none;
  }
</style>
