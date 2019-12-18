<template>
  <figure class="app-icon-with-counter">
    <img
      :src="`~/assets/icons/${name}`"
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

<style>
  .app-icon-with-counter {
    position: relative;
    margin-right: 5px;
  }

  .app-icon-with-counter__label-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--color-lightest);
    border-radius: 50%;
    height: 20px;
    width: 20px;

  }
</style>
