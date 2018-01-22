<template>
  <modal-create-edit
    :entity="'Strength and weakness'"
    @store="store">
    <field v-model="strengthandweakness.type" :name="'Type'" :size="'full'" :validation="'required'" :field-type="'select'" :options="['strength', 'weakness']" />
    <field v-model="strengthandweakness.description" :name="'Description'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
import Relation from '../../services/RelationService'
import Proposal from '../../services/ProposalService'

export default {
  data() {
    return {
      strengthandweakness: {
        type: '',
        description: ''
      }
    }
  },
  methods: {
    async store() {
      if( this.$route.name == 'strengths-and-weaknesses-relation-create' ) {
        await Relation.storeStrengthOrWeakness({
          relation_id: this.$route.params.relation_id,
          strengthorweakness: this.strengthandweakness
        })
      }
      else if( this.$route.name == 'strengths-and-weaknesses-proposal-create' ) {
        await Proposal.storeStrengthOrWeakness({
          proposal_id: this.$route.params.proposal_id,
          strengthorweakness: this.strengthandweakness
        })
      }
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
