<template>
  <modal-create-edit
    :entity="'Relation'"
    @init-edit="show"
    @store="store"
    @update="update"
    @back="back">
    <field v-model="relation.name" :name="'Name'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
  import Relation from '../../services/RelationService'

  export default {
    data() {
      return { relation: { name: '' } }
    },
    computed: {
      createView() {
        return this.$route.meta.type === 'create'
      },
      editView() {
        return this.$route.meta.type === 'edit'
      }
    },
    mounted() {
      if (this.editView) {
        this.show()
      }
    },
    methods: {
      async show() {
        this.relation = await Relation.show({ relation_id: this.$route.params.relation_id })
      },
      async store() {
        const relation = await Relation.store({ relation: this.relation })
        this.$emit('created-relation', relation)
        this.back()
      },
      async update() {
        const relation = await Relation.update({ relation: this.relation })
        this.$emit('refetch')
        this.back()
      },
      back() {
        if (this.createView) {
          this.$router.push({ name: 'relations-overview' })
        } else if (this.editView) {
          this.$router.push({ name: 'relations-single', params: { relation_id: this.$route.params.relation_id } })
        }
      }
    }
  }
</script>
