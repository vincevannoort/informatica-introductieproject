<template>
  <box :title="title">
    <div class="relations-table">
    <table style="width: 100%;">
      <tr>
        <th>Company</th>
        <th>Since</th>
        <th>Insight</th>
      </tr>
      <router-link tag="tr" v-for="company in companies" :key="company.id" :to="`/relations/${ company.id }`">
        <td>{{ company.name }}</td>
        <td>{{ company.created_at | moment("from") }}</td>
        <td>
          <div class="relations-insight">
            <div class="relations-insight-bar" :style="{ width: company.insight_total + '%' }"></div>
          </div>
        </td>
      </router-link>
    </table>
    </div>
  </box>
</template>

<script>
  export default{
    props: ['title', 'companies']
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";
  .relations-table {
    border: 1px solid $border-grey; max-height: 385px; overflow: scroll;
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