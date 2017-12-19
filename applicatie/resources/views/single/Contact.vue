<template>
  <div>
    <main-view-title
    :title="`${contact.first_name} ${contact.last_name}`"
    :back="`back to ${currentRelationName.name}`"
    @back="back"
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
    computed: {
      currentRelationName() {
        let self = this
        return this.contact.relations.find((relation) => { return relation.id == self.$route.params.relation_id })
      }
    },
    activated() {
      this.show()
    },
    methods: {
      back() {
        this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
      },
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
          this.showDeletedSuccess()
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } catch(error) {
          this.showDeletedError()
          console.error(error)
        }
      }
    },
    notifications: {
      showDeletedSuccess: {
        title: 'Deleted contact',
        message: 'Deleted contact successfully',
        type: 'success'
      },
      showDeletedError: {
        title: 'Deleted contact',
        message: 'Not able to delete contact',
        type: 'error'
      }
    }
  }
</script>
