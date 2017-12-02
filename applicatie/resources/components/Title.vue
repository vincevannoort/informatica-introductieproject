<template>
  <div class="main-title-inner-content">
    <router-link class="main-back-link" v-if="back" :to="`${back.route}`">< back to {{ back.name }}</router-link> 
    <h1 class="main-title">
        {{ title }}
    </h1>
    <h2 class="main-breadcrumbs">
      Overzicht <span>/</span> {{ title }}
    </h2>
  </div>
</template>

<script>
  export default {
    props: ['title', 'back']
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";

  .main-title-inner-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .main-title {
    display: inline-block;
    margin-bottom: 0;
    opacity: 0;
    animation: fadeInLeft .65s cubic-bezier(0.19, 1, 0.30, 1) 0.2s forwards;
  }

  .main-breadcrumbs {
    display: inline-block;
    color: $medium-grey;
    font-size: 20px;
    opacity: 0;
    animation: fadeInLeft .65s cubic-bezier(0.19, 1, 0.30, 1) 0.4s forwards;
  }

  .main-back-link {
    color: $medium-grey;
  }
</style>