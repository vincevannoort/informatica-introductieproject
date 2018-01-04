<template>
  <div class="form-proposal-create-edit">
    <main-view-title :title="(createView) ? `Create a new proposal` : `Edit existing proposal`" />
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
              <div class="field column is-full">
                <label class="label">Value</label>
                <div class="control has-icons-left">
                  <input v-validate="'required'" v-model="proposal.value" :class="{'input': true, 'is-danger': errors.has('value') }" type="number" name="value" placeholder="Value">
                  <span class="icon is-left">
                    <i class="fa fa-eur" />
                  </span>
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Start</label>
                <div class="control">
                  <input v-validate="'required'" v-model="proposal.start" :class="{'input': true, 'is-danger': errors.has('start') }" type="date" name="start" placeholder="Start date">
                </div>
              </div>
              <div class="field column is-half">
                <label class="label">Close</label>
                <div class="control">
                  <input v-validate="'required'" v-model="proposal.close" :class="{'input': true, 'is-danger': errors.has('start') }" type="date" name="close" placeholder="Close date">
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
                <button v-else-if="editView" class="button is-link" @click.prevent="update">Update</button>
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
  import Proposal from '../../controllers/ProposalController'

  export default {
    data() {
      return {
        proposal: {
          name: '',
          value: '',
          start: '',
          close: ''
        },
        relation: {},
        selectedContacts: []
      }
    },
    computed: {
      fieldsHaveValuesCreate() {
        for (var field in this.fields) {
          if (!this.fields[field].touched) {
            return false
          }
        }
        return true
      },
      fieldsValidatedCreate() {
        return this.fieldsHaveValuesCreate && this.errors.items.length == 0
      },
      createView() {
        return this.$route.name == 'proposals-create'
      },
      editView() {
        return this.$route.name == 'proposals-edit'
      }
    },
    activated() {
      this.getRelationFromContact()
      if (this.editView) {
        this.show()
      }
    },
    methods: {
      async getRelationFromContact() {
        try {
          this.relation = await Relation.show({ relation_id: this.$route.params.relation_id })
        } catch(error) {
          console.log(error)
        }
      },
      async show() {
        try {
          this.proposal = await Proposal.show({ proposal_id: this.$route.params.proposal_id })
        } catch(error) {
          console.error(error)
        }
      },
      async store() {
        try {
          const proposal = await Proposal.store({ proposal: this.proposal, relation_id: this.$route.params.relation_id, contact_ids: this.selectedContacts })
          // go to the newly create proposal page after storing it
          this.$router.push({ name: 'proposals-single', params: { relation_id: this.$route.params.relation_id, proposal_id: proposal.id } })
        } catch(error) {
          console.error()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables/colors";
  .proposal-responsible-contacts {
    margin-bottom: 1rem;
  }
  .proposal-responsible-contact {
    // padding-top: 0.5rem;
    // padding-bottom: 0.5rem;
    padding-bottom: 0 !important;
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
