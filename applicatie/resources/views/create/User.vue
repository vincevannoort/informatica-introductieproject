<template>
  <modal-create-edit :entity="'User'">
    <field v-model="user.profession" :name="'Profession'" :size="'full'" :validation="'required'" />
    <field v-model="user.first_name" :name="'First name'" :size="'half'" :validation="'required'" />
    <field v-model="user.last_name" :name="'Last name'" :size="'half'" :validation="'required'" />
    <field v-model="user.email" :name="'E-mail'" :size="'half'" :validation="'required|email'" />
    <field v-model="user.password" :name="'Password'" :size="'half'" :validation="'required'" :field-type="'password'" />
  </modal-create-edit>
</template>

<script>
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
  }
}
</script>
