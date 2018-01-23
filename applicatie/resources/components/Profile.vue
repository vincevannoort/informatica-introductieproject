<template>
  <div class="sidebar-profile">
    <router-link to="/profile">
      <div class="sidebar-profile-image-and-name">
        <div class="sidebar-profile-image">
          <icon-relation />
        </div>
        <div class="sidebar-profile-name">
          <div class="sidebar-profile-fullname">{{ user.first_name }} {{ user.last_name }}</div>
          <div class="sidebar-profile-function">{{ user.profession }}</div>
        </div>
      </div>
    </router-link>
    <div class="sidebar-profile-icons">
      <router-link to="/profile"><icon-profile /></router-link>
      <router-link to="/logout"><icon-logout /></router-link>
    </div>
  </div>
</template>

<script>
  import Authentication from '../assets/js/authentication'

  export default {
    data() {
      return { user: {} }
    },
    async created() {
      if (await Authentication.authenticated()) {
        this.user = await Authentication.profile()
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/scss/variables/colors";
.sidebar-profile-icons {
  a {
    margin: 0.5rem;
    height: 20px;
    width: 20px;
    svg { height: 20px; width: 20px; }
    &:first-of-type { margin-left: 0; }
    &:last-of-type { margin-right: 0; }
  }
}

.sidebar-profile-image {
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
  }
  svg * {
    fill: darken($border-grey, 30%);
  }
}
</style>

