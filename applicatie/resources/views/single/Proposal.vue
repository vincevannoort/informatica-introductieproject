<template>
  <div>
    <main-view-title
    :title="`${proposal.name}`"
    :back="`back to ${proposal.relation.name}`"
    @back="back"
    @edit="edit"
    @remove="remove"
    ></main-view-title>
    <div class="columns">
      <div class="column">
        <box :title="'Internal power and sources'">
          information (contacts and their influences)
        </box>
      </div>
      <div class="column is-2">
        <insight-bar :insight="proposal.insight"></insight-bar>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box :title="'Position and competition'">
          information
        </box>
      </div>
      <div class="column">
        <box :title="'Effects of the changes'">
          information
        </box>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box :title="'SMART actions'">
          information (describes SMART actions)
        </box>
      </div>
      <div class="column">
        <box :title="'Strengths and Weaknesses'">
          information (leverage strengths, eliminate weaknesses)
        </box>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box :title="'GROW information'">
          <div class="columns">
            <div class="column">goal</div>
            <div class="column">reality</div>
            <div class="column">opportunities</div>
            <div class="column">will</div>
          </div>
        </box>
      </div>
    </div>
  </div>
</template>

<script>
  import InsightBarComponent from '../../components/InsightBar'
  import Proposal from '../../controllers/ProposalController'

  export default {
    name: 'proposal',
    components: {
      'insight-bar': InsightBarComponent
    },
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
