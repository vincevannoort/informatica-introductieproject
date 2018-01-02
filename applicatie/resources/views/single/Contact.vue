<template>
  <div>
    <main-view-title
      :title="`${contact.first_name} ${contact.last_name}`"
      :back="`back to ${currentRelationName}`"
      @back="back"
      @edit="edit"
      @remove="remove" />
    <div class="columns">
      <div class="column">
        <box :title="'Contact information'">
          information
        </box>
        <div class="columns">
          <div class="column">
            <box :title="'Notes'">
              information
            </box>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <box :title="'Influence'">
              information
            </box>
          </div>
          <div class="column">
            <box :title="'Need for change'">
              information
            </box>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <box :title="'Social profile'">
          information
        </box>
      </div>
    </div>
  </div>
</template>

<script>
  import Contact from '../../controllers/ContactController'

  export default {
    name: 'Contact',
    data() {
      return { contact: {} }
    },
    computed: {
      currentRelationName() {
        let self = this
        if (this.contact.relations && this.contact.relations.length) {
          return this.contact.relations.find((relation) => { return relation.id == self.$route.params.relation_id }).name
        } else { return 'loading...' }
      }
    },
    activated() {
      this.show()
    },
    methods: {
      back() {
        this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
      },
      async show() {
        try {
          this.contact = await Contact.show({ contact_id: this.$route.params.contact_id })
        } catch(error) {
          console.error(error)
        }
      },
      async edit() {
        this.$router.push({ name: 'contacts-edit', params: { relation_id: this.$route.params.relation_id, contact_id: this.$route.params.contact_id } })
      },
      async remove() {
        try {
          await Contact.destroy({ contact_id: this.$route.params.contact_id })
          this.showDeletedSuccess()
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } catch(error) {
          this.showDeletedError()
          console.error(error)
        }
      }
    },
    notifications: {
      showDeletedSuccess: {
        title: 'Deleted contact',
        message: 'Deleted contact successfully',
        type: 'success'
      },
      showDeletedError: {
        title: 'Deleted contact',
        message: 'Not able to delete contact',
        type: 'error'
      }
    }
  }
</script>
