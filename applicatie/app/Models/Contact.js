'use strict'

const Model = use('Model')

class Contact extends Model {

	companies() {
		return this.belongsToMany('App/Models/Company')
	}

}

module.exports = Contact
