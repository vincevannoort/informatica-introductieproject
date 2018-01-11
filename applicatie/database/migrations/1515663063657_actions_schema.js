'use strict'

const Schema = use('Schema')

class ActionsSchema extends Schema {
  up () {
    this.create('actions', (table) => {
      table.increments()
      table.integer('proposal_id').unsigned().references('id').inTable('proposals')
      table.string('smart_action').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('actions')
  }
}

module.exports = ActionsSchema
