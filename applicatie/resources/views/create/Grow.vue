<template>
  <modal-create-edit
    :entity="'Grow'"
    @init-edit="show"
    @store="store"
    @update="update">
    <field v-model="grow.goal" :name="'Goal'" :size="'half'" :field-type="'textarea'" />
    <field v-model="grow.reality" :name="'Reality'" :size="'half'" :field-type="'textarea'" />
    <field v-model="grow.opportunity" :name="'Opportunity'" :size="'half'" :field-type="'textarea'" />
    <field v-model="grow.will" :name="'Will'" :size="'half'" :field-type="'textarea'" />
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
    async show() {
      this.grow = await Proposal.getGrow({ proposal_id: this.$route.params.proposal_id })
    },
    async store() {
      await Proposal.storeGrow({
        proposal_id: this.$route.params.proposal_id,
        grow: this.grow
      })
      this.$emit('refetch')
      this.$router.go(-1)
    },
    async update() {
      await Proposal.updateGrow({
        proposal_id: this.$route.params.proposal_id,
        grow: this.grow
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
