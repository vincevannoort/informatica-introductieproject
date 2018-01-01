const Schema = use('Schema')

class ContactRelationSchema extends Schema {

  up() {
    this.create('contact_relations', (table) => {
      table.increments()
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.integer('relation_id').unsigned().references('id').inTable('relations')
      table.timestamps()
    })
  }

  down() {
    this.drop('contact_relations')
  }

}

module.exports = ContactRelationSchema
