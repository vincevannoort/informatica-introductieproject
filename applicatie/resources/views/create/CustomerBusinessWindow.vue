<template>
  <modal-create-edit
    :entity="'Customer business window'"
    @init-edit="show"
    @store="store">
    <field v-model="customerbusinesswindow.objectives" :name="'Objectives'" :size="'full'" />
    <field v-model="customerbusinesswindow.organisation" :name="'Organisation'" :size="'full'" />
    <field v-model="customerbusinesswindow.philosophy" :name="'Philosophy'" :size="'full'" />
    <field v-model="customerbusinesswindow.products" :name="'Products'" :size="'full'" />
  </modal-create-edit>
</template>

<script>
import Relation from '../../services/RelationService'

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
  },
  methods: {
    async show() {
      this.customerbusinesswindow = await Relation.getCustomerBusinessWindow({ relation_id: this.$route.params.relation_id })
    },
    async store() {
      await Relation.storeCustomerBusinessWindow({
        relation_id: this.$route.params.relation_id,
        customerbusinesswindow: this.customerbusinesswindow
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
