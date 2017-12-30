'use strict'

const Model = use('Model')
const chalk = require('chalk')

class Relation extends Model {

	user() {
		return this.belongsTo('App/Models/User')
	}

	contacts() {
		return this.belongsToMany('App/Models/Contact').pivotTable('contact_relations')
	}

	proposals() {
		return this.hasMany('App/Models/Proposal')
	}

  /**
   * Calculate insight for every proposals
   */
  async calculateInsightForEveryProposal() {
    console.log(chalk.blue.underline(`Start calculating total insight for '${this.name}'`))
    const proposals = await this.proposals().with('contacts').fetch()

    // return if no proposals exist
    if (!proposals.rows.length > 0) {
      return 'no proposals found'
    }

    // start calculating insight for each proposal
    const insights = proposals.rows.map(async function(proposal) {
      return await proposal.calculateInsight()
    })

    // when calculating insights of all proposals is done
    const totalInsightCalculated = await Promise.all(insights)
    .then((insightScores) => {
      return insightScores.reduce(function(a, b) { return a + b; }) / insightScores.length
    })

    this.merge({ insight_total: totalInsightCalculated })
    await this.save()

    return totalInsightCalculated.toString()
  }

}

module.exports = Relation
