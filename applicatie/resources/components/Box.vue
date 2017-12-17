<template>
  <div class="box">
    <div class="box-header-wrapper">
      <div class="box-header" v-if="title">{{ title }}</div>
      <router-link class="box-header-link button is-small" v-if="action" :to="`${ action.route }`">
        {{ action.title }}
      </router-link>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default{
    props: ['title', 'action']
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
  }

  .box-header {
    display: inline-block;
  }

  .box-header-link {
    display: inline-block;
  }
</style>