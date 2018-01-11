const Model = use('Model')
const chalk = require('chalk')

class Proposal extends Model {

  relation() {
    return this.belongsTo('App/Models/Relation')
  }

  contacts() {
    return this.hasMany('App/Models/Connections/ProposalContact')
  }

  competitions() {
    return this.hasMany('App/Models/Informations/Competition')
  }

  actions() {
    return this.hasMany('App/Models/Informations/Action')
  }

  grow() {
    return this.hasOne('App/Models/Informations/Grow')
  }

  strengthandweaknesses() {
    return this.belongsToMany('App/Models/Informations/StrengthAndWeakness').pivotTable('proposal_strength_and_weaknesses')
  }

  /**
   * Calculate insight, this is where the magic happens
   */
  async calculateInsight() {
    // fetch data to be used
    // const contacts = await this.contacts().fetch()
    // const relation = await this.relation().fetch()

    /**
    * Calculate: Overall business window score
    * @amount - 20%
    */
    const insightOverallBusinessWindowAmount = 0.20
    const insightOverallBusinessWindowScore = 0

    /**
    * Calculate: Internal power and sources score
    * @amount - 40%
    */
    const insightPowerAndSourcesAmount = 0.40
    const insightPowerAndSourcesScore = 0

    /**
     * Calculate: Offering and Competitor analysis score
     * @amount - 15%
     */
    const insightOfferingAndCompetitorAnalysisAmount = 0.15
    const insightOfferingAndCompetitorAnalysisScore = 0

    /**
     * Calculate: Effects of the changes
     * @amount - 15%
     */
    const insightEffectsOfTheChangesAmount = 0.15
    const insightEffectsOfTheChangesScore = 0

    const calculatedInsightScore =
    (insightOverallBusinessWindowAmount * insightOverallBusinessWindowScore) +
    (insightPowerAndSourcesAmount * insightPowerAndSourcesScore) +
    (insightOfferingAndCompetitorAnalysisAmount * insightOfferingAndCompetitorAnalysisScore) +
    (insightEffectsOfTheChangesAmount * insightEffectsOfTheChangesScore)

    // TEMPORARY RANDOM FOR TESTING
    const temporaryRandomInsight = Math.floor(Math.random() * 100) + 1
    return temporaryRandomInsight + calculatedInsightScore
  }

}

module.exports = Proposal
