<template>
  <div>
    <main-view-title
    :title="`${proposal.name}`"
    :back="`back to ${proposal.relation.name}`"
    @back="back"
    @edit="edit"
    @remove="remove"
    ></main-view-title>
  </div>
</template>

<script>
  import Proposal from '../../controllers/ProposalController'

  export default{
    name: 'proposal',
    data(){
      return {
        proposal: {}
      }
    },
    activated() {
      this.show()
    },
    methods: {
      back() {
        this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
      },
      async show() {
        try {
          console.log('here!')
          this.proposal = await Proposal.show({ proposal_id: this.$route.params.proposal_id })
        } catch(error) {
          console.error(error)
        }
      },
      async edit() {
        this.$router.push({ name: 'proposals-edit', params: { relation_id: this.$route.params.relation_id, proposal_id: this.$route.params.proposal_id } })
      },
      async remove() {
        try {
          await Proposal.destroy({ proposal_id: this.$route.params.proposal_id })
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } catch(error) {
          console.error(error)
        }
      }
    }
  }
</script>
