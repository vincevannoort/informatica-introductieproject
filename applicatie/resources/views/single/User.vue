<template>
  <div>
    <main-view-title
      :title="`${user.first_name} ${user.last_name}`"
      :back="`back to users`"
      @back="back" />
    <div class="columns">
      <div class="column is-9">
        <box :title="'User information'" class="user-information">
          <table class="table-user-information">
            <tr>
              <td>Username: </td>
              <td>{{ user.username }}</td>
            </tr>
            <tr>
              <td>Profession: </td>
              <td>{{ user.profession }}</td>
            </tr>
            <tr>
              <td>Emailaddress: </td>
              <td>{{ user.email }}</td>
            </tr>
          </table>
        </box>
      </div>
    </div>
  </div>
</template>

<script>
  import User from '../../controllers/UserController'

  export default {
    name: 'User',
    data() {
      return { user: {} }
    },
    activated() {
      this.show()
    },
    methods: {
      back() {
        this.$router.push({ name: 'users-overview' })
      },
      async show() {
        try {
          this.user = await User.show({ user_id: this.$route.params.user_id })
        } catch(error) {
          console.error(error)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables/colors";

  .user-information {
    height: auto !important;
  }

  .table-user-information {
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
</style>
