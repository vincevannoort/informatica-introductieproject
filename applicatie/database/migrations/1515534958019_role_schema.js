'use strict'

const Schema = use('Schema')

class RoleSchema extends Schema {

  up () {
    this.create('roles', (table) => {
      table.increments()
      table.integer('proposal_contact_id').unsigned().references('id').inTable('contact_proposals')
      table.enu('type', ['chief', 'user', 'expert', 'ambassador'])
      table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }

}

module.exports = RoleSchema
