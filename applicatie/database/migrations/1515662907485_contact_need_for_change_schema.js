'use strict'

const Schema = use('Schema')

class ContactNeedForChangeSchema extends Schema {
  up () {
    this.create('contact_need_for_changes', (table) => {
      table.increments()
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.integer('need_for_change_id').unsigned().references('id').inTable('need_for_changes')
      table.timestamps()
    })
  }

  down () {
    this.drop('contact_need_for_changes')
  }
}

module.exports = ContactNeedForChangeSchema
