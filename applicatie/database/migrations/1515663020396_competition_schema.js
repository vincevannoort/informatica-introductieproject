'use strict'

const Schema = use('Schema')

class CompetitionSchema extends Schema {

  up () {
    this.create('competitions', (table) => {
      table.increments()
      table.integer('proposal_id').unsigned().references('id').inTable('proposals')
      table.string('company').notNullable()
      table.string('counter_proposal').notNullable()
      table.string('position').notNullable()
      table.enu('grading', ['much better', 'better', 'equal', 'worse', 'much worse']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('competitions')
  }

}

module.exports = CompetitionSchema
