'use strict'

const Schema = use('Schema')

class ContactSchema extends Schema {
  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.string('function').notNullable().unique()
      table.string('first_name').notNullable().unique()
      table.string('last_name').notNullable().unique()
      table.string('telephone').notNullable().unique()
      table.string('email').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }
}

module.exports = ContactSchema
