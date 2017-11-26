'use strict'

const Schema = use('Schema')

class CompanyTypeSchema extends Schema {
  up () {
    this.create('company_types', (table) => {
      table.increments()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.integer('type_id').unsigned().references('id').inTable('types')
      table.timestamps()
    })
  }

  down () {
    this.drop('company_types')
  }
}

module.exports = CompanyTypeSchema
