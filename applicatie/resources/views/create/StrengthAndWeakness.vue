<template>
  <modal-create-edit :entity="'Strength and weakness'">
    <field v-model="strengthandweakness.type" :name="'Type'" :size="'full'" :validation="'required'" :field-type="'select'" :options="['strength', 'weakness']" />
    <field v-model="strengthandweakness.description" :name="'Description'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return {
      strengthandweakness: {
        type: '',
        description: ''
      }
    }
  }
}
</script>
