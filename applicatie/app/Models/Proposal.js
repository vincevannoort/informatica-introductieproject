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
    console.log(`Start calculating insight for: ${this.relation_id}, proposal name: ${this.name} `)

    /**
    * Calculate: Overall business window score
    * @amount - 20%
    */
    const insightOverallBusinessWindowAmount = 0.20
    const insightOverallBusinessWindowScore = this.calculateInsightOverallBusinessWindowScore()

    /**
    * Calculate: Internal power and sources score
    * @amount - 40%
    */
    const insightPowerAndSourcesAmount = 0.40
    const insightPowerAndSourcesScore = this.calculateInsightPowerAndSourcesScore()

    /**
     * Calculate: Offering and Competitor analysis score
     * @amount - 15%
     */
    const insightOfferingAndCompetitorAnalysisAmount = 0.15
    const insightOfferingAndCompetitorAnalysisScore = this.calculateInsightOfferingAndCompetitorAnalysisScore()

    /**
     * Calculate: Effects of the changes
     * @amount - 15%
     */
    const insightEffectsOfTheChangesAmount = 0.25
    const insightEffectsOfTheChangesScore = this.calculateInsightEffectsOfTheChangesScore()

    const calculatedInsightScore =
    (insightOverallBusinessWindowAmount * insightOverallBusinessWindowScore) +
    (insightPowerAndSourcesAmount * insightPowerAndSourcesScore) +
    (insightOfferingAndCompetitorAnalysisAmount * insightOfferingAndCompetitorAnalysisScore) +
    (insightEffectsOfTheChangesAmount * insightEffectsOfTheChangesScore)

    // TEMPORARY RANDOM FOR TESTING
    const temporaryRandomInsight = Math.floor(Math.random() * 100) + 1
    return temporaryRandomInsight + calculatedInsightScore
  }

  /**
   * Calculate score for business window
   */
  async calculateInsightOverallBusinessWindowScore() {
    const relation = await this.relation().fetch()
    const businessWindow = await relation.businesswindow().fetch()

    const objectives = businessWindow.objectives
    const philosophy = businessWindow.philosophy
    const organisation = businessWindow.organisation
    const products = businessWindow.products
    return 0
  }

  /**
   * Calculate score for business window
   */
  calculateInsightPowerAndSourcesScore() {
    return 0
  }

  /**
   * Calculate score for business window
   */
  calculateInsightOfferingAndCompetitorAnalysisScore() {
    return 0
  }

  /**
   * Calculate score for business window
   */
  calculateInsightEffectsOfTheChangesScore() {
    return 0
  }

}

module.exports = Proposal
