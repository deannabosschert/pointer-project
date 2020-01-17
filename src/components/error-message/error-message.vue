<template>
  <div class="error-message">
    <section class="error-message__section">
      <h2 class="error-message__title">Oh, helaas</h2>
      <p>Je kunt niet shoppen. Het winstpercentage is namelijk niet hoog genoeg.</p>
    </section>
    <section class="error-message__section">
      <h2 class="error-message__title">Maar gelukkig!</h2>
      <p>Dat betekent wel dat deze zorginstelling goed bezig is en niet in aanmerking komt als <i>zorgcowboy</i></p>
    </section>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  .error-message__section {
    margin-left: -$spacing-medium;
    margin-right: -$spacing-medium;
    padding: 0 $spacing-medium;
    padding-top: $spacing-medium;
  }

  .error-message .error-message__section:first-child {
    background-image: url('~static/icons/blue.svg');
    background-repeat: no-repeat;
    background-position: -30px top;
  }

  .error-message .error-message__section:last-child {
    margin-bottom: 0;
    background-image: url('~static/icons/yellow_red.svg');
    background-repeat: no-repeat;
    background-position: calc(100% + 10px) -10px;

    & > p {
      padding-right: $spacing-large;
    }
  }

  .error-message__title {
    font-size: $font-size-medium;
    margin-bottom: $spacing-tiny;
  }
</style>
