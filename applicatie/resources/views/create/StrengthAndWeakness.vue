<template>
  <modal-create-edit :entity="'Strength and weakness'">
    <field v-model="strengthandweakness.type" :name="'TODO: TYPE!'" :size="'full'" :validation="'optional'" />
    <field v-model="strengthandweakness.description" :name="'description'" :size="'full'" :validation="'optional'" />
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
