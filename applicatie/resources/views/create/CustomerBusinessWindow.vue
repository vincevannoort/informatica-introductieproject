<template>
  <modal-create-edit :entity="'Customer business window'">
    <field v-model="customerbusinesswindow.objectives" :name="'Objectives'" :size="'full'" :validation="'optional'" />
    <field v-model="customerbusinesswindow.organisation" :name="'Organisation'" :size="'full'" :validation="'optional'" />
    <field v-model="customerbusinesswindow.philosophy" :name="'Philosophy'" :size="'full'" :validation="'optional'" />
    <field v-model="customerbusinesswindow.products" :name="'Products'" :size="'full'" :validation="'optional'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return {
      customerbusinesswindow: {
        objectives: '',
        organisation: '',
        philosophy: '',
        products: ''
      }
    }
  }
}
</script>
