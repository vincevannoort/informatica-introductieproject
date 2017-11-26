'use strict'

/*
|--------------------------------------------------------------------------
| ProposalSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class ProposalSeeder {
  async run () {
  	await Factory
 		.model('App/Models/Proposal')
  		.createMany(100)
  }
}

module.exports = ProposalSeeder
