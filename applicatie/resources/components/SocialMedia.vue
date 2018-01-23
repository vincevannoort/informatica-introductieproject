<template>
  <div class="social-media-buttons field has-addons">
    <template v-if="socialMedias && socialMedias.length">
      <p class="control" v-for="socialmedia in socialMedias" :key="socialmedia.id">
        <a @click.prevent="navigate(socialmedia)" class="button" target="_blank" :href="socialmedia.url">
          <span class="icon is-small">
            <i :class="`fa fa-${socialmedia.type}`" />
          </span>
        </a>
      </p>
    </template>
    <template v-else>
      <p>No socials yet</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    socialMedias: {
      default: () => [],
      type: Array
    }
  },
  methods: {
    navigate(socialmedia) {
      window.open(socialmedia.url, '_blank')
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
