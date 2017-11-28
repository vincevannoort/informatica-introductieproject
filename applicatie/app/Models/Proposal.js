'use strict'

const Model = use('Model')

class Proposal extends Model {

	company() {
		return this.belongsTo('App/Models/Company')
	}

	contacts() {
		return this.belongsToMany('App/Models/Contact').pivotTable('contact_proposals')
	}

}

module.exports = Proposal
