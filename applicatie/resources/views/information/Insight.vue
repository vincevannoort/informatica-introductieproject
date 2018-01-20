<template>
  <modal class="is-active">
    <h2>Insight</h2>
    <box>
      Should provide insight actions here
      <div class="control">
        <button class="button is-text is-light" @click.prevent="back">Back</button>
      </div>
    </box>
  </modal>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

