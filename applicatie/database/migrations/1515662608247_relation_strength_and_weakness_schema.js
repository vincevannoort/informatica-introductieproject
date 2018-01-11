'use strict'

const Schema = use('Schema')

class RelationStrengthAndWeaknessSchema extends Schema {
  up () {
    this.create('relation_strength_and_weaknesses', (table) => {
      table.increments()
      table.integer('strength_and_weakness_id').unsigned().references('id').inTable('strength_and_weaknesses')
      table.integer('relation_id').unsigned().references('id').inTable('relations')
      table.timestamps()
    })
  }

  down () {
    this.drop('relation_strength_and_weaknesses')
  }
}

module.exports = RelationStrengthAndWeaknessSchema
