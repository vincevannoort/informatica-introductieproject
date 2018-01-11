'use strict'

const Schema = use('Schema')

class ContactInfluenceSchema extends Schema {
  up () {
    this.create('contact_influences', (table) => {
      table.increments()
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.integer('influence_id').unsigned().references('id').inTable('influences')
      table.timestamps()
    })
  }

  down () {
    this.drop('contact_influences')
  }
}

module.exports = ContactInfluenceSchema
