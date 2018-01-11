'use strict'

const Schema = use('Schema')

class NeedForChangeSchema extends Schema {
  up () {
    this.create('need_for_changes', (table) => {
      table.increments()
      table.enu('value', ['low', 'medium', 'high'])
      table.string('clarification').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('need_for_changes')
  }
}

module.exports = NeedForChangeSchema
