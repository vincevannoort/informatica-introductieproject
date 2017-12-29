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

  /**
   * Calculate insight, this is where the magic happens
   */
  async calculateInsight() {
    console.log(chalk.green.underline(`Start calculating insight for: '${this.name}', with insight of: ${this.insight}.`))
    const contacts = await this.contacts().fetch()
    const relation = await this.relation().fetch()
    const insight = this.insight
    return insight
  }

}

module.exports = Proposal
