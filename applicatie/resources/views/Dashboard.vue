<template>
	<main-view>
    <main-view-title title="Dashboard"></main-view-title>
  </main-view>
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