<template>
  <modal class="is-active">
    <h2>{{ (createView) ? `Create a new relation` : `Edit existing relation` }}</h2>
    <box>
      <div class="form-relation-create-edit">
        <form @submit.prevent="store">
          <div class="columns is-multiline">
            <div class="field column is-half">
              <label class="label">Name</label>
              <div class="control">
                <input v-model="relation.name" name="name" class="input" type="text" placeholder="Relation name">
              </div>
            </div>
          </div>
          <div class="field">
            <hr>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button v-if="createView" class="button is-link" @click.prevent="store">Create</button>
              <button v-else-if="editView" class="button is-link" @click.prevent="update">Update</button>
            </div>
            <div class="control">
              <button class="button is-text" @click.prevent="back">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </box>
  </modal>
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
