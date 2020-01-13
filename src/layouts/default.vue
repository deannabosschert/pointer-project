<template>
  <div class="layout">
    <app-header />
    <nuxt />
  </div>
</template>

<script>
  import AppHeader from '../components/app-header/app-header'

  export default {
    components: {
      AppHeader
    },
    head() {
      return {
        title: 'Shoppen met zorggeld',
        meta: [
          { property: 'og:url', content: 'https://www.pointer-project.netlify.com' },
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: 'Shoppen met zorggeld | Pointer' },
          { property: 'og:description', content: 'Shop met de winst van zorgcowboys' },
          { property: 'og:image', content: 'https://www.pointer-project.netlify.com' }
        ]
      }
    }
  }
</script>
