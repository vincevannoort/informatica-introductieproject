<template>
  <box :title="title" :action="action">
    <template v-if="proposals && proposals.length">
      <router-link class="relation-proposal" tag="div" v-for="proposal in proposals" :key="proposal.id" :to="`/relations/${$route.params.relation_id}/proposals/${proposal.id}`">
        <div class="relation-proposal-header">
          <span>€{{ proposal.value }}</span>{{ proposal.name }}
        </div>
        <div class="relation-proposal-body">
          <table>
            <thead>
              <tr>
                <th>Involved contacts</th>
                <th>Last updated</th>
                <th>Start</th>
                <th>Close</th>
                <th>Insight</th>
                <th class="table-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="relation-proposal-contacts" v-if="proposal.contacts && proposal.contacts.length">
                    <div v-for="contact in proposal.contacts" :key="contact.id">
                      <i class="proposal-contact-type" v-for="role in contact.roles" :key="role.id">{{ role.type }}</i>
                      <span>{{ contact.information.profession }}</span>
                      - {{ contact.information.first_name }} {{ contact.information.last_name }}
                    </div>
                  </div>
                  <div v-else>
                    No contacts added yet
                  </div>
                </td>
                <td class="relation-proposal-dates">
                  <div>
                    <div>{{ proposal.updated_at | moment("from") }}</div>
                  </div>
                </td>
                <td>{{ proposal.start | moment("from") }}</td>
                <td>{{ proposal.close | moment("from") }}</td>
                <td>
                  <div class="relations-insight">
                    <div class="relations-insight-bar" :style="{ width: (proposal.insight / 10) + '%' }" />
                  </div>
                </td>
                <td>
                  <buttons-edit-remove
                    @edit-button-pressed="editProposal(proposal)"
                    @remove-button-pressed="removeProposal(proposal)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </router-link>
    </template>
    <template v-else>
      No proposals added yet
    </template>
  </box>
</template>

<script>
  export default{
    props: {
      title: {
        type: String,
        default: 'Define a title for this box'
      },
      action: {
        type: Object,
        required: false,
        default: () => ({ title: 'Define a title for this box', route: 'Define a route for this action' })
      },
      proposals: {
        type: Array,
        default: () => {}
      }
    },
    methods: {
      editProposal(proposal) {
        this.$emit('edit-proposal', proposal)
      },
      removeProposal(proposal) {
        this.$emit('remove-proposal', proposal)
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";

  .relation-proposal {
    cursor: pointer;
    border: 1px solid $border-grey;
    background-color: $background-grey;
    width: 100%;
    margin-bottom: 20px;
    font-size: 13px;
    transition: all 0.15s ease-in-out;

    .relation-proposal-header {
      padding: 0.5rem 1rem;
      border-bottom: 1px solid $border-grey;
      font-weight: 500;
      color: $almost-black;
      span {
        color: $red;
        text-transform: uppercase;
        &:after {
          content: '-';
          color: $almost-black;
          padding-left: 0.8rem;
          padding-right: 0.8rem;
        }
      }
    }

    .relation-proposal-body {
      table {
        width: 100%;
        th {
          font-weight: 500;
        }
        tr {
          &:first-child th { border-top: 0; }
          &:last-child td { border-bottom: 0; }
          td:first-child, th:first-child { border-left: 0; }
          td:last-child, th:last-child { border-right: 0; }

          td:nth-of-type(1) { width: 35%; }
          td:nth-of-type(5) { width: 25%; }
        }
        th, td {
          border: 1px solid $border-inside-grey;
        }
      }
    }

    th, td {
      padding: 0.5rem 1rem;
    }

    &:hover {
      border: 1px solid $red;
      background-color: transparentize($red, 0.96);
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.25);
    }
  }

  .relation-proposal-dates {
    > div {
      margin-bottom: 1rem;
      &:last-of-type { margin-bottom: 0; }
    }
  }

  .relation-proposal-contacts {
    > div {
      margin-bottom: 0.65rem;
      &:last-of-type { margin-bottom: 0.35rem; }
    }
    span {
      color: $subtle-grey;
    }
  }

  .table-actions {
    text-align: right;
  }
</style>
