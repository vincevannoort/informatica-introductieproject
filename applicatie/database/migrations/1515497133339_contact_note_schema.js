const Schema = use('Schema')

class ContactNoteSchema extends Schema {

  up () {
    this.create('contact_notes', (table) => {
      table.increments()
      table.integer('note_id').unsigned().references('id').inTable('notes')
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.timestamps()
    })
  }

  down () {
    this.drop('contact_notes')
  }

}

module.exports = ContactNoteSchema
