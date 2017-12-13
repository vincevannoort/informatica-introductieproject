'use strict'

const Model = use('Model')

class Company extends Model {

	user() {
		return this.belongsTo('App/Models/User')
	}

	contacts() {
		return this.belongsToMany('App/Models/Contact').pivotTable('contact_companies')
	}

	proposals() {
		return this.hasMany('App/Models/Proposal')
	}

}

module.exports = Company
