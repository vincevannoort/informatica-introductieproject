'use strict'

/*
|--------------------------------------------------------------------------
| ContactSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class ContactSeeder {
  async run () {
  	await Factory
 		.model('App/Models/Contact')
  		.createMany(5)
  }
}

module.exports = ContactSeeder
