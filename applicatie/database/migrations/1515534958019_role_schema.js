'use strict'

const Schema = use('Schema')

class RoleSchema extends Schema {

  up () {
    this.create('roles', (table) => {
      table.increments()
      table.integer('proposal_contact_id').unsigned().references('id').inTable('proposal_contacts')
      table.enu('type', ['chief', 'user', 'expert', 'ambassador'])
      table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }

}

module.exports = RoleSchema
