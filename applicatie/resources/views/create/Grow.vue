<template>
  <modal-create-edit :entity="'Grow'">
    <field v-model="grow.goal" :name="'Goal'" :size="'full'" :validation="'optional'" />
    <field v-model="grow.reality" :name="'Reality'" :size="'full'" :validation="'optional'" />
    <field v-model="grow.opportunity" :name="'Opportunity'" :size="'full'" :validation="'optional'" />
    <field v-model="grow.will" :name="'Will'" :size="'full'" :validation="'optional'" />
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
