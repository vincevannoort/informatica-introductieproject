<template>
  <box :title="title" :action="action">
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
                      <select>
                        <option>Most insight</option>
                        <option>Least insight</option>
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
                      <select>
                        <option>insight: 0% - 100%</option>
                        <option>insight: 0% - 9%</option>
                        <option>insight: 10% - 19%</option>
                        <option>insight: 20% - 29%</option>
                        <option>insight: 30% - 39%</option>
                        <option>insight: 40% - 49%</option>
                        <option>insight: 50% - 59%</option>
                        <option>insight: 60% - 69%</option>
                        <option>insight: 70% - 79%</option>
                        <option>insight: 80% - 89%</option>
                        <option>insight: 90% - 100%</option>
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
              <strong>categorie: </strong>
            </div>
            <div class="field-body">
              <div class="control has-icons-right">
                <input class="relations-table-filter-input input" v-model="relationFilter" type="text" placeholder="Search for relation">
                <span class="icon is-right">
                  <i class="fa fa-search"></i>
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
          <th>Since</th>
          <th>Insight</th>
        </tr>
        <template v-if="filteredRelations && filteredRelations.length">
          <router-link tag="tr" v-for="relation in filteredRelations" :key="relation.id" :to="`/relations/${ relation.id }`">
            <td>{{ relation.name }}</td>
            <td>{{ relation.created_at | moment("from") }}</td>
            <td>
              <div class="relations-insight">
                <div class="relations-insight-bar" :style="{ width: relation.insight_total + '%' }"></div>
              </div>
            </td>
          </router-link>
        </template>
        <template v-else>
          <template v-if="relations && relations.length">
            <tr>
              <td>No relations found for '{{ relationFilter }}'.</td>
              <td></td>
              <td></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td>No relations added yet.</td>
              <td></td>
              <td></td>
            </tr>
          </template>
        </template>
      </table>
    </div>
  </box>
</template>

<script>
  export default{
    props: ['title', 'action', 'relations'],
    data() {
      return {
        relationFilter: '',
      }
    },
    computed: {
      filteredRelations() {
        var self = this;
        // if there is a filter typed
        if (this.relationFilter) {
          return this.relations.filter(function(item) {
            return item['name'].toLowerCase().includes(self.relationFilter.toLowerCase())
          })
        } else {
          return this.relations
        }
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
      td { padding: 0.75rem 1rem; }
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
  }

  .relations-insight-bar {
    display: inline-block;
    float: left;
    height: 10px;
    border-radius: 10px;
    background: linear-gradient(to right, $red 0%,#ff0000 100%)
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