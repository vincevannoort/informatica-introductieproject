<template>
  <div>
    <main-view-title :title="'Relations'"></main-view-title>
    <div>
      <div class="columns">
        <div class="column is-one-third">
          <box-relation :amount="firstCategoryRelations" :title="'Relation insight 75% - 100%'"></box-relation>
          <box-relation :amount="secondCategoryRelations" :title="'Relation insight 50% - 74%'"></box-relation>
          <box-relation :amount="thirdCategoryRelations" :title="'Relation insight 0% - 49%'"></box-relation>
        </div>
        <div class="column is-two-third">
          <box :title="'Statistics'">
            todo: display statistics here
          </box>
        </div>
      </div>
      <box-relations 
      :title="'Relations'" 
      :action="{ title: 'Add new relation', route: '/relations/create' }" 
      :relations="sortedRelations"></box-relations>
    </div>
  </div>
</template>

<script>
  import Relation from '../../controllers/RelationController'

  export default{
    data() {
      return {
        relations: [],
      }
    },
    computed: {
      sortedRelations: function() {
        return this.relations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      },
      firstCategoryRelations: function() {
        return this.relations.filter((relation) => relation.insight_total > 75 && relation.insight_total <= 100).length
      },
      secondCategoryRelations: function() {
        return this.relations.filter((relation) => relation.insight_total > 50 && relation.insight_total < 75).length
      },
      thirdCategoryRelations: function() {
        return this.relations.filter((relation) => relation.insight_total >= 0 && relation.insight_total < 50).length
      },
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