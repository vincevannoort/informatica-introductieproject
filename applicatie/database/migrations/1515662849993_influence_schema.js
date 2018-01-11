'use strict'

const Schema = use('Schema')

class InfluenceSchema extends Schema {
  up () {
    this.create('influences', (table) => {
      table.increments()
      table.enu('value', ['low', 'medium', 'high'])
      table.string('clarification').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('influences')
  }
}

module.exports = InfluenceSchema
