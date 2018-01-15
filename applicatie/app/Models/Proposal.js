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

    // for each of the 4 businesswindow informations, you get 25%
    let score = 0
    score += (objectives) ? 250 : 0
    score += (philosophy) ? 250 : 0
    score += (organisation) ? 250 : 0
    score += (products) ? 250 : 0
    return score
  }

  /**
   * Calculate score for business window
   */
  async calculateInsightPowerAndSourcesScore() {
    let score = 0
    const proposal = this
    const contacts = await proposal.contacts().fetch()
    const contactsRoles = await Promise.all(contacts.rows.map(async contact => contact.roles().fetch()))
    const contactsNeedForChanges = await Promise.all(contacts.rows.map(async contact => contact.needforchanges().fetch()))
    const contactsInfluences = await Promise.all(contacts.rows.map(async contact => contact.influences().fetch()))
    const contactsFeelings = await Promise.all(contacts.rows.map(async contact => contact.feeling().fetch()))

    score += await this.calculateInsightRoles(contactsRoles)
    score += await this.calculateInsightNeedForChanges(contactsNeedForChanges)
    score += await this.calculateInsightInfluence(contactsInfluences)
    score += await this.calculateInsightFeeling(contactsFeelings)

    console.log(score)

    return score
  }

  /**
   * Calculate score for business window
   * Score is based on our proposal versus their proposal, 1 means our proposal has no chance, 5 means we are in a very good shape
   * score  our proposal  their proposal
   * 1      much worse    much better
   * 2      worse         better
   * 3      equal         equal
   * 4      better        worse
   * 5      much better   much worse
   */
  async calculateInsightOfferingAndCompetitorAnalysisScore() {
    const competitions = await this.competitions().fetch()
    const average_grading = competitions.rows.reduce((total, competition) => total += competition.grading, 0) / competitions.rows.length
    let score = Math.floor((average_grading / 5) * 1000)
    return score
  }

  /**
   * Calculate score for business window
   */
  async calculateInsightEffectsOfTheChangesScore() {
    return 0
  }

  async calculateInsightRoles(contactsRoles) {
    const rolesPresent = new Set()
    // goes through every contactRoles in contactsRoles
    contactsRoles.forEach(contactRoles => {
      contactRoles.rows.forEach(role => {
        rolesPresent.add(role.type)
      })
    })
    // checks if rolesPresent has every possible role.
    if(
      rolesPresent.has('ambassador') &&
      rolesPresent.has('chief') &&
      rolesPresent.has('user') &&
      rolesPresent.has('expert')
    ) {
      return 100
    }
    return 0
  }

  async calculateInsightNeedForChanges(contactsNeedForChanges) {
    contactsNeedForChanges.forEach(contactNeedForChanges => {
      contactNeedForChanges.rows.forEach(needforchange => {
        if(needforchange == null) {
          return 0
        }
      })
    })

    return 200
  }

  async calculateInsightInfluence(contactsInfluences) {
    contactsInfluences.forEach(contactInfluences => {
      contactInfluences.rows.forEach(influence => {
        if(influence == null) {
          return 0
        }
      })
    })

    return 400
  }

  async calculateInsightFeeling(contactsFeelings) {
    contactsFeelings.forEach(contactFeeling => {
      if(contactFeeling == null) {
        return 0
      }
    })

    return 300
  }
  
}

module.exports = Proposal
