<template>
  <div>
    <main-view-title
      :title="`${proposal.name}`"
      :back="`back to ${currentRelationName}`"
      @back="back"
      @edit="edit"
      @remove="remove"/>
    <div class="columns">
      <div class="column">
        <box :title="'Internal power and sources'">
          <div class="relation-contact" v-for="proposalcontact in proposal.proposalcontacts" :key="proposalcontact.id">
            <table>
              <tr>
                <th><span class="proposal-contact-type" v-for="role in proposalcontact.roles" :key="role.id">{{ role.type }}</span> <span>{{ proposalcontact.contact.profession }}</span> {{ proposalcontact.contact.first_name }} {{ proposalcontact.contact.last_name }}</th>
              </tr>
              <tr>
                <td>information</td>
              </tr>
            </table>
          </div>
        </box>
      </div>
      <div class="column is-2">
        <insight-bar :insight="proposal.insight" />
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
    <transition name="fade-up" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import InsightBarComponent from '../../components/InsightBar'
  import Proposal from '../../controllers/ProposalController'

  export default {
    name: 'Proposal',
    components: { 'insight-bar': InsightBarComponent },
    data() {
      return { proposal: {} }
    },
    computed: {
      currentRelationName() {
        let self = this
        if (this.proposal.relation) {
          return this.proposal.relation.name
        } else { return 'loading...' }
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

<style lang="scss">
  @import "../../assets/scss/variables/colors";
</style>

