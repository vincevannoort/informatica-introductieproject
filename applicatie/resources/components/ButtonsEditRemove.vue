<template>
  <div class="edit-delete-buttons field has-addons">
    <p v-if="$listeners.editButtonPressed" class="control">
      <a class="button" @click.prevent="$emit('editButtonPressed')">
        <span class="icon is-small">
          <i class="fa fa-pencil-square-o" />
        </span>
      </a>
    </p>
    <p v-if="$listeners.removeButtonPressed" class="control">
      <a class="button" @click.prevent="$emit('removeButtonPressed')">
        <span class="icon is-small">
          <i class="fa fa-trash-o" />
        </span>
      </a>
    </p>
  </div>
</template>

<style lang="scss">
  @import "../assets/scss/variables/colors";
  .edit-delete-buttons {
    justify-content: flex-end !important;
    .button {
      background: none;
      &:hover {
        border: 1px solid $red;
        background-color: transparentize($red, 0.96);
        box-shadow: 0 10px 30px -10px rgba(0,0,0,0.25);
      }
    }
  }
</style>
