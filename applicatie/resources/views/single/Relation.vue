<template>
  <div>

    <main-view-title
      :title="relation.name"
      :back="'back to relations'"
      @back="back"
      @edit="edit"
      @remove="remove" />

    <div class="columns">
      <div class="column is-10">
        <box-contacts
          :title="'Contacts'"
          :action="{ title: 'Add new contact', route: `/relations/${relation.id}/contacts/create` }"
          :contacts="relation.contacts" />
      </div>
      <div class="relation-insight-sidebox column is-2">
        <insight-bar :insight="relation.insight_total" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <box :title="'Relation information'">
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
        </box>
      </div>
      <div class="column">
        <box :title="'The customer business window'">
          information (objectives, product market service, philosophy, organisation)
        </box>
      </div>
      <div class="column">
        <box :title="'Strengths and Weaknesses'">
          information (leverage strengths, eliminate weaknesses)
        </box>
      </div>
    </div>

    <box-proposals :title="'Proposals'" :action="{ title: 'Add new proposal', route: `/relations/${relation.id}/proposals/create` }" :proposals="relation.proposals" />

    <transition name="fade" mode="out-in">
      <router-view
        @created-contact="addContact"
        @created-proposal="addProposal"
        @updated-relation="updateRelation"
      />
    </transition>
  </div>
</template>

<script>
  import BoxContactsComponent from '../../components/BoxContacts'
  import BoxProposalsComponent from '../../components/BoxProposals'
  import InsightBarComponent from '../../components/InsightBar'
  import Relation from '../../controllers/RelationController'

  export default {
    name: 'Relation',
    components: {
      'box-contacts': BoxContactsComponent,
      'box-proposals': BoxProposalsComponent,
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
        try {
          this.relation = await Relation.show({ relation_id: this.$route.params.relation_id })
        } catch(error) {
          console.error(error)
        }
      },
      async edit() {
        this.$router.push({ name: 'relations-edit', params: { relation_id: this.$route.params.relation_id } })
      },
      async remove() {
        try {
          await Relation.destroy({ relation_id: this.$route.params.relation_id })
          this.$router.push({ name: 'relations-overview' })
        } catch(error) {
          console.error(error)
        }
      },
      updateRelation(relation) {
        this.relation = relation
      },
      addContact(contact) {
        this.relation.contacts.push(contact)
      },
      addProposal(proposal) {
        this.relation.proposals.push(proposal)
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
  }

  .relation-insight-bar {
    float: left;
    width: 12px;
    border-radius: 10px;
    background: linear-gradient(to top, $red 0%,#ff0000 100%)
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
