<template>
  <div class="modal">
    <div class="modal-background" />
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default { inject: ['$validator'] }
</script>


<style lang="scss">
  .modal {
    .modal-background {
      background: rgba(255, 255, 255, 0.875);
    }
    .modal-content {
      overflow: visible;
    }
  }
</style>
