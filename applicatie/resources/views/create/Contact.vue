<template>
  <div>
    <main-view-title :title="(createView) ? `Create a new contact` : `Edit existing contact`"></main-view-title>
    <div class="columns">
      <div class="column is-two-thirds">
        <box :title="'Contact data'">
          <form @submit.prevent="store">
            <div class="columns is-multiline">
              <div class="field column is-full">
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
                <button v-if="createView" class="button is-link" @click.prevent="store" :disabled="!fieldsValidated">Create</button>
                <button v-else-if="editView" class="button is-link" @click.prevent="update" :disabled="!fieldsValidated">Update</button>
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
  import Contact from '../../controllers/ContactController'

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
      },
      createView() {
        return this.$route.name == 'contacts-create'
      },
      editView() {
        return this.$route.name == 'contacts-edit'
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
          this.contact = await Contact.show({ contact_id: this.$route.params.contact_id })
        } catch(error) {
          console.error(error)
        }
      },
      async store() {
        try {
          await Contact.store({ contact: this.contact, relation_id: this.$route.params.relation_id })
          this.showCreatedSuccess()
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } catch(error) {
          console.error(error)
        }
      },
      async update() {
        try {
          await Contact.update({ contact: this.contact })
          this.showEditedSuccess()
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } catch(error) {
          console.error(error)
        }
      },
      back() {
        this.$router.go(-1)
      }
    },
    notifications: {
      showCreatedSuccess: {
        title: 'Created contact',
        message: 'Created contact successfully',
        type: 'success'
      },
      showEditedSuccess: {
        title: 'Edited contact',
        message: 'Edited contact successfully',
        type: 'success'
      }
    }
  }
</script>
