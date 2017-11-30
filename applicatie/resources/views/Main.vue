<template>
    <div class="main-content-wrapper columns is-gapless">
      <div class="column is-3 sidebar-content">
        <sidebar></sidebar>
      </div>
      <div class="column is-9 main-content">
        <div class="main-inner-content"><slot></slot></div>
      </div>
    </div>
</template>

<style lang="scss">
  $main-padding: 60px;

  .main-content { 
    height: 100vh; 
    min-height: 100vh; 
    overflow: auto;
  }

  .main-inner-content {
    padding: $main-padding $main-padding 0 $main-padding; 
  }

</style>