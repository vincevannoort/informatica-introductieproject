<template>
  <div>
    <main-view-title :title="'Create a new contact'"></main-view-title>
    <div class="columns">
      <div class="column is-two-thirds">
        <box :title="'Company data'">
          <form @submit.prevent="storeContact">
            <div class="columns is-multiline">
              <div class="field column is-half">
                <label class="label">Profession</label>
                <div class="control">
                  <input v-model="contact.profession" class="input" type="text" placeholder="Profression">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">First name</label>
                <div class="control">
                  <input v-model="contact.first_name" class="input" type="text" placeholder="First name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Last name</label>
                <div class="control">
                  <input v-model="contact.last_name" class="input" type="text" placeholder="Last name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Telephone</label>
                <div class="control">
                  <input v-model="contact.telephone" class="input" type="text" placeholder="Telephone">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Email</label>
                <div class="control">
                  <input v-model="contact.email" class="input" type="text" placeholder="Email">
                </div>
              </div>
            </div>
            <div class="field">
              <hr>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" @click.prevent="storeContact">Create</button>
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
  export default{
    data(){
      return {
        contact: {
          profession: '',
          first_name: '',
          last_name: '',
          telephone: '',
          email: '',
        }
      }
    },
    methods: {
      storeContact() {
        console.log('storing contact')

        var self = this
        axios.post(`/api/contacts/`, {
          contact: self.contact,
          company_id: self.$route.params.id
        })
        .then(function (response) {
          self.$router.push({ name: 'relations-single', params: { id: self.$route.params.id } })
        })
        .catch(function (error) {
          console.log(error.response)
        })
      }
    }
  }
</script>