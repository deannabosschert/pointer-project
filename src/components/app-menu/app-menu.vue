<template>
  <nav class="app-menu">
    <ul
      class="app-menu__list"
      ref="app-menu-list"
    >
      <li class="app-menu__item">
        <nuxt-link
          to="/about"
          class="app-menu__link"
        >
          Over dit project
        </nuxt-link>
      </li>
      <li class="app-menu__item">
        <nuxt-link
          to="/privacy-policy"
          class="app-menu__link"
        >
          Privacy policy
        </nuxt-link>
      </li>
      <li class="app-menu__item">
        <nuxt-link
          to="/terms-and-conditions"
          class="app-menu__link"
        >
          Algemene voorwaarden
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  $app-header-height: 60px;

  .app-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: calc(100vh - #{$app-header-height});
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
