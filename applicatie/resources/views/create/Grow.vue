<template>
  <modal-create-edit :entity="'competition'">
    <field v-model="example.name" :name="'Name'" :size="'full'" :validation="'required'" />
  </modal-create-edit>
</template>
