'use strict'

const Schema = use('Schema')

class FeelingSchema extends Schema {
  up () {
    this.create('feelings', (table) => {
      table.increments()
      table.integer('proposal_contact_id').unsigned().references('id').inTable('proposal_contacts')
      table.integer('feeling')
      table.timestamps()
    })
  }

  down () {
    this.drop('feelings')
  }
}

module.exports = FeelingSchema
