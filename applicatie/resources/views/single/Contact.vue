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
          <table class="table-contact-information">
            <tr>
              <td>Profession: </td>
              <td>{{ contact.profession }}</td>
            </tr>
            <tr>
              <td>Telephone: </td>
              <td>{{ contact.telephone }}</td>
            </tr>
            <tr>
              <td>Emailaddress: </td>
              <td>{{ contact.email }}</td>
            </tr>
          </table>
        </box>
        <div class="columns">
          <div class="column">
            <box :title="'Notes'">
              <div class="notes-tables">
                <table class="table-contact-information" v-for="note in contact.notes" :key="note.id">
                  <tr>
                    <td>Description: </td>
                    <td>{{ note.description }}</td>
                  </tr>
                  <tr>
                    <td>Date: </td>
                    <td>{{ note.date }}</td>
                  </tr>
                  <tr>
                    <td>Name: </td>
                    <td>{{ note.user.first_name }} {{ note.user.last_name }}</td>
                  </tr>
                </table>
              </div>
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
    <transition name="fade-up" mode="out-in">
      <router-view
        @updated-contact="updateContact"
      />
    </transition>
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
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        } catch(error) {
          console.error(error)
        }
      },
      updateContact(contact) {
        this.contact = contact
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables/colors";

  .table-contact-information {
    width: 100%;
    background-color: $border-inside-grey;
    border: 1px solid $border-grey;
    tr {
      td {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        white-space: nowrap;
        &:last-of-type {
          padding-left: 2rem;
          text-align: left;
          padding-right: 0.5rem;
          width: 100%;
        }
      }
    }
  }

  .notes-tables {
    border-bottom: 1px solid $border-grey;
    &:last-of-type {
      border-bottom: none;
    }
  }
</style>
