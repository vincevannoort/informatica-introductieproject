const Schema = use('Schema')

class ProposalSchema extends Schema {

  up() {
    this.create('proposals', (table) => {
      table.increments()
      table.integer('relation_id').unsigned().references('id').inTable('relations')
      table.string('name').notNullable()
      table.integer('value').notNullable()
      table.date('start').notNullable()
      table.date('close').notNullable()
      table.integer('insight').unsigned().notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('proposals')
  }

}

module.exports = ProposalSchema
