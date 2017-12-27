'use strict'

const Model = use('Model')
const chalk = require('chalk')

class Proposal extends Model {

	relation() {
		return this.belongsTo('App/Models/Relation')
	}

	contacts() {
		return this.belongsToMany('App/Models/Contact').pivotTable('contact_proposals')
	}

  async calculateInsight() {
    console.log(chalk.green.underline(`Start calculating insight for '${this.name}'`))
    const contacts = await this.contacts().fetch()
    const relation = await this.relation().fetch()
    console.info(`amount of contacts: ${contacts.rows.length}`)
    console.info(`with a relation: ${relation.name}`)
  }

}

module.exports = Proposal
