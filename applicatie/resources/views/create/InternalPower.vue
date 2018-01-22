<template>
  <modal-create-edit
    :entity="'Internal Power'"
    @store="store">
    <field v-model="contact" :name="'Value'" :size="'full'" :validation="'required'" :field-type="'select'" :options="contactNames" />
  </modal-create-edit>
</template>

<script>
import Relation from '../../services/RelationService'
import Proposal from '../../services/ProposalService'

export default {
  props: {
    relation: {
      type: Object,
      required: true,
      default: () => {}
    },
    proposal: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return { contact: '' }
  },
  computed: {
    relationContactList() {
      return (this.relation) ? this.relation.contacts : []
    },
    proposalContactList() {
      return (this.proposal) ? this.proposal.contacts : []
    },
    proposalContactIds() {
      return this.proposalContactList.map((contact) => contact.contact_id)
    },
    contactNames() {
      return this.relationContactList
      // filter contacts that already exist
      .filter((contact) => !this.proposalContactIds.includes(contact.id))
      .map((contact) => `${contact.first_name} ${contact.last_name}`)
    }
  },
  methods: {
    async store() {
      const selectedContact = this.relationContactList.find((contact) => `${contact.first_name} ${contact.last_name}` == this.contact)
      await Proposal.storeContact({
        proposal_id: this.$route.params.proposal_id,
        contact_id: selectedContact.id
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
