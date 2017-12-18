<template>
  <div>
    <main-view-title :title="(createView) ? `Create a new relation` : `Edit existing relation`"></main-view-title>
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
            </div>
            <div class="field">
              <hr>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button v-if="createView" class="button is-link" @click.prevent="store">Create</button>
                <button v-else-if="editView" class="button is-link" @click.prevent="update">Update</button>
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
    computed: {
      createView() {
        return this.$route.name == 'relations-create'
      },
      editView() {
        return this.$route.name == 'relations-edit'
      }
    },
    created() {
      if (this.editView) {
        this.show()
      }
    },
    methods: {
      async show() {
        try {
          this.company = await Company.show({ relation_id: this.$route.params.relation_id })
        } catch(error) {
          console.error(error)
        }
      },
      async store() {
        try {
          await Company.store({ company: this.company })
          this.$router.push({ name: 'relations-overview' })
        } catch(error) {
          console.error(error)
        }
      },
      async update() {
        try {
          await Company.update({ company: this.company })
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } catch(error) {
          console.error(error)
        }
      }
    }
  }
</script>