<template>
  <div>
    <main-view-title :title="(createView) ? `Create a new proposal` : `Edit existing proposal`"></main-view-title>
    <div class="columns">
      <div class="column is-two-thirds">
        <box :title="'Proposal data'">
          <form @submit.prevent="store">
            <div class="columns is-multiline">
              <div class="field column is-full">
                <label class="label">Name</label>
                <div class="control">
                  <input v-validate="'required'" v-model="proposal.name" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" name="name" placeholder="Name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Name</label>
                <div class="control">
                  <input v-validate="'required'" v-model="proposal.name" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" name="name" placeholder="Name">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Name</label>
                <div class="control">
                  <input v-validate="'required'" v-model="proposal.name" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" name="name" placeholder="Name">
                </div>
              </div>
              <div class="proposal-responsible-contacts field column is-full">
                <label class="label">Responsible contacts</label>
                <div class="columns is-multiline">
                  <div class="proposal-responsible-contact column is-half control" v-for="contact in relation.contacts" :key="contact.id">
                    <label class="checkbox"><input type="checkbox" v-model="selectedContacts" :value="contact.id"><span>{{ contact.profession }}</span>{{ contact.first_name }} {{ contact.last_name }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <hr>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button v-if="createView" class="button is-link" @click.prevent="store" :disabled="!fieldsValidatedCreate">Create</button>
                <button v-else-if="editView" class="button is-link" @click.prevent="update" :disabled="!fieldsValidatedUpdate">Update</button>
              </div>
              <div class="control">
                <button v-if="createView" class="button is-text" @click.prevent="backcreate">Cancel</button>
                <button v-else-if="editView" class="button is-text" @click.prevent="backupdate">Cancel</button>
              </div>
            </div>
          </form>
        </box>
      </div>
    </div>
  </div>
</template>

<script>
  import Relation from '../../controllers/RelationController'

  export default{
    data(){
      return {
        proposal: {
          name: ''
        },
        relation: {},
        selectedContacts: []
      }
    },
    computed: {
      createView() {
        return this.$route.name == 'proposals-create'
      },
      editView() {
        return this.$route.name == 'proposals-edit'
      }
    },
    activated() {
      this.getRelation()
    },
    methods: {
      async getRelation() {
        try {
          this.relation = await Relation.show({ relation_id: this.$route.params.relation_id })
        } catch(error) {
          console.error(error)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables/colors";
  .proposal-responsible-contacts {

  }
  .proposal-responsible-contact {
    padding-bottom: 0;
    input {
      margin-right: 1rem;
    }
    span {
      color: $red;
      font-weight: bold;
      &:after {
        color: $grey;
        font-weight: normal;
        content: '-';
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
    }
  }
</style>
