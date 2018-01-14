<template>
  <div class="field column" :class="`is-${size}`">
    <label class="label">{{ name }}</label>
    <div class="control">
      <input v-validate="validation" v-model="model" :class="{'input': true, 'is-danger': errors.has(name) }" :type="`${fieldType}`" :name="`${name}`" :placeholder="`${name}`">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      default: () => {},
      type: String
    },
    name: {
      default: '',
      type: String
    },
    size: {
      default: 'full',
      type: String
    },
    fieldType: {
      default: 'text',
      type: String
    },
    validation: {
      default: '',
      type: String
    }
  }
}
</script>

