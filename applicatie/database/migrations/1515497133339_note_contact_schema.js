const Schema = use('Schema')

class NoteContactSchema extends Schema {

  up () {
    this.create('note_contact', (table) => {
      table.increments()
      table.integer('note_id').unsigned().references('id').inTable('notes')
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.timestamps()
    })
  }

  down () {
    this.drop('note_contact')
  }

}

module.exports = NoteContactSchema
