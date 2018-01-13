<template>
  <div>
    <main-view-title
      :title="`${contact.first_name} ${contact.last_name}`"
      :back="`back to ${currentRelationName}`"
      @back="back"
      @edit="edit"
      @remove="remove" />
    <div class="columns">
      <div class="column is-9">
        <box :title="'Contact information'" class="contact-information">
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
            <box :title="'Influence'" v-for="influence in contact.influences" :key="influence.id">
              <div class="influence-value">
                {{ influence.value }}
              </div>
              <div class="box-header box-header-sub">
                Clarification
              </div>
              <div class="influence-clarification">
                {{ influence.clarification }}
              </div>
            </box>
          </div>
          <div class="column">
            <box :title="'Need for change'" v-for="needforchange in contact.needforchanges" :key="needforchange.id">
              <div class="needforchange-value">
                {{ needforchange.value }}
              </div>
              <div class="box-header box-header-sub">
                Clarification
              </div>
              <div class="needforchange-clarification">
                {{ needforchange.clarification }}
              </div>
            </box>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <box :title="'Social profile'" class="social-profile">
          <div class="profile-picture">
            <img src="../../assets/images/user.svg">
          </div>
          <div class="social-media">
            <social-media />
          </div>
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
  import SocialMediaComponent from '../../components/SocialMedia'

  export default {
    name: 'Contact',
    components: { 'social-media': SocialMediaComponent },
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

  .contact-information {
    height: auto !important;
  }

  .table-contact-information {
    width: 100%;
    background-color: $border-inside-grey;
    border: 1px solid $border-grey;
    margin-bottom: 1rem;
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
          white-space: normal;
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

  .influence-value {
    border: 1px solid $border-grey;
    background-color: $border-inside-grey;
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    color: $red;
  }

  .needforchange-value {
    border: 1px solid $border-grey;
    background-color: $border-inside-grey;
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    color: $red;
  }

  .box-header.box-header-sub {
    margin-top: 1rem;
  }

  .influence-clarification {
    border: 1px solid $border-grey;
    background-color: $border-inside-grey;
    padding: 0.5rem;
  }

  .needforchange-clarification {
    border: 1px solid $border-grey;
    background-color: $border-inside-grey;
    padding: 0.5rem;
  }

  .social-profile {
    height: auto !important;
  }

  .profile-picture {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 270px;
      width: 100%;
    }
  }

  .social-media {
    padding-top: 1.5rem;
  }
</style>
