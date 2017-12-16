<template>
  <div>
    <main-view-title :title="'Create a new relation'"></main-view-title>
    <div class="columns">
      <div class="column is-two-thirds">
        <box :title="'Company data'">
          <form @submit.prevent="store">
            <div class="columns is-multiline">
              <div class="field column is-half">
                <label class="label">Name</label>
                <div class="control">
                  <input v-model="company.name" class="input" type="text" placeholder="Relation name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Dummy field</label>
                <div class="control">
                  <input v-model="company.name" class="input" type="text" placeholder="Relation name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Dummy field</label>
                <div class="control">
                  <input v-model="company.name" class="input" type="text" placeholder="Relation name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Dummy field</label>
                <div class="control">
                  <input v-model="company.name" class="input" type="text" placeholder="Relation name">
                </div>
              </div>
            </div>
            <div class="field">
              <hr>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" @click.prevent="store">Create</button>
              </div>
              <div class="control">
                <router-link tag="button" class="button is-text" :to="'/relations'">Cancel</router-link>
              </div>
            </div>
          </form>
        </box>
      </div>
    </div>
  </div>
</template>

<script>
  import Company from '../../controllers/CompanyController'

  export default{
    data(){
      return {
        company: {
          name: '',
        }
      }
    },
    methods: {
      async store() {
        try {
          await Company.store({ company: this.company })
          this.$router.push({ name: 'relations-overview' })
        } catch(error) {
          console.error(error)
        }
      }
    }
  }
</script>