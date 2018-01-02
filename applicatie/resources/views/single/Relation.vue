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
          information (total financial value, offerings)
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
</style>
