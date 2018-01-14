<template>
  <modal-create-edit
    :entity="'proposal'"
    @init-edit="show"
    @store="store"
    @update="update"
    @back="back">
    <field :model="proposal.name" :name="'Name'" :size="'full'" :validation="'required'" />
    <field :model="proposal.value" :name="'Value'" :size="'full'" :validation="'required'" />
    <field :model="proposal.start" :name="'Start'" :size="'half'" :validation="'required|date'" :field-type="'date'" />
    <field :model="proposal.close" :name="'Close'" :size="'half'" :validation="'required'" :field-type="'date'"/>
    <div class="proposal-responsible-contacts field column is-full">
      <label class="label">Responsible contacts</label>
      <div class="columns is-multiline">
        <div class="proposal-responsible-contact column is-half control" v-for="contact in relation.contacts" :key="contact.id">
          <label class="checkbox"><input type="checkbox" v-model="selectedContacts" :value="contact.id"><span>{{ contact.profession }}</span>{{ contact.first_name }} {{ contact.last_name }}</label>
        </div>
      </div>
    </div>
  </modal-create-edit>
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
        return this.$route.meta.type === 'create'
      },
      editView() {
        return this.$route.meta.type === 'edit'
      }
    },
    mounted() {
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
          this.proposal.contacts.map(contact => this.selectedContacts.push(contact.id))
        } catch(error) {
          console.error(error)
        }
      },
      async store() {
        try {
          const proposal = await Proposal.store({ proposal: this.proposal, relation_id: this.$route.params.relation_id, contact_ids: this.selectedContacts })
          this.$emit('created-proposal', proposal)
          this.back()
        } catch(error) {
          console.error()
        }
      },
      back() {
        if (this.createView || this.$route.name === 'proposals-edit-from-relation') {
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } else if (this.editView) {
          this.$router.push({ name: 'proposals-single', params: { relation_id: this.$route.params.relation_id, proposal_id: this.$route.params.proposal_id } })
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
