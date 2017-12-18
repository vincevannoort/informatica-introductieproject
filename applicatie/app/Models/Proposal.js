'use strict'

const Model = use('Model')

class Proposal extends Model {

  // always include contacts when fetching proposals
  static boot() {
    super.boot();
    this.addGlobalScope(builder => {
      builder.with('contacts');
    })
  }

	relation() {
		return this.belongsTo('App/Models/Relation')
	}

	contacts() {
		return this.belongsToMany('App/Models/Contact').pivotTable('contact_proposals')
	}

}

module.exports = Proposal
