<template>
  <div>
    <main-view-title :title="'Relations'"></main-view-title>
    <div>
      <box-companies :title="'Companies'" :companies="companies"></box-companies>
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
    created() {
      var self = this;
      axios.get('/api/companies')
      .then(function (response) {
        self.companies = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
</script>