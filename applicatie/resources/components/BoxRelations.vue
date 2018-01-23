<template>
  <div>
    <div class="relations-table-filter">
      <div class="columns">
        <div class="column">
          <div class="columns">
            <div class="column">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <strong>Sorted by: </strong>
                </div>
                <div class="field-body">
                  <div class="control">
                    <div class="select">
                      <select v-model="directionFilter">
                        <option value="insight_total-desc">Most insight</option>
                        <option value="insight_total-asc">Least insight</option>
                        <option value="value_total-desc">Highest value</option>
                        <option value="value_total-asc">Lowest value</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <strong>Filtered by: </strong>
                </div>
                <div class="field-body">
                  <div class="control">
                    <div class="select">
                      <select v-model="sortedFilter">
                        <option v-for="filter in sortedFilterData" :key="`${filter.min}-${filter.max}`" :value="filter">insight: {{ filter.min }} - {{ filter.max }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <strong>search: </strong>
            </div>
            <div class="field-body">
              <div class="control has-icons-right">
                <input class="relations-table-filter-input input" v-model="relationFilter" type="text" placeholder="Search for relation">
                <span class="icon is-right">
                  <i class="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relations-table">
      <table style="width: 100%;">
        <tr>
          <th>Relation</th>
          <th>Value</th>
          <th>Since</th>
          <th>Insight</th>
        </tr>
        <template v-if="sortedRelations && sortedRelations.length">
          <router-link tag="tr" :data-name="`${relation.name}`" v-for="relation in sortedRelations" :key="relation.id" :to="`/relations/${ relation.id }`">
            <td>{{ relation.name }}</td>
            <td>€{{ relation.value_total }}</td>
            <td>{{ relation.created_at | moment('from') }}</td>
            <td>
              <div class="relations-insight">
                <div class="relations-insight-bar" :style="{ width: (relation.insight_total/10) + '%' }" />
              </div>
            </td>
          </router-link>
        </template>
        <template v-else>
          <template v-if="relations && relations.length">
            <tr>
              <td>No relations found for '{{ relationFilter }}'.</td>
              <td />
              <td />
              <td />
            </tr>
          </template>
          <template v-else>
            <tr>
              <td>No relations added yet.</td>
              <td />
              <td />
              <td />
            </tr>
          </template>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
 import orderBy from 'lodash.orderby'

  export default {
    props: {
      relations: {
        type: Array,
        default: () => {}
      }
    },
    data() {
      return {
        relationFilter: '',
        directionFilter: 'insight_total-desc',
        sortedFilter: { min: 0, max: 1000 },
        sortedFilterData: [
          { min: 0, max: 1000 },
          { min: 0, max: 99 },
          { min: 100, max: 199 },
          { min: 200, max: 299 },
          { min: 300, max: 399 },
          { min: 400, max: 499 },
          { min: 500, max: 599 },
          { min: 600, max: 699 },
          { min: 700, max: 799 },
          { min: 800, max: 899 },
          { min: 900, max: 1000 }
        ]
      }
    },
    computed: {
      sortedRelations() {
        if (!(this.relations && this.relations.length)) { return [] }
        let filteredAmountRelations = this.relations.filter( item => item['insight_total'] >= this.sortedFilter.min && item['insight_total'] <= this.sortedFilter.max )
        let filteredNameRelations = (this.relationFilter) ? filteredAmountRelations.filter( item => item['name'].toLowerCase().includes(this.relationFilter.toLowerCase())) : filteredAmountRelations
        let filter = this.directionFilter.split('-')
        let column = filter[0]
        let direction = filter[1]
        return orderBy(filteredNameRelations, column, direction)
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";
  .relations-table {
    border: 1px solid $border-grey;
    th { background-color: $background-grey; padding: 0.5rem 1rem;
      &:nth-of-type(4) { width: 40%; }
    }
    tr {
      cursor: pointer;
      td { padding: 0.75rem 1rem; vertical-align: middle; white-space: nowrap; }
      &:not(:first-child):nth-of-type(odd) { background-color: $background-grey; border: 1px solid $background-grey; }
      &:not(:first-child):nth-of-type(even) { background-color: darken($background-grey, 2%); border: 1px solid $background-grey; }
      border-right: 1px solid $border-grey;
      &:not(:first-child):nth-of-type(2) { border-top: 1px solid $border-grey; }
      &:not(:first-child):hover { box-shadow: 0 10px 30px -10px rgba(0,0,0,0.25); border: 1px solid $red;
        td { background-color: transparentize($red, 0.96); border-top: 1px solid $red; }
      }
    }
  }

  .relations-insight {
    display: inline-block;
    height: 10px;
    border-radius: 10px;
    width: 100%;
    background-color: darken($background-grey, 6%);
    overflow: hidden;
  }

  .relations-insight-bar {
    float: left;
    height: 10px;
    border-radius: 10px;
    background: linear-gradient(to right, lighten($red, 20%) 0%, $red 100%);
  }

  .relations-table-filter {
    margin: 1rem 0 1.6rem 0;
    > .columns {
      align-items: center;
      justify-content: space-between;
      > .column {
        flex-grow: 0;
      }
    }
    .control  {
      width: 100%;
      input {
        height: 2.25em;
      }
    }
    .field-label strong {
      white-space: nowrap;
    }
  }

  .relations-table-filter-input {
    min-width: 190px;
  }
</style>
