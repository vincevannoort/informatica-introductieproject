<template>
  <div>
    <main-view-title
      :title="`Profile`"
      @edit="edit" />
    <div class="columns">
      <div class="column is-9">
        <box :title="'Contact information'" class="contact-information">
          <table class="table-contact-information">
            <tr>
              <td>Profession: </td>
              <td>{{ profile.profession }}</td>
            </tr>
            <tr>
              <td>First name: </td>
              <td>{{ profile.first_name }}</td>
            </tr>
            <tr>
              <td>Last name: </td>
              <td>{{ profile.last_name }}</td>
            </tr>
            <tr>
              <td>Username: </td>
              <td>{{ profile.username }}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{{ profile.email }}</td>
            </tr>
          </table>
        </box>
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
  </div>
</template>

<script>
  import SocialMediaComponent from '../../components/SocialMedia'

  export default {
    components: { 'social-media': SocialMediaComponent },
    data() {
      return {
        profile: {
          profession: '',
          first_name: '',
          last_name: '',
          username: '',
          email: ''
        }
      }
    },
    async activated() {
      this.profile = axios.get('/api/users/profile')
    },
    methods: {
      async edit() {
        console.log('TODO: EDIT PROFILE')
      }
    }
  }
</script>
