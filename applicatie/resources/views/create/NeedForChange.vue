<template>
  <modal-create-edit 
    :entity="'needforchange'">
    :validated="validated"
    @init-create="clearFields"
    @init-edit="show"
    @store="store"
    @update="update"
    @back="back">
    <field v-model="needforchange.standpoint" :name="'Standpoint'" :size="'full'" :validation="'optional'" />
    <field v-model="needforchange.clarification" :name="'Clarification'" :size="'full'" :validation="'optional'" />
  </modal-create-edit>
</template>
<script>
  import needforchange from '../../controllers/ContactController'

  export default {
    data() {
      return {
        needforchange: {
          standpoint: '',
          clarification: '',
        }
      }
    },
    computed: {
      validated() {
        return false
      }
    },
    methods: {
      clearFields() {
        for (var field in this.contact) {
          this.contact[field] = ''
        }
        this.$nextTick().then(() => { this.$validator.reset()})
      },
      async show() {
        this.contact = await Contact.show({ contact_id: this.$route.params.contact_id })
      },
      async store() {
        const contact = await Contact.store({ contact: this.contact, relation_id: this.$route.params.relation_id })
        this.$emit('created-contact', contact)
        this.back()
      },
      async update() {
        const contact = await Contact.update({ contact: this.contact })
        this.$emit('updated-contact', contact.data)
        this.back()
      },
      back() {
        console.log(this.$route)
        const viewType = this.$route.meta.type
        if (viewType == 'create' || this.$route.name === 'contacts-edit-from-relation' ) {
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } else if (viewType == 'edit') {
          this.$router.push({ name: 'contacts-single', params: { relation_id: this.$route.params.relation_id, contact_id: this.$route.params.contact_id } })
        }
      }
    }
  }
</script>
