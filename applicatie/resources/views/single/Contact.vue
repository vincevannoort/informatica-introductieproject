<template>
  <div>
    <main-view-title :title="contact.first_name + ' ' + contact.last_name" :back="{ route: '/contacts', name: 'contacts'}"></main-view-title>
  </div>
</template>

<script>
  export default{
    name: 'contact',
    data(){
      return {
        contact: {}
      }
    },
    beforeCreate() {
      var self = this
      axios.get(
        `/api/contacts/${self.$route.params.id}`
      )
      .then(function (response) {
        self.contact = response.data
      })
      .catch(function (error) {
        if (error.response.status === 404) { self.$router.push({ name: '404' }) }
      })
    }
  }
</script>