<template>
  <div class="sidebar-inner-content">
    <div class="sidebar-logo-and-links">
      <div class="sidebar-logo">
        <img src="../assets/images/canon.svg">
      </div>
      <div class="sidebar-links">
        <router-link to="/" exact>
          <icon-dashboard />
          <span>Dashboard</span>
        </router-link>
        <router-link to="/relations">
          <icon-relation />
          <span>Relations</span>
        </router-link>
        <router-link to="/actions">
          <icon-actions />
          <span>Actions</span>
        </router-link>
      </div>
    </div>
    <profile />
  </div>
</template>

<script>
  import ProfileComponent from '../components/Profile'
  export default { components: { 'profile': ProfileComponent } }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";

  $sidebar-padding: 25px;

  .sidebar-content {
    border-right: 1px solid $border-grey;
  }

  .sidebar-content, .sidebar-inner-content {
    height: 100vh;
    min-height: 100vh;
    overflow: hidden;
  }

  .sidebar-inner-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sidebar-logo {
    padding: $sidebar-padding*2.4 $sidebar-padding;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 200px;
    }
  }

  .sidebar-links {
    display: flex;
    flex-direction: column;
    border-top: 1px solid $border-grey;
    a {
      display: flex;
      align-items: center;
      padding: $sidebar-padding;
      font-size: 20px;
      color: $almost-black;
      border-bottom: 1px solid $border-grey;
      margin-top: -1px;
      position: relative;
      transition: all 0.15s ease-in-out;
      svg {
        width: 27px;
        margin-right: 22px;
        path {
          transition: all 0.15s ease-in-out;
        }
      }
      &.router-link-active, &:hover {
        z-index: 1;
        color: $red;
        background-color: transparentize($red, 0.96);
        border-bottom: 1px solid $red;
        svg {
          path {
            fill: $red;
          }
        }
      }
    }
  }

  .sidebar-profile {
    border-top: 1px solid $border-grey;
    padding: $sidebar-padding;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      svg {
          path {
            transition: all 0.15s ease-in-out;
          }
        }
      &.router-link-exact-active, &:hover {
        svg {
          path {
            fill: $red;
          }
        }
      }
    }
  }

  .sidebar-profile-image-and-name {
    display: flex;
  }

  .sidebar-profile-image {
    height: 47px;
    width: 47px;
    background: #eee;
    border-radius: 47px;
    margin-right: 17px;
  }

  .sidebar-profile-name {
    display: flex;
    flex-direction: column;
  }

  .sidebar-profile-fullname {
    font-size: 20px;
    color: $almost-black;
  }

  .sidebar-profile-function {
    font-size: 14px;
    color: $function-grey;
    margin-top: -6px;
  }
</style>
