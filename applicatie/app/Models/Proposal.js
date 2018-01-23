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
    console.log(chalk.yellow(`Start calculating insight for: ${this.relation_id}, proposal name: ${this.name} `))

    /**
    * Calculate: Overall business window score
    * @amount - 20%
    */
    const insightOverallBusinessWindowAmount = 0.20
    const insightOverallBusinessWindowScore = await this.calculateInsightOverallBusinessWindowScore()
    console.log(chalk.blue(`insightOverallBusinessWindowScore: ${insightOverallBusinessWindowScore}`))

    /**
     * Calculate: Internal power and sources score
     * @amount - 40%
     */
    const insightPowerAndSourcesAmount = 0.40
    const insightPowerAndSourcesScore = await this.calculateInsightPowerAndSourcesScore()
    const potentialPowerAndSourcesScore = await this.calculatePotentialPowerAndSourcesScore()
    console.log(chalk.blue(`insightPowerAndSourcesScore: ${((insightPowerAndSourcesScore * 0.25) + (potentialPowerAndSourcesScore * 0.75))}`))

    /**
     * Calculate: Offering and Competitor analysis score
     * @amount - 15%
     */
    const insightOfferingAndCompetitorAnalysisAmount = 0.15
    const insightOfferingAndCompetitorAnalysisScore = await this.calculateInsightOfferingAndCompetitorAnalysisScore()
    console.log(chalk.blue(`insightOfferingAndCompetitorAnalysisScore: ${insightOfferingAndCompetitorAnalysisScore}`))

    /**
     * Calculate: Effects of the changes
     * @amount - 25%
     */
    const insightEffectsOfTheChangesAmount = 0.25
    const insightEffectsOfTheChangesScore = await this.calculateInsightEffectsOfTheChangesScore()
    console.log(chalk.blue(`insightEffectsOfTheChangesScore: ${insightEffectsOfTheChangesScore}`))

    const calculatedInsightScore =
    (insightOverallBusinessWindowAmount * insightOverallBusinessWindowScore) +
    (insightPowerAndSourcesAmount * ((insightPowerAndSourcesScore * 0.25) + (potentialPowerAndSourcesScore * 0.75))) +
    (insightOfferingAndCompetitorAnalysisAmount * insightOfferingAndCompetitorAnalysisScore) +
    (insightEffectsOfTheChangesAmount * insightEffectsOfTheChangesScore)

    console.log(chalk.green(`calculatedInsightScore: ${calculatedInsightScore}`))

    // Save the new insight score
    this.merge({ insight: calculatedInsightScore })
    await this.save()

    return calculatedInsightScore
  }

  /** ==================================
   * Calculate score for business window
   */ // ===============================
  async calculateInsightOverallBusinessWindowScore() {
    const relation = await this.relation().fetch()
    const businessWindow = await relation.businesswindow().fetch()
    if (!businessWindow) { return 0 }

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

  /** ============================================
   * Calculate insight score for power and sources
   */ // =========================================
  async calculateInsightPowerAndSourcesScore() {
    let score = 0
    const proposal = this
    const contacts = await proposal.contacts().fetch()
    const contactsRoles = await Promise.all(contacts.rows.map(async contact => contact.roles().fetch()))
    const contactsNeedForChanges = await Promise.all(contacts.rows.map(async contact => contact.needforchanges().fetch()))
    const contactsInfluences = await Promise.all(contacts.rows.map(async contact => contact.influences().fetch()))
    const contactsFeelings = await Promise.all(contacts.rows.map(async contact => contact.feeling().fetch()))

    score += await this.calculateInsightRoles(contactsRoles, 100)
    score += await this.calculateInsightNeedForChanges(contactsNeedForChanges, 200)
    score += await this.calculateInsightInfluence(contactsInfluences, 400)
    score += await this.calculateInsightFeeling(contactsFeelings, 300)

    return score
  }

  /** ==================================
   * Calculate score for business window
   * ===================================
   * Score is based on our proposal versus their proposal, 1 means our proposal has no chance, 5 means we are in a very good shape
   * score  our proposal  their proposal
   * 0      much worse    much better
   * 1      worse         better
   * 2      equal         equal
   * 3      better        worse
   * 4      much better   much worse
   */
  gradingToNumber(grading) {
    switch(grading) {
      case 'much better':
        return 0
        break
      case 'better':
        return 1
        break
      case 'equal':
        return 2
        break
      case 'worse':
        return 3
        break
      case 'much worse':
        return 4
        break
    }
  }

  async calculateInsightOfferingAndCompetitorAnalysisScore() {
    const competitions = await this.competitions().fetch()
    if (!competitions.rows.length) { return 0 }

    const average_grading = competitions.rows.reduce((total, competition) => total += this.gradingToNumber(competition.grading), 0) / competitions.rows.length
    const max_grading = 4
    let score = Math.floor((average_grading / max_grading) * 1000)
    return score
  }

  /** ==================================
   * Calculate score for business window
   */ // ===============================
  async calculateInsightEffectsOfTheChangesScore() {
    let score = 0
    const proposal = this
    const proposalGrow = await proposal.grow().fetch()
    const contacts = await proposal.contacts().fetch()
    const contactsFeelings = await Promise.all(contacts.rows.map(async contact => contact.feeling().fetch()))

    score += await this.calculateInsightFeeling(contactsFeelings, 500)
    score += await this.calculateInsightGrow(proposalGrow, 500)
    return score
  }

  /** ==============================================
   * Calculate potential score for power and sources
   */ // ===========================================
  async calculatePotentialPowerAndSourcesScore() {
    let score = 0
    const proposal = this
    const contacts = await proposal.contacts().fetch()
    const contactsRoles = await Promise.all(contacts.rows.map(async contact => contact.roles().fetch()))
    const contactsNeedForChanges = await Promise.all(contacts.rows.map(async contact => contact.needforchanges().fetch()))
    const contactsInfluences = await Promise.all(contacts.rows.map(async contact => contact.influences().fetch()))
    const contactsFeelings = await Promise.all(contacts.rows.map(async contact => contact.feeling().fetch()))

    score += await this.calculatePotentialRoles(contactsRoles, 1000)
    return score
  }

  async calculateInsightRoles(contactsRoles, points) {
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
      return points
    }
    return 0
  }

  async calculateInsightNeedForChanges(contactsNeedForChanges, points) {
    if (!contactsNeedForChanges.length) { return 0}

    contactsNeedForChanges.forEach(contactNeedForChanges => {
      contactNeedForChanges.rows.forEach(needforchange => {
        if(needforchange == null) {
          return 0
        }
      })
    })

    return points
  }

  async calculateInsightInfluence(contactsInfluences, points) {
    if (!contactsInfluences.length) { return 0 }

    contactsInfluences.forEach(contactInfluences => {
      contactInfluences.rows.forEach(influence => {
        if(influence == null) {
          return 0
        }
      })
    })

    return points
  }

  async calculateInsightFeeling(contactsFeelings, points) {
    if (!contactsFeelings.length) { return 0 }

    contactsFeelings.forEach(contactFeeling => {
      if(contactFeeling == null) {
        return 0
      }
    })

    return points
  }

  async calculateInsightGrow(proposalGrow, points) {
    if (!proposalGrow) { return 0 }

    if ( !proposalGrow.goal ||
         !proposalGrow.reality ||
         !proposalGrow.opportunity ||
         !proposalGrow.will ) {
      return 0
    }
    return points
  }

  async calculatePotentialRoles(contactsRoles, points) {
    let score = points
    const rolesPresent = new Set()
    const rolesCount = {}

    let contactsWithRoles = await Promise.all(contactsRoles.map(async contactRoles => {
      let contactsWithRoles = {}

      await Promise.all(contactRoles.rows.map(async role => {
        const proposalcontact = await role.proposalcontact().fetch()
        const contact = await proposalcontact.information().fetch()

        rolesPresent.add(role.type)
        if (!(contact.id in contactsWithRoles)) { contactsWithRoles[contact.id] = [] }
        if (!(role.type in rolesCount)) { rolesCount[role.type] = 1 } else { rolesCount[role.type]++ }
        return contactsWithRoles[contact.id].push(role.type)
      }))
      return contactsWithRoles
    }))

    // remove empty contacts
    contactsWithRoles = contactsWithRoles.filter((contactWithRoles) => !(Object.keys(contactWithRoles).length === 0 && contactWithRoles.constructor === Object))

    if (!rolesPresent.has('chief')) { score -= 625 } // if no chief
    if (!rolesPresent.has('ambassador')) { score -= 750 } // if no ambassador
    if (!(rolesCount['expert'] >= 2)) { score -= 250 } // if no 2x expert
    if (!(rolesCount['user'] >= 2)) { score -= 125 } // if no 2x user
    contactsWithRoles.forEach(contactWithRoles => {
      const contact_id = Object.keys(contactWithRoles)[0]
      const roles = Object.values(contactWithRoles)[0]
      if (roles.includes('user') && roles.includes('ambassador')) { score += 150 } // if user == ambassador
      if (roles.includes('expert') && roles.includes('ambassador')) { score += 325 } // if expert == ambassador
      if (roles.includes('chief') && roles.includes('ambassador')) { score += 750 } // if chief == ambassador
    })

    // cap score between 0 and 100
    return (score > 1000) ? 1000 : (score < 0) ? 0 : score
  }

}

module.exports = Proposal
