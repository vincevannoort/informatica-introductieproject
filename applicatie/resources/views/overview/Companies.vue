<template>
  <div>
    <main-view-title :title="'Relations'"></main-view-title>
    <div>
      <box-companies :title="'Companies'" :action="{ title: 'Add new company', route: '/relations/create' }" :companies="sortedCompanies"></box-companies>
    </div>
  </div>
</template>

<script>
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
    created() {
      this.getCompanies()
    },
    activated() {
      this.getCompanies()
    },
    methods: {
      getCompanies() {
        var self = this
        axios.get('/api/companies')
        .then(function (response) {
          self.companies = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>