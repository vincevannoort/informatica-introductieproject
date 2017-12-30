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

    // fetch data to be used
    const contacts = await this.contacts().fetch()
    const relation = await this.relation().fetch()

    /**
    * Calculate: Overall business window score
    * @amount - 20%
    */
    let insight_overall_business_window_amount = 0.20
    let insight_overall_business_window_score = 0

    /**
    * Calculate: Internal power and sources score
    * @amount - 40%
    */
    let insight_power_and_sources_amount = 0.40
    let insight_power_and_sources_score = 0

    /**
     * Calculate: Offering and Competitor analysis score
     * @amount - 15%
     */
    let insight_offering_and_competitor_analysis_amount = 0.15
    let insight_offering_and_competitor_analysis_score = 0

    /**
     * Calculate: Effects of the changes
     * @amount - 15%
     */
    let insight_effects_of_the_changes_amount = 0.15
    let insight_effects_of_the_changes_score = 0

    const calculated_insight_score =
    (insight_overall_business_window_amount * insight_overall_business_window_score) +
    (insight_power_and_sources_amount * insight_power_and_sources_score) +
    (insight_offering_and_competitor_analysis_amount * insight_offering_and_competitor_analysis_score) +
    (insight_effects_of_the_changes_amount * insight_effects_of_the_changes_score)

    console.log(calculated_insight_score)

    return this.insight
  }

}

module.exports = Proposal
