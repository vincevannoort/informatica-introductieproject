<template>
  <div>

    <main-view-title
      :title="relation.name"
      :back="'back to relations'"
      @back="back"
      @calculate="calculate"
      @edit="edit"
      @remove="remove" />

    <div class="columns">
      <div class="column is-10">
        <box
          :title="'Contacts'"
          :information="'List of persons within the company. These persons can be linked to a proposal and can also be found there.'"
          :action="{ title: 'Add new contact', route: `/relations/${relation.id}/contacts/create` }">
          <contacts
            :contacts="relation.contacts"
            @edit-contact="editContact"
            @remove-contact="removeContact" />
        </box>
      </div>
      <div class="relation-insight-sidebox column is-2">
        <insight-bar :insight="relation.insight_total" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <box
          :title="'Relation information'"
          :information="'Short overview of the relation/proposal insight and value'">
          <template v-if="relation.proposals && relation.proposals.length">
            <table class="table-relation-information">
              <tr>
                <td>Total value: </td>
                <td>&euro;{{ totalValue }}</td>
              </tr>
              <tr>
                <td>Average value: </td>
                <td>&euro;{{ averageValue }}</td>
              </tr>
              <tr>
                <td>Average insight: </td>
                <td>{{ averageInsight }}</td>
              </tr>
            </table>
          </template>
          <template v-else>
            <p>No proposal has been added yet. Add a proposal below to see information about proposals here.</p>
          </template>
        </box>
      </div>
      <div class="column">
        <box
          :title="'The customer business window'"
          :information="'Short overview of the business. In this overview you will find the objectives, the organisation, the philosophy and the product.'"
          :action="{
            title: (!relation.businesswindow) ? 'Add new customer business window' : 'Edit extisting customer business window',
            route: (!relation.businesswindow) ? `/relations/${this.$route.params.relation_id}/customerbusinesswindow/create` : `/relations/${this.$route.params.relation_id}/customerbusinesswindow/edit` }">
          <template v-if="relation.businesswindow">
            <div class="relation-grow" >
              <div class="columns is-multiline">
                <div class="column is-6">
                  <div><strong>Objectives</strong></div>
                  <div>{{ relation.businesswindow.objectives }}</div>
                </div>
                <div class="column is-6">
                  <div><strong>Organisation</strong></div>
                  <div>{{ relation.businesswindow.organisation }}</div>
                </div>
                <div class="column is-6">
                  <div><strong>Philosophy</strong></div>
                  <div>{{ relation.businesswindow.philosophy }}</div>
                </div>
                <div class="column is-6">
                  <div><strong>Products</strong></div>
                  <div>{{ relation.businesswindow.products }}</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <p>No customer business window information is added yet, add a customer business window information by clicking the 'Add new customer business window' button.</p>
          </template>
        </box>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <box
          :title="'Strengths and Weaknesses'"
          :information="'This is where you put in the strengths and weaknesses of the company in question. Please fill in the strong and weak points of the company in question.'"
          :action="{ title: 'Add new strength or weakness', route: `/relations/${this.$route.params.relation_id}/strengths-and-weaknesses/create` }" >
          <template v-if="strengths && strengths.length || weaknesses && weaknesses.length">
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
          </template>
          <template v-else>
            <p>No strengths or weaknesses are added yet, add a strength or weakness by clicking the 'Add new strength or weakness' button.</p>
          </template>
        </box>
      </div>
    </div>

    <box
      :title="'Proposals'"
      :information="'List of the active proposals. Each proposal has a short summary containing information about the proposal such as the roles and the value.'"
      :action="{ title: 'Add new proposal', route: `/relations/${relation.id}/proposals/create` }">
      <proposals
        :proposals="relation.proposals"
        @edit-proposal="editProposal"
        @remove-proposal="removeProposal" />
    </box>

    <transition name="fade-up" mode="out-in">
      <router-view @refetch="show" />
    </transition>
  </div>
</template>

<script>
  import BoxContactsComponent from '../../components/BoxContacts'
  import BoxProposalsComponent from '../../components/BoxProposals'
  import InsightBarComponent from '../../components/InsightBar'
  import Relation from '../../services/RelationService'
  import Contact from '../../services/ContactService'
  import Proposal from '../../services/ProposalService'

  export default {
    name: 'Relation',
    components: {
      'contacts': BoxContactsComponent,
      'proposals': BoxProposalsComponent,
      'insight-bar': InsightBarComponent
    },
    data() {
      return { relation: {} }
    },
    computed: {
      proposalsLoaded() {
        return this.relation.proposals && this.relation.proposals.length
      },
      totalValue() {
        return (this.proposalsLoaded) ? this.relation.proposals.reduce((total, proposal) => total + proposal.value, 0) : 0
      },
      averageValue() {
        return  (this.proposalsLoaded) ? Math.floor(this.totalValue / this.relation.proposals.length) : 0
      },
      averageInsight() {
        return (this.proposalsLoaded) ? Math.floor(this.relation.proposals.reduce((total, proposal) => total + proposal.insight, 0) /  this.relation.proposals.length) : 0
      },
      strengths() {
        return (this.relation.strengthandweaknesses) ? this.relation.strengthandweaknesses.filter((strengthandweakness) => strengthandweakness.type == 'strength') : []
      },
      weaknesses() {
        return (this.relation.strengthandweaknesses) ? this.relation.strengthandweaknesses.filter((strengthandweakness) => strengthandweakness.type == 'weakness') : []
      }
    },
    activated() {
      this.show()
    },
    methods: {
      back() {
        this.$router.push({ name: 'relations-overview' })
      },
      async show() {
        this.relation = await Relation.show({ relation_id: this.$route.params.relation_id })
      },
      async edit() {
        this.$router.push({ name: 'relations-edit', params: { relation_id: this.$route.params.relation_id } })
      },
      async remove() {
        await Relation.destroy({ relation_id: this.$route.params.relation_id })
        this.$router.push({ name: 'relations-overview' })
      },
      async calculate() {
        await Relation.calculate({ relation_id: this.$route.params.relation_id })
      },
      updateRelation(relation) {
        this.relation = relation
      },
      addContact(contact) {
        this.relation.contacts.push(contact)
      },
      editContact(contact) {
        this.$router.push({ name: 'contacts-edit-from-relation', params: { relation_id: this.$route.params.relation_id, contact_id: contact.id } })
      },
      async removeContact(contact) {
        await Contact.destroy({ contact_id: contact.id })
        const index = this.relation.contacts.indexOf(contact)
        this.relation.contacts.splice(index, 1)
      },
      addProposal(proposal) {
        this.relation.proposals.push(proposal)
      },
      editProposal(proposal) {
        this.$router.push({ name: 'proposals-edit-from-relation', params: { relation_id: this.$route.params.relation_id, proposal_id: proposal.id } })
      },
      async removeProposal(proposal) {
        await Proposal.destroy({ proposal_id: proposal.id })
        const index = this.relation.proposals.indexOf(proposal)
        this.relation.proposals.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables/colors";

  .relation-insight {
    display: inline-block;
    width: 12px;
    border-radius: 10px;
    height: 100%;
    background-color: darken($background-grey, 6%);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  .relation-insight-bar {
    float: left;
    width: 12px;
    border-radius: 10px;
    background: linear-gradient(to top, lighten($red, 20%) 0%, $red 100%)
  }

  .relation-insight-sidebox {
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

  .table-relation-information {
    width: 100%;
    tr {
      td {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        text-align: right;
        border-bottom: 1px solid $border-grey;
      }
      &:last-of-type { td { border-bottom: none; } }
      td:first-of-type {
        text-align: left;
        padding-right: 1rem;
        font-weight: 500;
      }
    }
  }
</style>
