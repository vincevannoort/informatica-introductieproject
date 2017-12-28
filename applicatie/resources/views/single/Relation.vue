<template>
  <div>

    <main-view-title
    :title="relation.name"
    :back="'back to relations'"
    @back="back"
    @edit="edit"
    @remove="remove"
    ></main-view-title>

    <div class="columns">
      <div class="column is-10">
        <box-contacts
        :title="'Contacts'"
        :action="{ title: 'Add new contact', route: `/relations/${relation.id}/contacts/create` }"
        :contacts="relation.contacts"></box-contacts>
      </div>
      <div class="relation-insight-sidebox column is-2">
        <box :title="'Insight'">
          <div class="columns">
            <div class="relation-insight-sidebox-list column">
              <ul>
                <li>Strongly supportive</li>
                <li>Supportive</li>
                <li>Interested</li>
                <li>Will go along</li>
                <li>Neutral</li>
                <li>Probably won't resist</li>
                <li>Uninterested</li>
                <li>Negative</li>
                <li>Very negative</li>
              </ul>
            </div>
            <div class="relation-insight-sidebox-bar column">
              <div class="relation-insight">
                <div class="relation-insight-bar" :style="{ height: relation.insight_total + '%' }"></div>
              </div>
            </div>
          </div>
        </box>
      </div>
    </div>

    <box-proposals :title="'Proposals'" :action="{ title: 'Add new proposal', route: `/relations/${relation.id}/proposals/create` }" :proposals="relation.proposals"></box-proposals>

  </div>
</template>

<script>
  import BoxContactsComponent from '../../components/BoxContacts'
  import BoxProposalsComponent from '../../components/BoxProposals'
  import Relation from '../../controllers/RelationController'

  export default {
    name: 'relation',
    components: { 
      'box-contacts': BoxContactsComponent,
      'box-proposals': BoxProposalsComponent
    },
    data(){
      return {
        relation: {}
      }
    },
    created() {
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
    display: inline-block;
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

  .relation-insight-sidebox-bar {
    display: flex;
    justify-content: flex-end;
  }

  .relation-insight-sidebox-list {
    display: flex;
    font-size: 13px;
    > ul {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }
</style>
