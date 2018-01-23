<template>
  <div>
    <main-view-title :title="'Users'" />
    <box-users
      :title="'Users'"
      :users="users"
      :action="{ title: 'Add new user', route: '/users/create' }"/>
    <transition name="fade-up" mode="out-in">
      <router-view
        @created-user="addUser"
      />
    </transition>
  </div>
</template>

<script>
import BoxUsersComponent from '../../components/BoxUsers'
import User from '../../services/UserService'

export default {
  components: { 'box-users': BoxUsersComponent },
  data() {
    return { users: [] }
  },
  activated() {
    this.index()
  },
  methods: {
    async index() {
      this.users = await User.index()
    },
    async addUser() {
      console.log('add user')
    }
  }
}
</script>
