<template>
  <modal-create-edit
    :entity="'Role'"
    @store="store">
    <field v-model="role.type" :name="'Role'" :size="'full'" :validation="'required'" :field-type="'select'" :options="['chief', 'user', 'expert', 'ambassador']" />
  </modal-create-edit>
</template>

<script>
import Proposal from '../../services/ProposalService'

export default {
  data() {
    return { role: { type: '' } }
  },
  methods: {
    async store() {
      await Proposal.storeRole({
        proposal_id: this.$route.params.proposal_id,
        contact_id: this.$route.params.contact_id,
        role: this.role
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
