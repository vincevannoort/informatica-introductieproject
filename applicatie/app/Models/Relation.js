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

  strengthandweaknesses() {
    return this.belongsToMany('App/Models/Informations/StrengthAndWeakness').pivotTable('relation_strength_and_weaknesses')
  }

  businesswindow() {
    return this.hasOne('App/Models/Informations/BusinessWindow')
  }

  /**
   * Calculate insight for every proposals when relations are passed, can be used for an relations array
   * @param {(Relation|Relation[])} relations - a relation type or relations array
   */
  static async calculateInsightForEveryProposalByRelations(relations) {
    const relationsArray = [].concat(relations || [])
    const promises = []
    for (const relation of relationsArray) {
      promises.push(relation.calculateInsightForEveryProposal())
    }
    await Promise.all(promises)
  }

  /**
   * Calculate insight for every proposals
   */
  async calculateInsightForEveryProposal() {
    const proposals = await this.proposals().with('contacts').fetch()

    // return if no proposals exist
    if (!proposals.rows.length > 0) {
      return 'no proposals found'
    }

    // start calculating insight for each proposal
    const promises = []
    for (const proposal of proposals.rows) {
      promises.push(proposal.calculateInsight())
    }

    // when calculating insights of all proposals is done
    const totalInsightCalculated = await Promise.all(promises).then(insightScores => insightScores.reduce((a, b) => a + b) / insightScores.length)

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
    const values = proposals.rows.map(proposal => proposal.value)
    const totalValue = values.reduce((a, b) => a + b, 0)
    this.merge({ value_total: totalValue })
    await this.save()
  }

}

module.exports = Relation
