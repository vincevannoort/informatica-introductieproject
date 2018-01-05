<template>
  <div class="modal">
    <div class="modal-background" />
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
  .modal {
    .modal-background {
      background: rgba(255, 255, 255, 0.95);
    }
    .modal-content {
      overflow: visible;
    }
  }
</style>
