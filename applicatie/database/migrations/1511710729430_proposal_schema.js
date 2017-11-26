'use strict'

const Schema = use('Schema')

class ProposalSchema extends Schema {
  up () {
    this.create('proposals', (table) => {
      table.increments()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('proposals')
  }
}

module.exports = ProposalSchema
