<template>
  <div class="authentication-content-wrapper">
    <div class="authentication-logo">
      <img src="../assets/images/canon.svg">
    </div>
    <div class="box authentication-box">
      <div class="field">
        <div class="control">
          <input class="input" type="text" name="username" placeholder="Username" @keyup.enter="submit" v-model="credentials.username">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input" type="password" name="password" placeholder="Password" @keyup.enter="submit" v-model="credentials.password">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" @click="submit">Submit</button>
        </div>
      </div>
    </div>
    <div class="authentication-graph-wrapper">
      <canvas id="authentication-graph"></canvas>
    </div>
  </div>
</template>

<script>
  import authentication from '../assets/js/authentication'
  import authenticationChart from '../assets/js/graphs/authentication-chart'

  export default {
    data(){
      return {
        user: authentication.user,
        credentials: {
          username: '',
          password: '',
        }
      }
    },
    mounted() {
      var createdChart = authenticationChart.generate('authentication-graph')
      authenticationChart.startRandomIntervalUpdating(createdChart)
    },
    methods: {
      submit() {
        let credentials = {
          email: this.credentials.username,
          password: this.credentials.password
        }
        authentication.login(this, credentials, '/')
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
    width: 225px;
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
