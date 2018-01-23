<template>
  <modal-create-edit
    :entity="'Social media'"
    @store="store">
    <field v-model="socialmedia.type" :name="'Type'" :size="'full'" :validation="'required'" :field-type="'select'" :options="['facebook', 'twitter', 'linkedin']" />
    <field v-model="socialmedia.url" :name="'Url'" :size="'full'" :validation="'required|url'" />
  </modal-create-edit>
</template>

<script>
import Contact from '../../services/ContactService'
export default {
  data() {
    return {
      socialmedia: {
        type: '',
        url: ''
      }
    }
  },
  methods: {
    async store() {
      await Contact.storeSocialMedia({
        socialmedia: this.socialmedia,
        relation_id: this.$route.params.relation_id,
        contact_id: this.$route.params.contact_id
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
