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
                  <input v-validate="'required'" v-model="contact.profession" :class="{'input': true, 'is-danger': errors.has('profession') }" type="text" name="profession" placeholder="Profession">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">First name</label>
                <div class="control">
                  <input v-validate="'required'" v-model="contact.first_name" :class="{'input': true, 'is-danger': errors.has('first_name') }" type="text" name="first_name" placeholder="First name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Last name</label>
                <div class="control">
                  <input v-validate="'required'" v-model="contact.last_name" :class="{'input': true, 'is-danger': errors.has('last_name') }" type="text" name="last_name" placeholder="Last name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Telephone</label>
                <div class="control">
                  <input v-validate="'required'" v-model="contact.telephone" :class="{'input': true, 'is-danger': errors.has('telephone') }" type="text" name="telephone" placeholder="Telephone">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Email</label>
                <div class="control">
                  <input v-validate="'required|email'" v-model="contact.email" :class="{'input': true, 'is-danger': errors.has('email') }" type="email" name="email" placeholder="Email">
                </div>
              </div>
            </div>
            <div class="field">
              <hr>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" @click.prevent="storeContact" :disabled="!fieldsValidated">Create</button>
              </div>
              <div class="control">
                <button class="button is-text" @click.prevent="back">Cancel</button>
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
    computed: {
      fieldsHaveValues() {
        for (var field in this.fields) {
          if (!this.fields[field].touched) {
            return false
          }
        }
        return true
      },
      fieldsValidated() {
        return this.fieldsHaveValues && this.errors.items.length == 0
      }
    },
    methods: {
      storeContact() {
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
      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>