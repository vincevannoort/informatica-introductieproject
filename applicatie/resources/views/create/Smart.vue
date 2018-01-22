<template>
  <modal-create-edit
    :entity="'Smart'"
    @store = "store">
    <field v-model="smart.smart_action" :name="'Action'" :size="'full'" :validation="'required'" :field-type="'textarea'" />
  </modal-create-edit>
</template>

<script>
import Proposal from '../../services/ProposalService'

export default {
  data() {
    return { smart: { smart_action: '' } }
  },
  methods: {
    async store() {
      await Proposal.storeAction({
        proposal_id: this.$route.params.proposal_id,
        smart: this.smart
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
