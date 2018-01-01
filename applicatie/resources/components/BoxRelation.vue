<template>
  <box class="box-relation">
    <div class="box-relation-amount">
      {{ amount }}
    </div>
    <div class="box-relation-category">
      {{ title }}
    </div>
    <icon-relation />
  </box>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Pass a title'
      },
      amount: {
        type: Number,
        required: false,
        default: 0
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";

  .box-relation {
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
  .box-relation-amount {
    font-size: 42px;
    color: $relation-amount-grey;
    font-weight: 300;
  }
</style>
