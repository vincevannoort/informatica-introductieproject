<template>
  <div>
    <main-view-title :title="'Dashboard'"></main-view-title>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        relations: [],
      }
    },
    created() {
      var self = this;
      axios.get('/api/relations')
      .then(function (response) {
        self.relations = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<style lang="scss">
  $main-padding: 60px;

  .main-content { 
    height: 100vh; 
    min-height: 100vh; 
    overflow: auto;
  }

  .main-inner-content {
    padding: $main-padding; 
  }
</style>