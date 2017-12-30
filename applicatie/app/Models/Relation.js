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
   * Calculate insight for every proposals when relations are passed, can be used for an relations array
   * @param {(Relation|Relation[])} relations - a relation type or relations array
   */
  static async calculateInsightForEveryProposalByRelations(relations) {
    relations = [].concat(relations || [])
    relations.map(async function(relation) {
      await relation.calculateInsightForEveryProposal()
    })
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

    // calculate value
    await this.calculateValue()

    return totalInsightCalculated.toString()
  }

  /**
   * Calculate value for every proposals and set own value_total as its value
   */
  async calculateValue() {
    const proposals = await this.proposals().fetch()
    const values = proposals.rows.map((proposal) => proposal.value)
    const totalValue = values.reduce((a, b) => a + b, 0)
    this.merge({ value_total: totalValue })
    await this.save()
  }

}

module.exports = Relation
