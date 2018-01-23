<template>
  <modal-create-edit 
    :entity="'User'"
    @store="store">
    <field v-model="user.profession" :name="'Profession'" :size="'full'" :validation="'required'" />
    <field v-model="user.first_name" :name="'First name'" :size="'half'" :validation="'required'" />
    <field v-model="user.last_name" :name="'Last name'" :size="'half'" :validation="'required'" />
    <field v-model="user.email" :name="'E-mail'" :size="'half'" :validation="'required|email'" />
    <field v-model="user.password" :name="'Password'" :size="'half'" :validation="'required'" :field-type="'password'" />
  </modal-create-edit>
</template>

<script>
import User from '../../services/UserService'

export default {
  data() {
    return {
      user: {
        profession: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async store() {
      await User.store({ user: this.user })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
