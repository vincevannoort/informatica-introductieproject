<template>
  <modal-create-edit
    :entity="'Role'"
    @init-create="getRoles"
    @store="store">
    <field v-model="role.type" :name="'Role'" :size="'full'" :validation="'required'" :field-type="'select'" :options="rolesAvailables" />
  </modal-create-edit>
</template>

<script>
import Proposal from '../../services/ProposalService'

export default {
  props: {
    contacts: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return { role: { type: '' } }
  },
  computed: {
    currentContact() {
      return (this.contacts) ? this.contacts.find((contact) => contact.id == this.$route.params.contact_id) : {}
    },
    currentContactRoles() {
      return (this.currentContact) ? this.currentContact.roles.map((role) => role.type) : []
    },
    rolesAvailables() {
      const roles = ['chief', 'user', 'expert', 'ambassador']
      return roles.filter((role) => !this.currentContactRoles.includes(role))
    }
  },
  methods: {
    async getRoles() {
      console.log('getting roles')
    },
    async store() {
      await Proposal.storeRole({
        proposal_id: this.$route.params.proposal_id,
        contact_id: this.$route.params.contact_id,
        role: this.role
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
