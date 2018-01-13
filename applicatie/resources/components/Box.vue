<template>
  <div class="box">
    <div class="box-header-wrapper">
      <div v-if="title" class="box-header">{{ title }}</div>
      <router-link v-if="action.title && action.route" class="box-header-link button is-small" :title="action.title" :to="`${ action.route }`">
        {{ action.title }}
      </router-link>
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
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
      }
    }
  }
</script>

<style lang="scss">
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
  }

  .box-header-link {
    display: inline-block;
  }
</style>
