<template>
  <div class="authentication-content-wrapper">
    <div class="authentication-logo">
      <img src="../assets/images/easy-link-keeper-side.svg">
    </div>
    <div class="box authentication-box">
      <div class="field">
        <div class="control">
          <input class="input" type="text" name="username" placeholder="Username" v-model="credentials.username">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input" type="password" name="password" placeholder="Password" @keyup.enter="login" v-model="credentials.password">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" @click="login">Submit</button>
        </div>
      </div>
    </div>
    <div class="authentication-graph-wrapper">
      <canvas id="authentication-graph"/>
    </div>
  </div>
</template>

<script>
  import authentication from '../assets/js/authentication'
  import authenticationChart from '../assets/js/graphs/authentication-chart'

  export default {
    data() {
      return {
        user: authentication.user,
        credentials: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      loginView() {
        return this.$route.meta.type === 'login'
      },
      logoutView() {
        return this.$route.meta.type === 'logout'
      }
    },
    mounted() {
      var createdChart = authenticationChart.generate('authentication-graph')
      authenticationChart.startRandomIntervalUpdating(createdChart)
      if (this.logoutView) {
        authentication.logout()
        this.$router.push({ name: 'login' })
      } else {
        if (authentication.authenticated()) {
          this.$router.push({ name: 'relations-overview' })
        }
      }
    },
    methods: {
      login() {
        let credentials = {
          email: this.credentials.username,
          password: this.credentials.password
        }
        authentication.login(this, credentials, '/relations')
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";
  $authentication-padding: 45px;

  .authentication-content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 25vh;
  }

  .authentication-logo {
    width: 315px;
  }

  .authentication-box {
    height: auto !important;
    background: white;
    width: 440px;
    max-width: 100%;
    padding: $authentication-padding;
    border: 1px solid $border-grey;
    margin-top: 55px;
    .field:not(:last-child) {
      margin-bottom: 1rem;
    }
    .button {
      width: 100%;
      padding: 0.65rem;
      margin-top: 1rem;
    }
  }

  .authentication-graph-wrapper {
    position: fixed;
    bottom: -20px;
    height: 30vh;
    width: 100vw;
    z-index: -1;
  }
</style>
