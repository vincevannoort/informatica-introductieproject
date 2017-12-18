<template>
  <div>
    <main-view-title :title="contact.first_name + ' ' + contact.last_name" :back="{ route: '/contacts', name: 'contacts'}"></main-view-title>
  </div>
</template>

<script>
  import Contact from '../../controllers/ContactController'

  export default{
    name: 'contact',
    data(){
      return {
        contact: {}
      }
    },
    activated() {
      this.show()
    },
    methods: {
      async show() {
        try {
          this.contact = await Contact.show({ contact_id: this.$route.params.contact_id })
        } catch(error) {
          console.error(error)
        }
      }
    }
  }
</script>