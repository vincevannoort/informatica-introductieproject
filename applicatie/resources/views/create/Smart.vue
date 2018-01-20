<template>
  <modal-create-edit :entity="'Smart'">
    <field v-model="smart.action" :name="'action'" :size="'full'" :validation="'optional'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return { smart: { smart_action: '' } }
  }
}
</script>
