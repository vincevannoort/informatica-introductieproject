'use strict'

const Model = use('Model')

class Type extends Model {

	company() {
		return this.belongsToMany('App/Models/Company')
	}
	
}

module.exports = Type
