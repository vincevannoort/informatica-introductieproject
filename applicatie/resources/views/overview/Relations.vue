<template>
  <div>
    <main-view-title :title="'Relations'" />
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
      <box-relations
        :title="'Relations'"
        :action="{ title: 'Add new relation', route: '/relations/create' }"
        :relations="sortedRelations" />
    </div>
  </div>
</template>

<script>
  import BoxRelationsComponent from '../../components/BoxRelations'
  import BoxRelationComponent from '../../components/BoxRelation'
  import RelationsGraphComponent from '../../components/graphs/RelationsGraph'
  import Relation from '../../controllers/RelationController'

  export default {
    components: {
      'relations-graph': RelationsGraphComponent,
      'box-relations': BoxRelationsComponent,
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
        return this.relations.filter((relation) => relation.insight_total > 75 && relation.insight_total <= 100).length
      },
      secondCategoryRelations: function() {
        return this.relations.filter((relation) => relation.insight_total > 50 && relation.insight_total < 75).length
      },
      thirdCategoryRelations: function() {
        return this.relations.filter((relation) => relation.insight_total >= 0 && relation.insight_total < 50).length
      }
    },
    activated() {
      this.index()
    },
    methods: {
      async index() {
        try {
          this.relations = await Relation.index()
        } catch(error) {
          console.log(error)
        }
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
