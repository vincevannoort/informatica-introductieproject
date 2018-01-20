<template>
  <modal-create-edit :entity="'Need for change'">
    <field v-model="needforchange.value" :name="'Value'" :size="'full'" :validation="'required'" :field-type="'select'" :options="['low', 'medium', 'high']" />
    <field v-model="needforchange.clarification" :name="'Clarification'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return {
      needforchange: {
        value: '',
        clarification: ''
      }
    }
  }
}
</script>
