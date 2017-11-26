'use strict'

const Schema = use('Schema')

class ContactCompanySchema extends Schema {
  up () {
    this.create('contact_companies', (table) => {
      table.increments()
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.timestamps()
    })
  }

  down () {
    this.drop('contact_companies')
  }
}

module.exports = ContactCompanySchema
