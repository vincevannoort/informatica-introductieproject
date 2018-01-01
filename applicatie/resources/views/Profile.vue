<template>
  <div>
    <main-view-title :title="'Profile'" />
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    activated() {
      var self = this
      axios.get('/api/users/profile')
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
</script>
