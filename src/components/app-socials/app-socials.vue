<template>
  <section class="app-socials">
    <div class="app-socials__intro">
      <p class="app-socials__intro-text">Meer mensen wakker schudden?</p>
      <h2 class="app-socials__title">Deel jouw aankopen!</h2>
    </div>
    <div class="app-socials__buttons">
      <a
        :href="twitterLink"
        target="_blank"
        class="app-socials__button"
      >
        <app-icon name="twitter_purple" />
        <span class="sr-only">Deel op Twitter</span>
      </a>
      <a
        :href="facebookLink"
        target="_blank"
        class="app-socials__button"
      >
        <app-icon name="facebook_purple" />
        <span class="sr-only">Deel op Facebook</span>
      </a>
    </div>
  </section>
</template>

<script>
  import queryString from 'query-string'

  import { mapState } from 'vuex'

  import AppIcon from '../app-icon/app-icon'

  export default {
    components: {
      AppIcon
    },
    props: {
      content: {
        type: Object,
        default: null
      }
    },
    computed: {
      ...mapState({
        shoppingBag: state => state.shop.shoppingBag,
        substituteItems: state => state.shop.substituteItems
      }),
      twitterLink() {
        const url = 'https://twitter.com/intent/tweet'
        const params = queryString.stringify({
          text: generateText(this.shoppingBag, this.substituteItems[0]),
          url: 'https://www.pointer-project.netlify.com'
        })

        return `${url}?${params}`
      },
      facebookLink() {
        const url = 'https://www.facebook.com/dialog/share'
        const params = queryString.stringify({
          app_id: 164432231515850,
          href: 'https://www.pointer-project.netlify.com',
          quote: generateText(this.shoppingBag, this.substituteItems[0])
        })

        return `${url}?${params}`
      }
    },
  }

  function generateText(shoppingBagItems, substituteItem) {
    const names = Object.entries(shoppingBagItems).map(([key, object]) => {
      if (key === 'Moët') {
        if (object.amount > 1) {
          return `${object.amount} flessen Moët`
        }

        return 'een fles Moët'
      }

      if (object.amount > 1) {
        return `${object.amount} ${key}'s`
      }

      return `een ${key}`
    })

    const correctedItems = names.length > 1
      ? names.slice(0, 2).join(' en ')
      : names[0]

    return `Wow! Ik heb zojuist ${correctedItems} gekocht, hiervan had ik ook ${substituteItem.amount.toLocaleString()} ${substituteItem.naam.toLowerCase()} kunnen kopen.\n\nHoe besteed jij dit geld?\n\n`
  }
</script>

<style lang="scss">
  .app-socials {
    display: flex;
    align-items: center;
  }

  .app-socials__intro {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    flex-direction:column;
    margin-right: $spacing-small;
  }

  .app-socials__intro-text {
    font-family: $font-stack-headings;
    line-height: 1.25;
  }

  .app-socials__title {
    font-size: $font-size-default;
    font-weight: $font-weight-default;
    line-height: 1.25;
  }

  .app-socials__buttons {
    display: flex;
    justify-content: flex-end;
  }

  .app-socials__button {
    font-size: 60px;
    margin-right: $spacing-tiny;
    display: flex;
    align-items: center;
  }

  .app-socials__buttons .app-socials__button:last-child {
    margin-right: 0;
  }
</style>
