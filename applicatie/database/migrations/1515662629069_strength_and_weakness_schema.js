'use strict'

const Schema = use('Schema')

class StrengthAndWeaknessSchema extends Schema {
  up () {
    this.create('strength_and_weaknesses', (table) => {
      table.increments()
      table.enu('type', ['strength', 'weakness'])
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('strength_and_weaknesses')
  }
}

module.exports = StrengthAndWeaknessSchema
