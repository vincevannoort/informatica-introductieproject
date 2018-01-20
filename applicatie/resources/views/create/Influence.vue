<template>
  <modal-create-edit :entity="'Influence'">
    <field v-model="influence.value" :name="'Value'" :size="'full'" :validation="'optional'" />
    <field v-model="influence.clarification" :name="'Clarification'" :size="'full'" :validation="'optional'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return {
      influence: {
        value: '',
        clarification: ''
      }
    }
  }
}
</script>
