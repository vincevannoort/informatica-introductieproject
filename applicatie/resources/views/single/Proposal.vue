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
        <box
          :title="'Internal power and sources'"
          :information="'List of contacts within the company. It includes their position in the company and some other information about them.'"
          :action="{ title: 'Add new contact to proposal', route: `/relations/${this.$route.params.relation_id}/proposals/${this.$route.params.proposal_id}/contacts/create` }" >
          <template v-if="proposal.contacts && proposal.contacts.length">
            <div class="relation-contact" v-for="contact in proposal.contacts" :key="contact.id">
              <table>
                <tr :data-proposal-contact-tr="`${contact.information.first_name} ${contact.information.last_name}`">
                  <th class="proposal-contact-roles">
                    <router-link :to="`/relations/${$route.params.relation_id}/proposals/${$route.params.proposal_id}/contacts/${contact.id}/roles/create`" :data-proposal-contact="`${contact.information.first_name} ${contact.information.last_name}`" class="add-proposal-contact-type">+ add role</router-link>
                    <i class="proposal-contact-type" v-for="role in contact.roles" :key="role.id">{{ role.type }}</i>
                    <span class="proposal-contact-profession">{{ contact.information.profession }}</span>
                    {{ contact.information.first_name }} {{ contact.information.last_name }}
                  </th>
                  <th>Need for change</th>
                  <th>Invidual influence</th>
                  <th>actions</th>
                </tr>
                <tr>
                  <td>information</td>
                  <td class="td-align-center">{{ (contact.information.needforchanges[0]) ? contact.information.needforchanges[0].value : 'not set' }}</td>
                  <td class="td-align-center">{{ (contact.information.influences[0]) ? contact.information.influences[0].value : 'not set' }}</td>
                  <td>
                    <buttons-edit-remove
                      @removeButtonPressed="removeContact(contact)"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </template>
          <template v-else>
            <p>No contacts are added to this proposal yet, add a contact to this proposal by clicking the 'Add new contact to proposal' button.</p>
          </template>
        </box>
      </div>
      <div class="proposal-insight-sidebox column is-2">
        <insight-bar :insight="proposal.insight" />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box
          :title="'Position and competition'"
          :information="'List of counter proposals with some information which includes a grading, comparing their proposal to yours, the name of the company, the company’s position and their counterproposal summarised.'"
          :action="{ title: 'Add new counter proposal', route: `/relations/${this.$route.params.relation_id}/proposals/${this.$route.params.proposal_id}/position-and-competition/create` }" >
          <template v-if="proposal.competitions && proposal.competitions.length">
            <div class="proposal-competition" v-for="competition in proposal.competitions" :key="competition.id">
              <div class="proposal-competition-company"><span>{{ competition.grading }}</span>{{ competition.company }}</div>
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
          </template>
          <template v-else>
            <p>No competitor is added to this proposal yet, add a competitor to this proposal by clicking the 'Add new counter proposal' button.</p>
          </template>
        </box>
      </div>
      <div class="column">
        <box
          :title="'SMART actions'"
          :information="'This is where you put possible actions to ensure that you would win the proposal.'"
          :action="{ title: 'Add new smart action', route: `/relations/${this.$route.params.relation_id}/proposals/${this.$route.params.proposal_id}/smart-actions/create` }" >
          <template v-if="proposal.actions && proposal.actions.length">
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
          </template>
          <template v-else>
            <p>No action is added to this proposal yet, add a action to this proposal by clicking the 'Add new smart action' button.</p>
          </template>
        </box>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box
          :title="'Strengths and Weaknesses'"
          :information="'This is where you put in the strengths and weaknesses of the proposal in question. Please fill in the strong and weak points of the proposal in question.'"
          :action="{ title: 'Add new strength or weakness', route: `/relations/${this.$route.params.relation_id}/proposals/${this.$route.params.proposal_id}/strengths-and-weaknesses/create` }" >
          <template v-if="strengths && strengths.length || weaknesses && weaknesses.length">
            <div class="columns">
              <div class="column sow-overview">
                <div><strong>Strengths</strong></div>
                <template v-if="strengths && strengths.length">
                  <div class="sow-item" v-for="strength in strengths" :key="strength.id">
                    <span class="sow-strength">+</span> {{ strength.description }}
                  </div>
                </template>
                <template v-else>
                  <p>No strengths added yet.</p>
                </template>
              </div>
              <div class="column sow-overview">
                <div><strong>Weaknesses</strong></div>
                <template v-if="weaknesses && weaknesses.length">
                  <div class="sow-item" v-for="weakness in weaknesses" :key="weakness.id">
                    <span class="sow-weakness">-</span> {{ weakness.description }}
                  </div>
                </template>
                <template v-else>
                  <p>No weaknesses added yet.</p>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <p>No strengths or weaknesses are added yet, add a strength or weakness by clicking the 'Add new strength or weakness' button.</p>
          </template>
        </box>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box
          :title="'GROW information'"
          :information="'This is where you put in the Goal, Reality, Opportunity and Will of the company in question. With this information you will have a better view of the company which makes negotiations easier. The goal is where you put information on what the aim of the company is in general.'"
          :action="{
            title: (!proposal.grow) ? 'Add new grow' : 'Edit extisting grow',
            route: (!proposal.grow) ? `/relations/${this.$route.params.relation_id}/proposals/${this.$route.params.proposal_id}/grow/create` : `/relations/${this.$route.params.relation_id}/proposals/${this.$route.params.proposal_id}/grow/edit` }">
          <template v-if="proposal.grow">
            <div class="grow-information">
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
          </template>
          <template v-else>
            <p>No grow information is added yet, add grow information by clicking the 'Add new grow' button.</p>
          </template>
        </box>
      </div>
    </div>
    <transition name="fade-up" mode="out-in">
      <router-view
        :proposal="proposal"
        :relation="proposal.relation"
        :contacts="proposal.contacts"
        @refetch="show" />
    </transition>
  </div>
</template>

<script>
  import InsightBarComponent from '../../components/InsightBar'
  import Proposal from '../../services/ProposalService'

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
        return (this.proposal.strengthandweaknesses) ? this.proposal.strengthandweaknesses.filter((strengthandweakness) => strengthandweakness.type == 'strength') : []
      },
      weaknesses() {
        return  (this.proposal.strengthandweaknesses) ? this.proposal.strengthandweaknesses.filter((strengthandweakness) => strengthandweakness.type == 'weakness') : []
      },
      route() {
        return this.$route
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
        this.proposal = await Proposal.show({ proposal_id: this.$route.params.proposal_id })
      },
      async calculate() {
        await Proposal.calculate({ proposal_id: this.$route.params.proposal_id })
        // this.$router.push({ name: 'proposals-insight', params: { relation_id: this.$route.params.relation_id, proposal_id: this.$route.params.proposal_id } })
      },
      async edit() {
        this.$router.push({ name: 'proposals-edit', params: { relation_id: this.$route.params.relation_id, proposal_id: this.$route.params.proposal_id } })
      },
      async remove() {
        await Proposal.destroy({ proposal_id: this.$route.params.proposal_id })
        this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
      },
      async editContact() {

      },
      async removeContact(contact) {
        await Proposal.removeContact({
          proposal_id: this.$route.params.proposal_id,
          contact_id: contact.information.id
        })
        const index = this.proposal.contacts.indexOf(contact)
        this.proposal.contacts.splice(index, 1)
      },
      gradingAsText(grade) {
        switch(grade) {
          case 0:
            return 'much better'
            break
          case 1:
            return 'better'
            break
          case 2:
            return 'equal'
            break
          case 3:
            return 'worse'
            break
          case 4:
            return 'much worse'
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables/colors";

  .proposal-contact-type, .add-proposal-contact-type {
    color: $red;
    padding: 0.1rem 0.5rem;
    border-radius: 3px;
    margin-right: 0.5rem;
    font-size: 12px;
    border: 1px solid $red;
  }

  .add-proposal-contact-type {
    display: none;
    color: darken($border-grey, 25%);
    border: 1px solid darken($border-grey, 25%);
    max-width: 0;
  }

  .relation-contact:hover {
    .add-proposal-contact-type {
      display: inline;
    }
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
      border-bottom: 1px solid $border-grey;
      padding-bottom: 0.5rem;
      font-weight: bold;
      span {
        color: $red;
        &:after {
          content: '-';
          color: $almost-black;
          padding-left: 0.6rem;
          padding-right: 0.6rem;
        }
      }
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

  .proposal-insight-sidebox {
    max-height: 600px;
    > .box {
      display: flex;
      flex-direction: column;

      > div {
        flex: 1 1 auto;
      }
      > .box-header-wrapper {
        flex: 0 1 auto;
      }
    }
  }

  th.proposal-contact-roles {
    width: 45% !important;
  }

</style>

