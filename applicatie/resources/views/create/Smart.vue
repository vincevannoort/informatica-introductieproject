<template>
  <modal-create-edit :entity="'Smart'">
    <field v-model="smart.action" :name="'Action'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return { smart: { smart_action: '' } }
  }
}
</script>
