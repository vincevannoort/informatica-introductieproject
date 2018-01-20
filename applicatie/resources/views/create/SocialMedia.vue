<template>
  <modal-create-edit :entity="'Social media'">
    <field v-model="socialmedia.type" :name="'Type'" :size="'full'" :validation="'required'" :field-type="'select'" :options="['facebook', 'twitter', 'linkedin']" />
    <field v-model="socialmedia.url" :name="'Url'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return {
      socialmedia: {
        type: '',
        url: ''
      }
    }
  }
}
</script>
