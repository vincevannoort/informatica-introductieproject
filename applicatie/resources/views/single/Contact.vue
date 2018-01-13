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
              <div class="contact-impact-value">
                {{ influence.value }}
              </div>
              <div class="box-header box-header-sub">
                Clarification
              </div>
              <div class="contact-clarification">
                {{ influence.clarification }}
              </div>
            </box>
          </div>
          <div class="column">
            <box :title="'Need for change'" v-for="needforchange in contact.needforchanges" :key="needforchange.id">
              <div class="contact-impact-value">
                {{ needforchange.value }}
              </div>
              <div class="box-header box-header-sub">
                Clarification
              </div>
              <div class="contact-clarification">
                {{ needforchange.clarification }}
              </div>
            </box>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <box :title="'Social profile'" class="social-profile">
          <div class="profile-picture">
            <icon-relation />
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
    border: 1px solid $border-grey;
    background-color: $background-grey;
    margin-bottom: 1rem;
    tr {
      td {
        padding: 0.5rem 1rem;
        white-space: nowrap;
        border-bottom: 1px solid lighten($border-grey, 5%);
        &:first-of-type {
          opacity: 0.7;
        }
        &:last-of-type {
          padding: auto 0.5rem auto 1.5rem;
          width: 100%;
        }
      }
    }
  }

  .box-header.box-header-sub {
    margin-top: 1rem;
  }

  .contact-impact-value {
    border: 1px solid $border-grey;
    background-color: $background-grey;
    padding: 0.5rem 1rem;
    color: $red;
  }

  .contact-clarification {
    border: 1px solid $border-grey;
    background-color: $background-grey;
    padding: 0.5rem 1rem;
  }

  .social-profile {
    height: auto !important;
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }

  .profile-picture {
    height: 180px;
    width: 180px;
    border-radius: 100%;
    border: 1px solid $border-grey;
    background-color: $background-grey;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      height: 70px;
      width: 70px;
      * {
        fill: darken($border-grey, 30%);
      }
    }
  }

  .social-media {
    display: flex;
    justify-content: center;
    padding-top: 1.5rem;
  }
</style>
