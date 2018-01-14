<template>
  <modal class="is-active">
    <h2>{{ (createView) ? `Create a new ${entity}` : `Edit existing ${entity}` }}</h2>
    <box>
      <div class="form-contact-create-edit">
        <form @submit.prevent="store">
          <div class="columns is-multiline">
            <slot />
          </div>
          <div class="field">
            <hr>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button v-if="createView" class="button is-link" @click.prevent="store" :disabled="!validated">Create</button>
              <button v-else-if="editView" class="button is-link" @click.prevent="update" :disabled="!validated">Update</button>
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
export default {
  props: {
    entity: {
      default: 'type',
      type: String
    },
    validated: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    createView() {
      return this.$route.meta.type === 'create'
    },
    editView() {
      return this.$route.meta.type === 'edit'
    }
  },
  created() {
    if(this.createView) {
      this.$emit('init-create')
    }
    if(this.editView) {
      this.$emit('init-edit')
    }
  },
  methods: {
    store() {
      this.$emit('store')
    },
    update() {
      this.$emit('update')
    },
    back() {
      console.log('back emitted')
      this.$emit('back')
    }
  }
}
</script>
