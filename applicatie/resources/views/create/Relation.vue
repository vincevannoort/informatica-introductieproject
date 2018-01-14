<template>
  <modal-create-edit
    :entity="'relation'"
    @init-edit="show"
    @store="store"
    @update="update"
    @back="back">
    <field v-model="relation.name" :name="'Name'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>

<script>
  import Relation from '../../controllers/RelationController'

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
        try {
          this.relation = await Relation.show({ relation_id: this.$route.params.relation_id })
        } catch(error) {
          console.error(error)
        }
      },
      async store() {
        try {
          const relation = await Relation.store({ relation: this.relation })
          this.$emit('created-relation', relation)
          this.back()
        } catch(error) {
          console.error(error)
        }
      },
      async update() {
        try {
          const relation = await Relation.update({ relation: this.relation })
          this.$emit('updated-relation', relation.data)
          this.back()
        } catch(error) {
          console.error(error)
        }
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
