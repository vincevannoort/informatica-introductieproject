<template>
  <div class="box">
    <div class="box-header">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
  export default{
    props: ['title']
  }
</script>