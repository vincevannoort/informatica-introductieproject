<template>
  <modal-create-edit
    :entity="'Note'"
    @store="store"
    @update="update">
    <field v-model="note.description" :name="'Description'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
import Authentication from '../../assets/js/authentication'
import Contact from '../../services/ContactService'

export default {
  data() {
    return {
      note: {
        description: '',
        user_id: 1
      }
    }
  },
  async created() {
    const user = await Authentication.profile()
    this.note.user_id = user.id
  },
  methods: {
    async store() {
      await Contact.storeNote({
        note: this.note,
        relation_id: this.$route.params.relation_id,
        contact_id: this.$route.params.contact_id
      })
      this.$emit('refetch')
      this.$router.go(-1)
    },
    update() {
      console.log('updating')
    }
  }
}
</script>
