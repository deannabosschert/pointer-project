<template>
  <main>
    <h1>Pointer! Homepage</h1>
    <nuxt-link to="/shop">To the shop</nuxt-link>
  </main>
</template>

<script>
import data from '../static/data'

export default {
  created() {
    console.log(data)
  }
}
</script>

<style lang="scss">

</style>
