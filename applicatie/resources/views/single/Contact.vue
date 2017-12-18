<template>
  <div>
    <main-view-title
    :title="contact.first_name + ' ' + contact.last_name"
    :back="{ route: '/contacts', name: 'contacts'}"
    @edit="edit"
    @remove="remove"
    ></main-view-title>
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
      },
      async edit() {
        this.$router.push({ name: 'contacts-edit', params: { relation_id: this.$route.params.relation_id, contact_id: this.$route.params.contact_id } })
      },
      async remove() {
        try {
          await Contact.destroy({ contact_id: this.$route.params.contact_id })
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } catch(error) {
          console.error(error)
        }
      }
    }
  }
</script>
