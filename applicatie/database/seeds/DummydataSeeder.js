'use strict'

/*
|--------------------------------------------------------------------------
| DummydataSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class DummydataSeeder {
  async run () {
    const users = await Factory.model('App/Models/User').createMany(10)
    const types = await Factory.model('App/Models/Type').createMany(3)
    const contacts = await Factory.model('App/Models/Contact').createMany(150)
    const companies = await Factory.model('App/Models/Company').createMany(50)
    const proposals = await Factory.model('App/Models/Proposal').createMany(100)
    
    for (var contact of contacts) {
        // attach random company to contact
        await contact.companies().withTimestamps().attach([Math.floor(Math.random() * 50) + 1]);
        // attach random proposal to contact
        await contact.proposals().withTimestamps().attach([Math.floor(Math.random() * 100) + 1]);
    }
  }
}

module.exports = DummydataSeeder