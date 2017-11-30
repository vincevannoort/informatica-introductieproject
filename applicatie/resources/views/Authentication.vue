<template>
  <h1>Authentication</h1> 
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