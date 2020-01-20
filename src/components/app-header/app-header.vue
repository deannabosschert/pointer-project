<template>
  <header class="app-header">
    <div class="app-header__logo-container">
      <nuxt-link to="/">
        <img src="/images/pointer-logo.svg" class="app-header__logo" alt="Logo van Pointer"/>
      </nuxt-link>
    </div>
    <div class="app-header__triangle"></div>
    <div class="app-header__icons">
      <nuxt-link to="/shopping-bag" class="app-header__button app-header__button--shop">
        <app-icon-with-counter
          name="shop_white"
          :amount="shoppingBagItemsQuantity"
          message="Aantal producten in winkelmandje"
        />
      </nuxt-link>
      <button
        @click="toggleMenu"
        class="app-header__button"
      >
        <app-icon
          class="app-header__icon"
          :name="menuIcon"
        />
        <span class="sr-only">{{ menuText }}</span>
      </button>
    </div>
  </header>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { TOGGLE_MENU } from '~/store/mutation-types'

  import AppIcon from '../app-icon/app-icon'
  import AppIconWithCounter from '../app-icon-with-counter/app-icon-with-counter'

  export default {
    components: {
      AppIcon,
      AppIconWithCounter
    },
    computed: {
      ...mapState({
        menuIsOpen: state => state.menuIsOpen
      }),
      ...mapGetters({
        shoppingBagItemsQuantity: 'shop/shoppingBagItemsQuantity'
      }),
      menuText() {
        return this.menuIsOpen ? 'Sluit het menu' : 'Open het menu'
      },
      menuIcon() {
        return this.menuIsOpen ? 'cross_white' : 'menu-icon'
      }
    },
    methods: {
      toggleMenu() {
        return this.menuIsOpen
          ? this.$store.commit(TOGGLE_MENU, { isOpen: false })
          : this.$store.commit(TOGGLE_MENU, { isOpen: true })
      }
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

  .app-header__button--shop {
    display: none;
  }
</style>
