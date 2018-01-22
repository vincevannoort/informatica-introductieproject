<template>
  <modal-create-edit
    :entity="'Internal Power'"
    @init-create="getContacts">
    <field v-model="contact" :name="'Value'" :size="'full'" :validation="'required'" :field-type="'select'" :options="['low', 'medium', 'high']" />
  </modal-create-edit>
</template>

<script>
import Relation from '../../services/RelationService'

export default {
  data() {
    return {
      contact: '',
      contactList: []
    }
  },
  methods: {
    async getContacts() {
      this.contactList = await Relation.show({ relation_id: this.$route.params.relation_id }).then((relation) => relation.contacts)
    }
  }
}
</script>
