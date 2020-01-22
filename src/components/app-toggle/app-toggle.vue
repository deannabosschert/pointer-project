<template>
  <form class="app-toggle" @change="onChange">
    <input
      type="radio"
      id="compare-profit-input"
      class="app-toggle__radio off-screen"
      name="app-toggle-input"
      value="compare"
      checked
    >
    <label
      for="compare-profit-input"
      class="app-toggle__label"
    >
      vergelijk omzet
    </label>
    <input
      type="radio"
      id="see-profit-input"
      class="app-toggle__radio off-screen"
      name="app-toggle-input"
      value="see"
    >
    <label
      for="see-profit-input"
      class="app-toggle__label"
    >
      verdeling omzet
    </label>
  </form>
</template>

<script>
  export default {
    methods: {
      onChange(event) {
        if (event.target.value === 'compare') {
          return this.$emit('compare-click')
        }

        return this.$emit('see-click')
      }
    }
  }
</script>

<style lang="scss">
  $app-toggle-border-radius: 10px;
  $app-toggle-label-border-radius: 7px;

  .app-toggle {
    display: flex;
    padding: $spacing-tiny;
    border-radius: $app-toggle-border-radius;
    background: $color-white;
  }

  .app-toggle__label {
    flex: 0 0 50%;
    padding: $spacing-small 0;
    border-radius: $app-toggle-label-border-radius;
    background: $color-white;
    text-align: center;
  }

  .app-toggle__radio:checked + .app-toggle__label {
    background: $color-highlight-yellow;
  }
</style>
