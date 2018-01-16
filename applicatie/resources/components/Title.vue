<template>
  <div class="main-title-inner-content" :class="{ 'with-main-back-link': $listeners.back }">
    <div class="main-back-link" v-if="$listeners.back" @click="backEntity">&lt; {{ back }}</div>
    <h1 class="main-title">{{ title }}</h1>
    <div v-if="$listeners.calculate || $listeners.edit || $listeners.remove" class="main-action-buttons field has-addons">
      <p v-if="$listeners.calculate" class="control">
        <a @click="calculateEntity" class="button">
          <span class="icon is-small">
            <i class="fa fa-calculator" />
          </span>
          <span>Calculate insight</span>
        </a>
      </p>
      <p v-if="$listeners.edit" class="control">
        <a @click="editEntity" class="button">
          <span class="icon is-small">
            <i class="fa fa-pencil-square-o" />
          </span>
          <span>Edit</span>
        </a>
      </p>
      <p v-if="$listeners.remove" class="control">
        <a @click="removeEntity" class="button">
          <span class="icon is-small">
            <i class="fa fa-trash-o" />
          </span>
          <span>Delete</span>
        </a>
      </p>
    </div>
    <h2 class="main-breadcrumbs">
      Overzicht <span>/</span> {{ title }}
    </h2>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
        default: ''
      },
      back: {
        type: String,
        required: false,
        default: ''
      }
    },
    methods: {
      editEntity() {
        this.$emit('edit')
      },
      removeEntity() {
        this.$emit('remove')
      },
      backEntity() {
        this.$emit('back')
      },
      calculateEntity() {
        this.$emit('calculate')
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables/colors";

  .main-title-inner-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
    position: relative;
    min-height: 115px;

    .main-action-buttons {
      box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.10);
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 24px;
    }
    &.with-main-back-link {
      .main-action-buttons {
        margin-top: 48px;
      }
    }
  }

  .main-title {
    display: inline-block;
    margin-bottom: 0;
    opacity: 0;
    animation: fadeInLeft .65s cubic-bezier(0.19, 1, 0.30, 1) 0.2s forwards;
  }

  .main-breadcrumbs {
    display: inline-block;
    color: $medium-grey;
    font-size: 20px;
    opacity: 0;
    animation: fadeInLeft .65s cubic-bezier(0.19, 1, 0.30, 1) 0.4s forwards;
    font-weight: 500;
  }

  .main-back-link {
    color: $medium-grey;
    cursor: pointer;
  }
</style>
