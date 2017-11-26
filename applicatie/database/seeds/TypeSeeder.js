'use strict'

/*
|--------------------------------------------------------------------------
| TypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class TypeSeeder {
  async run () {
  	await Factory
 		.model('App/Models/Type')
  		.createMany(3)
  }
}

module.exports = TypeSeeder
