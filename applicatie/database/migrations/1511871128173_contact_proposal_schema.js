const Schema = use('Schema')

class ContactProposalSchema extends Schema {

  up() {
    this.create('contact_proposals', (table) => {
      table.increments()
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.integer('proposal_id').unsigned().references('id').inTable('proposals')
      table.timestamps()
    })
  }

  down() {
    this.drop('contact_proposals')
  }

}

module.exports = ContactProposalSchema
