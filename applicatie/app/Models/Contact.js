'use strict'

const Model = use('Model')

class Contact extends Model {

	relations() {
		return this.belongsToMany('App/Models/Relation').pivotTable('contact_relations')
	}

	proposals() {
		return this.belongsToMany('App/Models/Proposal').pivotTable('contact_proposals')
	}

}

module.exports = Contact
