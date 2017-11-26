'use strict'

/*
|--------------------------------------------------------------------------
| CompanySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class CompanySeeder {
  async run () {
  	const count = 50;
  	const types = 3;
  	await Factory
 		.model('App/Models/Company')
  		.createMany(count)
  }
}

module.exports = CompanySeeder
