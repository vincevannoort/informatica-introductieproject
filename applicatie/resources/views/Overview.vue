<template>
    <div class="main-content-wrapper columns is-gapless">
      <div class="column is-3 sidebar-content">
        <sidebar></sidebar>
      </div>
      <div class="column is-9 main-content">
        <div class="main-inner-content">
          <transition name="fade" mode="out-in">
            <keep-alive exclude="relation">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
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