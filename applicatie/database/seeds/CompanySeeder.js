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
  	await Factory
 		.model('App/Models/Company')
  		.createMany(5)
  }
}

module.exports = CompanySeeder
