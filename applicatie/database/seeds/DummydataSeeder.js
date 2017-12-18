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
const Database = use('Database')

class DummydataSeeder {
  async run () {
    const users = await Factory.model('App/Models/User').createMany(10)
    const contacts = await Factory.model('App/Models/Contact').createMany(150)
    const relations = await Factory.model('App/Models/Relation').createMany(50)
    const proposals = await Factory.model('App/Models/Proposal').createMany(100)
    
    for (var contact of contacts) {
        // attach random relation to contact
        await contact.relations().withTimestamps().attach([Math.floor(Math.random() * 50) + 1])
        // attach random proposal to contact
        await contact.proposals().withTimestamps().attach([Math.floor(Math.random() * 100) + 1])
    }

    // custom users for testing
    const User = use('App/Models/User')
    await User.create({ profession: 'Software Engineer', first_name: 'Vince', last_name: 'van Noort', username: 'vince', password: 'vince', email: 'vince@canon.nl' })
    await User.create({ profession: 'Software Engineer', first_name: 'Jort', last_name: 'van Gorkum', username: 'jort', password: 'jort', email: 'jort@canon.nl' })
    await User.create({ profession: 'Software Engineer', first_name: 'Tijmen', last_name: 'van der Spijk', username: 'tijmen', password: 'tijmen', email: 'tijmen@canon.nl' })
    await User.create({ profession: 'Software Engineer', first_name: 'Madio', last_name: 'Seck', username: 'madio', password: 'madio', email: 'madio@canon.nl' })
    await User.create({ profession: 'Software Engineer', first_name: 'Niek', last_name: 'Geijtenbeek', username: 'niek', password: 'niek', email: 'niek@canon.nl' })

    Database.close()
  }
}

module.exports = DummydataSeeder