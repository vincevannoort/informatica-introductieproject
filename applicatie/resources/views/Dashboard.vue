<template>
	<section>
		<div class="logo"></div>
		<div class="title">Dashboard</div>
		<div class="subtitle"><p>AdonisJs simplicity will make you feel confident about your code</p></div>
    <div style="text-align: center; padding: 2rem;">
      <span style="display: inline-block; font-size: 0.8125rem; padding: 0.25rem; color: white; opacity: 0.3;" v-for="company in companies">{{ company.name }}</span>
    </div>
	</section>
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