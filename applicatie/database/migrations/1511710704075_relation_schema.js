const Schema = use('Schema')

class RelationSchema extends Schema {

  up() {
    this.create('relations', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name').notNullable()
      table.bool('active').notNullable().defaultTo(true)
      table.integer('value_total').unsigned().defaultTo(0)
      table.integer('insight_total').unsigned().defaultTo(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('relations')
  }

}

module.exports = RelationSchema
