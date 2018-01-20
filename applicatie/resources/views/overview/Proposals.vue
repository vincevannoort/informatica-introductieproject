<template>
  <div>
    <main-view-title :title="'Proposals'" />
    <box-proposals
      :title="'Proposals'"
      :proposals="proposals"
      @edit-proposal="editProposal"
      @remove-proposal="removeProposal" />
    <transition name="fade-up" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import BoxProposalsComponent from '../../components/BoxProposals'
import Proposal from '../../services/ProposalService'

export default {
  components: { 'box-proposals': BoxProposalsComponent },
  data() {
    return { proposals: [] }
  },
  activated() {
      this.index()
  },
  methods: {
    async index() {
      this.proposals = await Proposal.index()
    },
    async editProposal(proposal) {
      console.log('hello?')
      this.$router.push({ name: 'proposals-edit-from-proposals', params: { relation_id: this.$route.params.relation_id, proposal_id: proposal.id } })
    },
    async removeProposal(proposal) {
      await Proposal.destroy({ proposal_id: proposal.id })
      const index = this.proposals.indexOf(proposal)
      this.proposals.splice(index, 1)
    }
  }
}
</script>
