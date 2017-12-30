<template>
  <div class="sidebar-profile">
    <router-link to="/profile">
      <div class="sidebar-profile-image-and-name">
        <div class="sidebar-profile-image"></div>
        <div class="sidebar-profile-name">
          <div class="sidebar-profile-fullname">{{ user.first_name }} {{ user.last_name }}</div>
          <div class="sidebar-profile-function">{{ user.profession }}</div>
        </div>
      </div>
    </router-link>
    <router-link to="/profile"><icon-profile></icon-profile></router-link>
  </div>
</template>

<script>
  import Authentication from '../assets/js/authentication'

  export default {
    data(){
      return {
        user: {}
      }
    },
    async created() {
      if (await Authentication.authenticated()) {
        this.user = await Authentication.profile()
      }
    }
  }
</script>
