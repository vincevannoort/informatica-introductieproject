'use strict'

const Schema = use('Schema')

class ProposalSchema extends Schema {
  up () {
    this.create('proposals', (table) => {
      table.increments()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.string('name').notNullable()
      table.integer('insight').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('proposals')
  }
}

module.exports = ProposalSchema
