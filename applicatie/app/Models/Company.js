'use strict'

const Model = use('Model')

class Company extends Model {

  // always include contacts when fetching companies
  static boot() {
    super.boot();
    this.addGlobalScope(builder => {
      builder.with('contacts');
      builder.with('proposals');
    })
  }

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
