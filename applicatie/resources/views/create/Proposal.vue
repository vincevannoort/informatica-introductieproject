<template>
  <modal-create-edit
    :entity="'Proposal'"
    @init-edit="show"
    @store="store"
    @update="update"
    @back="back">
    <field v-model="proposal.name" :name="'Name'" :size="'full'" :validation="'required'" />
    <field v-model="proposal.value" :name="'Value'" :size="'full'" :validation="'required'" />
    <field v-model="proposal.start" :name="'Start'" :size="'half'" :validation="'required'" :field-type="'date'" />
    <field v-model="proposal.close" :name="'Close'" :size="'half'" :validation="'required'" :field-type="'date'"/>
  </modal-create-edit>
</template>

<script>
  import Relation from '../../services/RelationService'
  import Proposal from '../../services/ProposalService'

  export default {
    data() {
      return {
        proposal: {
          name: '',
          value: '',
          start: '',
          close: ''
        }
      }
    },
    methods: {
      async show() {
        this.proposal = await Proposal.show({ proposal_id: this.$route.params.proposal_id })
        this.proposal.contacts.map(contact => this.selectedContacts.push(contact.id))
      },
      async store() {
        const proposal = await Proposal.store({ proposal: this.proposal, relation_id: this.$route.params.relation_id })
        this.$emit('created-proposal', proposal)
        this.back()
      },
      async update() {
        console.log('hello?')
      },
      back() {
        const viewType = this.$route.meta.type
        if (this.$route.name === 'proposals-edit-from-proposals') {
          this.$router.push({ name: 'proposals-overview' })
        } if (viewType == 'create'|| this.$route.name === 'proposals-edit-from-relation') {
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } else if (viewType == 'edit') {
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
