<template>
  <div>
    <main-view-title :title="'Relations'"></main-view-title>
    <div>
      <div class="columns">
        <div class="column is-one-third">
          <box-company :amount="firstCategoryCompanies" :title="'Relation insight 75% - 100%'"></box-company>
          <box-company :amount="secondCategoryCompanies" :title="'Relation insight 50% - 74%'"></box-company>
          <box-company :amount="thirdCategoryCompanies" :title="'Relation insight 0% - 49%'"></box-company>
        </div>
        <div class="column is-two-third">
          <box :title="'Statistics'">
            todo: display statistics here
          </box>
        </div>
      </div>
      <box-companies 
      :title="'Companies'" 
      :action="{ title: 'Add new company', route: '/relations/create' }" 
      :companies="sortedCompanies"></box-companies>
    </div>
  </div>
</template>

<script>
  import Company from '../../controllers/CompanyController'

  export default{
    data(){
      return {
        companies: [],
      }
    },
    computed: {
      sortedCompanies: function() {
        return this.companies.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      },
      firstCategoryCompanies: function() {
        return this.companies.filter((company) => company.insight_total > 75 && company.insight_total <= 100).length
      },
      secondCategoryCompanies: function() {
        return this.companies.filter((company) => company.insight_total > 50 && company.insight_total < 75).length
      },
      thirdCategoryCompanies: function() {
        return this.companies.filter((company) => company.insight_total >= 0 && company.insight_total < 50).length
      },
    },
    activated() {
      this.index()
    },
    methods: {
      async index() {
        try {
          this.companies = await Company.index()
        } catch(error) {
          console.log(error)
        }
      }
    }
  }
</script>