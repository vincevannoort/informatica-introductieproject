<template>
  <modal-create-edit
    :entity="'Competition'"
    @store="store">
    <field v-model="competition.company" :name="'Company name'" :size="'half'" :validation="'required'" />
    <field v-model="competition.grading" :name="'Grading'" :size="'half'" :validation="'required'" :field-type="'select'" :options="['much better', 'better', 'equal', 'worse', 'much worse']" />
    <field v-model="competition.counter_proposal" :name="'Counter proposal'" :size="'full'" :field-type="'textarea'" :validation="'required'" />
    <field v-model="competition.position" :name="'Position'" :size="'full'" :field-type="'textarea'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
import Proposal from '../../services/ProposalService'

export default {
data() {
    return {
      competition: {
        company: '',
        grading: '',
        counter_proposal: '',
        position: ''
      }
    }
  },
  methods: {
    async store() {
      await Proposal.storeCompetition({
        proposal_id: this.$route.params.proposal_id,
        competition: this.competition
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>

