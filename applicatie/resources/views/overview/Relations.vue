<template>
  <div>
    <main-view-title
      :title="'Relations'"
      :information="'List of relations with a short summary containing some basic information about the relation.'"
      @calculate="calculateAll" />
    <div>
      <div class="columns">
        <div class="relations-boxes column is-one-third">
          <box-relation :amount="firstCategoryRelations" :title="'Relation insight 75% - 100%'" />
          <box-relation :amount="secondCategoryRelations" :title="'Relation insight 50% - 74%'" />
          <box-relation :amount="thirdCategoryRelations" :title="'Relation insight 0% - 49%'" />
        </div>
        <div class="column is-two-third">
          <box :title="'Statistics'">
            <relations-graph :relations="relations" />
          </box>
        </div>
      </div>
      <box
        :title="'Relations'"
        :action="{ title: 'Add new relation', route: '/relations/create' }">
        <relations :relations="sortedRelations" />
      </box>
    </div>
    <transition name="fade-up" mode="out-in">
      <router-view
        @created-relation="addRelation"
      />
    </transition>
  </div>
</template>

<script>
  import BoxRelationsComponent from '../../components/BoxRelations'
  import BoxRelationComponent from '../../components/BoxRelation'
  import RelationsGraphComponent from '../../components/graphs/RelationsGraph'
  import Relation from '../../services/RelationService'

  export default {
    components: {
      'relations-graph': RelationsGraphComponent,
      'relations': BoxRelationsComponent,
      'box-relation': BoxRelationComponent
    },
    data() {
      return { relations: [] }
    },
    computed: {
      sortedRelations: function() {
        return this.relations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // eslint-disable-line vue/no-side-effects-in-computed-properties
      },
      firstCategoryRelations: function() {
        return this.relations.filter((relation) => relation.insight_total > 750 && relation.insight_total <= 1000).length
      },
      secondCategoryRelations: function() {
        return this.relations.filter((relation) => relation.insight_total > 500 && relation.insight_total < 750).length
      },
      thirdCategoryRelations: function() {
        return this.relations.filter((relation) => relation.insight_total >= 0 && relation.insight_total < 500).length
      }
    },
    activated() {
      this.index()
    },
    methods: {
      async index() {
        this.relations = await Relation.index()
      },
      async calculateAll() {
        await Relation.calculateAll()
      },
      addRelation(relation) {
        this.relations.push(relation)
      }
    }
  }
</script>

<style lang="scss">
  .relations-boxes {
    .box {
      height: auto;
    }
  }
</style>
