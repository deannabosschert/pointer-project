<template>
  <figure class="app-icon-with-counter">
    <img
      :src="`/icons/${name}.svg`"
      alt=""
    >
    <transition name="fade">
      <figcaption
        v-if="isShown"
        class="app-icon-with-counter__label-container"
      >
        <dl>
          <dt class="sr-only">{{ message }}</dt>
          <dd class="app-icon-with-counter__label">{{ amount }}</dd>
        </dl>
      </figcaption>
    </transition>
  </figure>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      message: {
        type: String,
        default: ''
      },
      amount: {
        type: Number,
        required: true
      }
    },
    computed: {
      isShown() {
        return this.amount > 0;
      }
    }
  }
</script>

<style lang="scss">
  .app-icon-with-counter {
    position: relative;
    margin-right: 5px;
  }

  .app-icon-with-counter__label-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 15px;
    width: 15px;
    top: 0px;
    right: -2px;
    background-color: $color-highlight-yellow;
    border-radius: 50%;
    color: $color-darkest;
    font-family: $font-stack-headings;
    font-size: $font-size-small;
  }
</style>
