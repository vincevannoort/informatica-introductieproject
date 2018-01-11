'use strict'

const Schema = use('Schema')

class ProposalContactNeedForChangeSchema extends Schema {
  up () {
    this.create('proposal_contact_need_for_changes', (table) => {
      table.increments()
      table.integer('proposal_contact_id').unsigned().references('id').inTable('proposal_contacts')
      table.integer('need_for_change_id').unsigned().references('id').inTable('need_for_changes')
      table.timestamps()
    })
  }

  down () {
    this.drop('proposal_contact_need_for_changes')
  }
}

module.exports = ProposalContactNeedForChangeSchema
