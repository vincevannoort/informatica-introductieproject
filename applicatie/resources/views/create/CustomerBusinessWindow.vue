<template>
  <modal-create-edit
    :entity="'Customer business window'"
    @init-edit="show"
    @store="store"
    @update="update">
    <field v-model="customerbusinesswindow.objectives" :name="'Objectives'" :size="'half'" :field-type="'textarea'" />
    <field v-model="customerbusinesswindow.organisation" :name="'Organisation'" :size="'half'" :field-type="'textarea'" />
    <field v-model="customerbusinesswindow.philosophy" :name="'Philosophy'" :size="'half'" :field-type="'textarea'" />
    <field v-model="customerbusinesswindow.products" :name="'Products'" :size="'half'" :field-type="'textarea'" />
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
    },
    async update() {
      await Relation.updateCustomerBusinessWindow({
        relation_id: this.$route.params.relation_id,
        customerbusinesswindow: this.customerbusinesswindow
      })
      this.$emit('refetch')
      this.$router.go(-1)
    }
  }
}
</script>
