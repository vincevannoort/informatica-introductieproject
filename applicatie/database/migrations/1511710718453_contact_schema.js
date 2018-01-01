const Schema = use('Schema')

class ContactSchema extends Schema {

  up() {
    this.create('contacts', (table) => {
      table.increments()
      table.string('profession').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('telephone').notNullable()
      table.string('email').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('contacts')
  }

}

module.exports = ContactSchema
