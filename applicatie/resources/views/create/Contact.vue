<template>
  <modal-create-edit
    :validated="validated"
    @init-create="clearFields"
    @init-edit="show"
    @store="store"
    @update="update"
    @back="back">
    <field :model="contact.profession" :name="'Profession'" :size="'full'" :validation="'required'" />
    <field :model="contact.first_name" :name="'First name'" :size="'half'" :validation="'required'" />
    <field :model="contact.last_name" :name="'Last name'" :size="'half'" :validation="'required'" />
    <field :model="contact.telephone" :name="'Telephone'" :size="'half'" :validation="'required'" />
    <field :model="contact.email" :name="'Email'" :size="'half'" :validation="'required|email'" />
  </modal-create-edit>
</template>

<script>
  import Contact from '../../controllers/ContactController'

  export default {
    data() {
      return {
        contact: {
          profession: '',
          first_name: '',
          last_name: '',
          telephone: '',
          email: ''
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
