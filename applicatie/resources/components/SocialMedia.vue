<template>
  <div class="social-media-buttons field has-addons">
    <p class="control" v-for="socialmedia in socialMedias" :key="socialmedia.id">
      <a class="button">
        <span class="icon is-small">
          <i :class="`fa fa-${socialmedia.type}`" />
        </span>
      </a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    socialMedias: {
      default: () => [],
      type: Array
    }
  }
}
</script>


<style lang="scss">
  .social-media-buttons {
    .button {
      background: none;
    }
  }
</style>
