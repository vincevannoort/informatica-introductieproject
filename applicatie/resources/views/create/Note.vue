<template>
  <modal-create-edit
    :entity="'Note'"
    @store="store"
    @update="update">
    <field v-model="note.description" :name="'Description'" :size="'full'" :validation="'required'" />
    <field v-model="note.date" :name="'Date'" :size="'half'" :validation="'required'" :field-type="'date'" />
  </modal-create-edit>
</template>

<script>
import Contact from '../../services/ContactService'

export default {
  data() {
    return {
      note: {
        description: '',
        date: '',
        user_id: 1
      }
    }
  },
  methods: {
    async store() {
      let self = this
      console.log(self.note)
      await Contact.storeNote({
        note: self.note,
        relation_id: this.$route.params.relation_id,
        contact_id: this.$route.params.contact_id
      })
    },
    update() {
      console.log('updating')
    }
  }
}
</script>
