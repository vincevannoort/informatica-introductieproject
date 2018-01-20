<template>
  <modal-create-edit :entity="'Social media'">
    <field v-model="example.name" :name="'Name'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>
