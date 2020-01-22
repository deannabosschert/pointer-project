<template>
  <nav
    v-if="menuIsOpen"
    class="app-menu"
  >
    <ul
      class="app-menu__list"
      ref="app-menu-list"
    >
      <li class="app-menu__item">
        <nuxt-link
          to="/over-dit-project"
          class="app-menu__link"
        >
          Over dit project
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'
  import { TOGGLE_MENU } from '~/store/mutation-types'

  export default {
    computed: {
      ...mapState({
        menuIsOpen: state => state.menuIsOpen
      })
    },
    watch: {
      $route() {
        if (this.menuIsOpen) {
          this.$store.commit(TOGGLE_MENU, { isOpen: false })
        }
      }
    }
  }
</script>

<style lang="scss">
  $app-header-height: 60px;

  .app-menu {
    position: fixed;
    top: $app-header-height;
    left: 0;
    width: 100%;
    min-height: calc(100% - #{$app-header-height});
    z-index: 99;
    overflow-y: scroll;
    background: $color-darkest;
    text-align: center;
  }

  .app-menu__list {
    margin-top: $spacing-large;
  }

  .app-menu__link {
    display: block;
    padding: $spacing-small;
    text-decoration: none;
    color: $color-lightest;
    font-size: $font-size-medium;
  }
</style>
