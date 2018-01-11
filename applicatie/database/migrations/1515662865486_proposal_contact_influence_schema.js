'use strict'

const Schema = use('Schema')

class ProposalContactInfluenceSchema extends Schema {
  up () {
    this.create('proposal_contact_influences', (table) => {
      table.increments()
      table.integer('proposal_contact_id').unsigned().references('id').inTable('proposal_contacts')
      table.integer('influence_id').unsigned().references('id').inTable('influences')
      table.timestamps()
    })
  }

  down () {
    this.drop('proposal_contact_influences')
  }
}

module.exports = ProposalContactInfluenceSchema
