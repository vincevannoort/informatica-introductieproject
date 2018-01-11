'use strict'

const Schema = use('Schema')

class GrowSchema extends Schema {
  up () {
    this.create('grows', (table) => {
      table.increments()
      table.integer('proposal_id').unsigned().references('id').inTable('proposals')
      table.string('goal').notNullable()
      table.string('reality').notNullable()
      table.string('opportunity').notNullable()
      table.string('will').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('grows')
  }
}

module.exports = GrowSchema
