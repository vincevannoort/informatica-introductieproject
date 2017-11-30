<template>
  <section>
    <div class="logo"></div>
    <div class="title">Authentication</div>
    <div class="subtitle"><p>AdonisJs simplicity will make you feel confident about your code</p></div>

    <form v-on:submit.prevent="submit">
      <input type="text" v-model="credentials.username" placeholder="username">
      <input type="password" @keyup.enter="submit" v-model="credentials.password" placeholder="password">
      <button @click="submit" >submit</button>
    </form>
  </section>
</template>

<script>
  import authentication from '../assets/js/authentication'

  export default{
    data(){
      return {
        user: authentication.user,
        credentials: {
          username: '',
          password: '',
        }
      }
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

<style lang="scss" scoped>
  form {
    margin: 2rem;
    input, button {
      display: block;
      margin: 1rem;
      padding: 0.5rem 1rem;
    }
  }
</style>