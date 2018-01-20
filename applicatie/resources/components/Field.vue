<template>
  <div class="field column" :class="`is-${size}`">
    <label class="label">{{ name }}</label>
    <div class="control">
      <input
        v-if="fieldType != 'select'"
        v-validate="validation"
        :value="value"
        @input="$emit('input', $event.target.value)"

        :class="{'input': true, 'is-danger': errors.has(name) }"
        :type="`${fieldType}`"
        :name="`${name}`"
        :placeholder="`${name}`">
      <div v-else class="select">
        <select
          v-validate="validation"
          :value="value"
          @input="$emit('input', $event.target.value)"
          :name="`${name}`">
          <option value="" disabled selected>Select a {{ name }}</option>
          <option v-for="option in options" :key="option">{{ option }}</option>
        </select>
      </div>
    </div>
    <span v-show="errors.has(name)" class="help is-danger">{{ errors.first(name) }}</span>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
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
    },
    options: {
      default: () => [],
      type: Array
    }
  }
}
</script>

