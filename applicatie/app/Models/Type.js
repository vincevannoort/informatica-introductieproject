'use strict'

const Model = use('Model')

class Type extends Model {

	companies() {
		return this.hasMany('App/Models/Company')
	}
	
}

module.exports = Type
