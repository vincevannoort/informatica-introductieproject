<template>
  <box :title="title" :action="action">
    <router-link class="relation-proposal" tag="table" v-for="proposal in this.proposals" :key="proposal.id" :to="`/relations/${$route.params.relation_id}/proposals/${proposal.id}`">
      <thead>
        <tr>
          <td><span>{{ proposal.name }}</span></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="columns">
              <div class="column">
                <div class="relation-proposal-contacts" v-if="proposal.contacts && proposal.contacts.length">
                  <div>
                    <strong>Responsible contact</strong>
                    <div v-for="contact in proposal.contacts" :key="contact.id">
                      {{ contact.profession }} | {{ contact.first_name }} {{ contact.last_name }}
                    </div>
                  </div>
                  <div>
                    <strong>Other contacts</strong>
                    <div v-for="contact in proposal.contacts" :key="contact.id">
                      {{ contact.profession }} | {{ contact.first_name }} {{ contact.last_name }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  No contacts added yet
                </div>
              </div>
              <div class="relation-proposal-dates column">
                <div>
                  <div><strong>Started</strong></div>
                  <div>{{ proposal.created_at | moment("from") }}</div>
                </div>
                <div>
                  <div><strong>Last updated</strong></div>
                  <div>{{ proposal.updated_at | moment("from") }}</div>
                </div>
                <div>
                  <div><strong>End date</strong></div>
                  <div>{{ proposal.created_at | moment("from") }}</div>
                </div>
              </div>
              <div class="column">TODO: other information</div>
              <div class="column">TODO: insights</div>
            </div>
          </td>
        </tr>
      </tbody>
    </router-link>
  </box>
</template>

<script>
  export default{
    props: ['title', 'action', 'proposals']
  }
</script>

<style lang="scss">
  .relation-proposal-dates {
    > div {
      margin-bottom: 1rem;
    }
  }
  .relation-proposal-contacts {
    > div {
      margin-bottom: 1rem;
    }
  }
</style>