<template>
  <div class="box">
    <div class="box-header-wrapper">
      <div v-if="title" class="box-header">
        {{ title }}
        <div class="box-header-info" v-if="information" :data-balloon="information" data-balloon-length="large" data-balloon-pos="up"><i class="fa fa-info" aria-hidden="true" /></div>
      </div>
      <router-link v-if="action.title && action.route" class="box-header-link button is-small" :title="action.title" :to="`${ action.route }`">
        {{ action.title }}
      </router-link>
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    inject: ['$validator'],
    props: {
      title: {
        type: String,
        required: false,
        default: ''
      },
      action: {
        type: Object,
        required: false,
        default: () => ({ title: '', route: '' })
      },
      information: {
        type: String,
        required: false,
        default: ''
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";

  .box {
    position: relative;
  }

  .box-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: flex-start;
  }

  .box-header {
    display: inline-block;
    position: relative;
    .box-header-info {
      height: 24px;
      width: 24px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) translateX(40px);
      border-radius: 50%;
      text-align: center;
      border: 1px solid $border-grey;
      line-height: 17px;
      i {
        color: $border-grey;
        font-size: 14px;
      }
    }
  }

  .box-header-link {
    display: inline-block;
  }

  [data-balloon]:after {
    background: white !important;
    color: $almost-black !important;
    border: 1px solid $border-grey !important;
    box-shadow: 0 25px 65px -20px rgba(0, 0, 0, 0.15) !important;
  }
  [data-balloon]:before {
    display: none !important;
  }
</style>
