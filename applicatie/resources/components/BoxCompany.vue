<template>
  <box class="box-company">
    <div class="box-company-amount">
      {{ amount }}
    </div>
    <div class="box-company-category">
      {{ title }}
    </div>
    <icon-company></icon-company>
  </box>
</template>

<script>
  export default {
    props: {
      amount: {
        required: true,
        type: Number
      },
      title: {
        required: true,
        type: String
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";

  .box-company {
    height: auto;
    position: relative;
    overflow: hidden;
    svg {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translatex(20%) translateY(-50%);
      width: 70px;
      height: auto;
      opacity: 0.1;
    }
  }
  .box-company-amount {
    font-size: 42px;
    color: $company-amount-grey;
    font-weight: 300;
  }
</style>