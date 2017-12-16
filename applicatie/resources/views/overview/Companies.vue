<template>
  <div>
    <main-view-title :title="'Relations'"></main-view-title>
    <div>
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
      }
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