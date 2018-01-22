<template>
  <modal-create-edit
    :entity="'Contact'"
    @init-edit="show"
    @store="store"
    @update="update"
    @back="back">
    <field v-model="contact.profession" :name="'Profession'" :size="'full'" :validation="'required'" />
    <field v-model="contact.first_name" :name="'First name'" :size="'half'" :validation="'required'" />
    <field v-model="contact.last_name" :name="'Last name'" :size="'half'" :validation="'required'" />
    <field v-model="contact.telephone" :name="'Telephone'" :size="'half'" :validation="'required'" />
    <field v-model="contact.email" :name="'Email'" :size="'half'" :validation="'required|email'" />
    <field v-model="contact.needforchanges[0].value" :name="'Need for change'" :size="'half'" :field-type="'select'" :options="['low', 'medium', 'high']" />
    <field v-model="contact.needforchanges[0].clarification" :name="'Clarification'" :size="'half'" />
    <field v-model="contact.influences[0].value" :name="'Influence'" :size="'half'" :field-type="'select'" :options="['low', 'medium', 'high']" />
    <field v-model="contact.influences[0].clarification" :name="'Clarification'" :size="'half'" />

  </modal-create-edit>
</template>

<script>
  import Contact from '../../services/ContactService'

  export default {
    data() {
      return {
        contact: {
          profession: '',
          first_name: '',
          last_name: '',
          telephone: '',
          email: '',
          needforchanges: [{
            value: '',
            clarification: ''
          }],
          influences: [{
            value: '',
            clarification: ''
          }]
        }
      }
    },
    methods: {
      async show() {
        this.contact = await Contact.show({ contact_id: this.$route.params.contact_id })
      },
      async store() {
        const contact = await Contact.store({ contact: this.contact, relation_id: this.$route.params.relation_id })
        this.$emit('refetch')
        this.back()
      },
      async update() {
        const contact = await Contact.update({ contact: this.contact })
        this.$emit('refetch')
        this.back()
      },
      back() {
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
