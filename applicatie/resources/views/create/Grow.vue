<template>
  <modal-create-edit :entity="'Grow'">
    <field v-model="grow.goal" :name="'Goal'" :size="'full'" />
    <field v-model="grow.reality" :name="'Reality'" :size="'full'" />
    <field v-model="grow.opportunity" :name="'Opportunity'" :size="'full'" />
    <field v-model="grow.will" :name="'Will'" :size="'full'" />
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
