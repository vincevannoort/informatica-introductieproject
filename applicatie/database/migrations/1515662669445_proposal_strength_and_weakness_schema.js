'use strict'

const Schema = use('Schema')

class ProposalStrengthAndWeaknessSchema extends Schema {
  up () {
    this.create('proposal_strength_and_weaknesses', (table) => {
      table.increments()
      table.integer('strength_and_weakness_id').unsigned().references('id').inTable('strength_and_weaknesses')
      table.integer('proposal_id').unsigned().references('id').inTable('proposals')
      table.timestamps()
    })
  }

  down () {
    this.drop('proposal_strength_and_weaknesses')
  }
}

module.exports = ProposalStrengthAndWeaknessSchema
