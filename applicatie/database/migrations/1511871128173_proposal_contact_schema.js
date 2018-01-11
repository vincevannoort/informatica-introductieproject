const Schema = use('Schema')

class ContactProposalSchema extends Schema {

  up() {
    this.create('proposal_contacts', (table) => {
      table.increments()
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.integer('proposal_id').unsigned().references('id').inTable('proposals')
      table.timestamps()
    })
  }

  down() {
    this.drop('proposal_contacts')
  }

}

module.exports = ContactProposalSchema
