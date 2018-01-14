<template>
  <div class="field column" :class="`is-${size}`">
    <label class="label">{{ name }}</label>
    <div class="control">
      <input
        v-validate="validation"
        :value="value"
        @input="$emit('input', $event.target.value)"

        :class="{'input': true, 'is-danger': errors.has(name) }"
        :type="`${fieldType}`"
        :name="`${name}`"
        :placeholder="`${name}`">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
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

