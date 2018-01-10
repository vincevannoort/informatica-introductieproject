<template>
  <box :title="title" :action="action">
    <div class="relation-contacts">
      <div v-if="contacts && contacts.length">
        <router-link class="relation-contact" tag="div" v-for="contact in contacts" :key="contact.id" :to="`/relations/${$route.params.relation_id}/contacts/${contact.id}`">
          <table>
            <tr>
              <th><span>{{ contact.profession }}</span>{{ contact.first_name }} {{ contact.last_name }}</th>
              <th>Need for change</th>
              <th>Invidual influence</th>
              <th>Social media</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td>
                <table>
                  <tr v-if="contact.telephone">
                    <td>Telefoon:</td>
                    <td>{{ contact.telephone }}</td>
                  </tr>
                  <tr v-if="contact.email">
                    <td>Emailadres:</td>
                    <td>{{ contact.email }}</td>
                  </tr>
                </table>
              </td>
              <td>low</td>
              <td>medium</td>
              <td>
                <social-media />
              </td>
              <td>
                <buttons-edit-remove
                  @edit-button-pressed="editContact(contact)"
                  @remove-button-pressed="removeContact(contact)"
                />
              </td>
            </tr>
          </table>
        </router-link>
      </div>
      <div v-else>
        No contacts added yet
      </div>
    </div>
  </box>
</template>

<script>
  import SocialMediaComponent from './SocialMedia'

  export default {
    components: { 'social-media': SocialMediaComponent },
    props: {
      title: {
        type: String,
        default: ''
      },
      action: {
        type: Object,
        required: false,
        default: () => ({ title: '', route: '' })
      },
      contacts: {
        type: Array,
        default: () => {}
      }
    },
    methods: {
      editContact(contact) {
        this.$emit('edit-contact', contact)
      },
      removeContact(contact) {
        this.$emit('remove-contact', contact)
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";
  .relation-contact {
    cursor: pointer;
    border: 1px solid $border-grey;
    background-color: $background-grey;
    transition: all 0.15s ease-in-out;
    margin-bottom: 20px; &:last-of-type { margin-bottom: 0; }

    &:hover {
      border: 1px solid $red;
      background-color: transparentize($red, 0.96);
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.25);
    }

    table {
      border-collapse: collapse;
      td, th {
        border: 1px solid $border-grey;
        font-size: 13px;
      }

      tr {
        &:first-child th { border-top: 0; }
        &:last-child td { border-bottom: 0; }
        td:first-child, th:first-child { border-left: 0; }
        td:last-child, th:last-child { border-right: 0; }
      }

      th {
        &:nth-of-type(1) { width: 40%; }
        &:first-of-type { white-space: nowrap; }
        &:last-of-type { text-align: right; }
      }

      width: 100%;
      th, td { padding: 0.5rem 1rem; }
      th {
        padding-bottom: 0.5rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        span {
          color: $red;
          &:after {
            content: '-';
            color: $almost-black;
            padding-left: 0.6rem;
            padding-right: 0.6rem;
          }
        }
      }
      table {
        width: auto;
        td, th { border: none; padding: 0; }
        tr {
          padding-bottom: 0.25rem;
          &:last-of-type { padding-bottom: 0; }
        }
        td:first-of-type { opacity: 0.5; }
        td:last-of-type { padding-left: 1rem; }
      }
    }
  }
</style>
