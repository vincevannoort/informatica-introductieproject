'use strict'

const Schema = use('Schema')

class BusinessWindowSchema extends Schema {
  up () {
    this.create('business_windows', (table) => {
      table.increments()
      table.integer('relation_id').unsigned().references('id').inTable('relations')
      table.string('objectives').notNullable()
      table.string('products').notNullable()
      table.string('philosophy').notNullable()
      table.string('organisation').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('business_windows')
  }
}

module.exports = BusinessWindowSchema
