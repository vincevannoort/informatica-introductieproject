'use strict'

const Model = use('Model')

class Company extends Model {

	user() {
		return this.belongsTo('App/Models/User')
	}

	contacts() {
		return this.hasMany('App/Models/Contact')
	}

	proposals() {
		return this.hasMany('App/Models/Proposal')
	}

	type() {
		return this.hasOne('App/Models/Type')
	}

}

module.exports = Company
