<template>
  <modal-create-edit :entity="'Grow'">
    <field v-model="grow.goal" :name="'Goal'" :size="'half'" />
    <field v-model="grow.reality" :name="'Reality'" :size="'half'" />
    <field v-model="grow.opportunity" :name="'Opportunity'" :size="'half'" />
    <field v-model="grow.will" :name="'Will'" :size="'half'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return {
      grow: {
        goal: '',
        reality: '',
        opportunity: '',
        will: ''
      }
    }
  }
}
</script>
