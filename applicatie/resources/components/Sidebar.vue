<template>
  <div class="sidebar-inner-content">
    <div class="sidebar-logo-and-links">
      <div class="sidebar-logo">
        <img src="../assets/images/canon.svg">
      </div>
      <div class="sidebar-links">
        <router-link to="/">
          <icon-dashboard></icon-dashboard>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/relations">
          <icon-company></icon-company>
          <span>Relations</span>
        </router-link>
        <router-link to="/actions">
          <icon-actions></icon-actions>
          <span>Actions</span>
        </router-link>
      </div>
    </div>
    <div class="sidebar-profile">
      <router-link to="/profile">
        <div class="sidebar-profile-image-and-name">
          <div class="sidebar-profile-image"></div>
          <div class="sidebar-profile-name">
            <div class="sidebar-profile-fullname">Vince van Noort</div>
            <div class="sidebar-profile-function">Commercial department</div>
          </div>
        </div>
      </router-link>
      <router-link to="/profile"><icon-profile></icon-profile></router-link>
    </div>
  </div>
</template>

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
      max-width: 225px;
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
      border-bottom: 1px solid $border-grey;
      font-size: 20px;
      color: $almost-black;
      transition: all 0.15s ease-in-out;
      svg {
        width: 27px;
        margin-right: 22px;
        path {
          transition: all 0.15s ease-in-out;
        }
      }
      &.router-link-exact-active, &:hover {
        color: $red;
        background-color: transparentize($red, 0.96);
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