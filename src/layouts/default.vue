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
    }
  }
</script>

<style>
  :root {
    --color-darkest: #1D2939;
    --color-lightest: #F2F2F2;
    --color-gray: #E6E6E6;
    --color-highlight-yellow: #FAFF2E;
    --color-highlight-red: #F65645;
    --color-highlight-green: #1BEAAE;
    --color-highlight-purple: #6B38E8;
    --color-dimmed-purple: #D8CEDB;
  }

  /*
    CSS Reset
    http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
</style>
