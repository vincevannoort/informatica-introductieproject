<template>
  <box :title="title" :action="action">
    <div class="relations-table">
      <table style="width: 100%;">
        <tr>
          <th>Name</th>
          <th>Profession</th>
          <th>Username</th>
          <th>Email</th>
          <th>Created</th>
          <th class="table-actions">Actions</th>
        </tr>
        <router-link tag="tr" v-for="user in users" :key="user.id" :to="`/users/${ user.id }`">
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>{{ user.profession }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.created_at | moment("from") }}</td>
          <td>
            <buttons-edit-remove
              @edit-button-pressed="editUser(user)"
              @remove-button-pressed="removeUser(user)"
            />
          </td>
        </router-link>
      </table>
    </div>
  </box>
</template>

<script>
export default {
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
    users: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    editUser() {
      console.log('editing user')
    },
    removeUser() {
      console.log('removing user')
    }
  }
}
</script>
