<template>
  <div>
    <main-view-title
      :title="`${proposal.name}`"
      :back="`back to ${currentRelationName}`"
      @back="back"
      @calculate="calculate"
      @edit="edit"
      @remove="remove" />
    <div class="columns">
      <div class="column">
        <box :title="'Internal power and sources'">
          <div class="relation-contact" v-for="contact in proposal.contacts" :key="contact.id">
            <table>
              <tr>
                <th>
                  <i class="proposal-contact-type" v-for="role in contact.roles" :key="role.id">{{ role.type }}</i>
                  <span class="proposal-contact-profession">{{ contact.information.profession }}</span>
                  {{ contact.information.first_name }} {{ contact.information.last_name }}
                </th>
                <th>actions</th>
              </tr>
              <tr>
                <td>information</td>
                <td>lorem ipsum</td>
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
        <box
          :title="'Position and competition'"
          :action="{ title: 'Add new counter proposal', route: `TODO` }" >
          <div class="proposal-competition" v-for="competition in proposal.competitions" :key="competition.id">
            <div class="proposal-competition-company">{{ competition.company }}</div>
            <div class="columns">
              <div class="column proposal-competition-company-counter">
                <div><strong>Counter proposal</strong></div>
                <div>{{ competition.counter_proposal }}</div>
              </div>
              <div class="column proposal-competition-company-position">
                <div><strong>Position</strong></div>
                <div>{{ competition.position }}</div>
              </div>
            </div>
          </div>
        </box>
      </div>
      <div class="column">
        <box :title="'Effects of the changes'">
          Eventueel verwijderen
        </box>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box
          :title="'SMART actions'"
          :action="{ title: 'Add new SMART action', route: `TODO` }" >
          <div class="proposal-smart-action" v-for="action in proposal.actions" :key="action.id">
            <div class="columns">
              <div class="column">
                <div><strong>Action</strong></div>
                <div class="proposal-smart-action-text">{{ action.smart_action }}</div>
              </div>
              <div class="column is-3 has-text-right">
                <div><strong>Date added</strong></div>
                <div class="proposal-smart-action-date">{{ action.created_at | moment("from") }}</div>
              </div>
            </div>
          </div>
        </box>
      </div>
      <div class="column">
        <box
          :title="'Strengths and Weaknesses'"
          :action="{ title: 'Add new strength or weakness', route: `TODO` }" >
          <div class="columns">
            <div class="column sow-overview">
              <div><strong>Strengths</strong></div>
              <div class="sow-item" v-for="strength in strengths" :key="strength.id">
                <span class="sow-strength">+</span> {{ strength.description }}
              </div>
            </div>
            <div class="column sow-overview">
              <div><strong>Weaknesses</strong></div>
              <div class="sow-item" v-for="weakness in weaknesses" :key="weakness.id">
                <span class="sow-weakness">-</span> {{ weakness.description }}
              </div>
            </div>
          </div>
        </box>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box
          :title="'GROW information'"
          :action="{ title: (!proposal.grow) ? 'Add new grow' : 'Edit extisting grow', route: (!proposal.grow) ? `TODO: to create` : `TODO: to edit` }" >
          <div class="grow-information" v-if="proposal.grow">
            <div class="columns">
              <div class="column grow-information-goal">
                <div><strong>Goal</strong></div>
                {{ proposal.grow.goal }}
              </div>
              <div class="column grow-information-reality">
                <div><strong>Reality</strong></div>
                {{ proposal.grow.reality }}
              </div>
              <div class="column grow-information-opportunities">
                <div><strong>Opportunity</strong></div>
                {{ proposal.grow.opportunity }}
              </div>
              <div class="column grow-information-will">
                <div><strong>Will</strong></div>
                {{ proposal.grow.will }}
              </div>
            </div>
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
      },
      strengths() {
        return this.proposal.strengthandweaknesses.filter((strengthandweakness) => strengthandweakness.type == 'strength')
      },
      weaknesses() {
        return this.proposal.strengthandweaknesses.filter((strengthandweakness) => strengthandweakness.type == 'weakness')
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
      async calculate() {
        await Proposal.calculate({ proposal_id: this.$route.params.proposal_id })
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

  .proposal-contact-type {
    color: $red;
    padding: 0.1rem 0.5rem;
    border-radius: 3px;
    margin-right: 0.5rem;
    font-size: 12px;
    border: 1px solid $red;
  }

  .proposal-contact-profession {
    color: $subtle-grey !important;
    margin-left: 0.25rem;
  }

  .proposal-competition, .proposal-smart-action, .grow-information {
    margin-bottom: 1rem;
    border: 1px solid $border-grey;
    background-color: $background-grey;
    padding: 0.8rem 1rem;
    font-size: 13px;
    .proposal-competition-company {
      margin-bottom: 0.65rem;
      font-weight: bold;
      border-bottom: 1px solid $border-grey;
      padding-bottom: 0.5rem;
    }
    strong {
      font-weight: 500;
    }
  }

  .sow-item {
    padding: 0.5rem 1rem;
    border: 1px solid $border-grey;
    background-color: $background-grey;
    margin-bottom: 1rem;
    span {
      margin-right: 0.5rem;
      display: inline-block;
      &.sow-strength {
        color: $positive-green;
      }
      &.sow-weakness {
        color: $red;
      }
    }
  }

  .sow-overview {
    strong {
      display: inline-block;
      margin-bottom: 1rem;
    }
  }

</style>

