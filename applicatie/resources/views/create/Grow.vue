<template>
  <modal-create-edit 
    :entity="'Grow'"
    @store = "store">
    <field v-model="grow.goal" :name="'Goal'" :size="'half'" />
    <field v-model="grow.reality" :name="'Reality'" :size="'half'" />
    <field v-model="grow.opportunity" :name="'Opportunity'" :size="'half'" />
    <field v-model="grow.will" :name="'Will'" :size="'half'" />
  </modal-create-edit>
</template>

<script>
import Proposal from '../../services/ProposalService'

export default {
  data() {
    return {
      grow: {
        goal: '',
        reality: '',
        opportunity: '',
        will: ''
      }
    }
  },
  methods: {
    async store() {
      await Proposal.storeGrow({
        proposal_id: this.$route.params.proposal_id,
        grow: this.grow
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
