<template>
  <modal-create-edit :entity="'Competition'">
    <field v-model="competition.company" :name="'Company name'" :size="'half'" :validation="'required'" />
    <field v-model="competition.grading" :name="'Grading'" :size="'half'" :validation="'required'" />
    <field v-model="competition.counter_proposal" :name="'Counter proposal'" :size="'half'" :validation="'required'" />
    <field v-model="competition.position" :name="'Position'" :size="'half'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
export default {
  data() {
    return {
      competition: {
        company: '',
        grading: '',
        counter_proposal: '',
        position: ''
      }
    }
  }
}
</script>

