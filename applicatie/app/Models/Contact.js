'use strict'

const Model = use('Model')

class Contact extends Model {

	companies() {
		return this.belongsToMany('App/Models/Company').pivotTable('contact_companies')
	}

	proposals() {
		return this.belongsToMany('App/Models/Proposal').pivotTable('contact_proposals')
	}

}

module.exports = Contact
