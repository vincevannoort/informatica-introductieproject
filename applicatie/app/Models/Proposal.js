'use strict'

const Model = use('Model')

class Proposal extends Model {

	relation() {
		return this.belongsTo('App/Models/Relation')
	}

	contacts() {
		return this.belongsToMany('App/Models/Contact').pivotTable('contact_proposals')
	}

}

module.exports = Proposal
