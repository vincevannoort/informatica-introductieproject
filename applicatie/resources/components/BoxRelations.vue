<template>
  <box :title="title" :action="action">
    <div class="relations-table">
    <table style="width: 100%;">
      <tr>
        <th>Relation</th>
        <th>Since</th>
        <th>Insight</th>
      </tr>
      <router-link tag="tr" v-for="relation in relations" :key="relation.id" :to="`/relations/${ relation.id }`">
        <td>{{ relation.name }}</td>
        <td>{{ relation.created_at | moment("from") }}</td>
        <td>
          <div class="relations-insight">
            <div class="relations-insight-bar" :style="{ width: relation.insight_total + '%' }"></div>
          </div>
        </td>
      </router-link>
    </table>
    </div>
  </box>
</template>

<script>
  export default{
    props: ['title', 'action', 'relations']
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
</style>