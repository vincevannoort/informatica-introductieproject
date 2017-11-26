'use strict'

const Model = use('Model')

class Proposal extends Model {

	company() {
		return this.belongsTo('App/Models/Company')
	}

}

module.exports = Proposal
