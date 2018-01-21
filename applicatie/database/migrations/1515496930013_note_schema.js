const Schema = use('Schema')

class NoteSchema extends Schema {

  up () {
    this.create('notes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('notes')
  }

}

module.exports = NoteSchema
