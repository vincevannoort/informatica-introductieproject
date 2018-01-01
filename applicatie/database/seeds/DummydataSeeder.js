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
const User = use('App/Models/User')

class DummydataSeeder {

  async run() {
    /* eslint-disable no-unused-vars */
    const users = await Factory.model('App/Models/User').createMany(10)
    const contacts = await Factory.model('App/Models/Contact').createMany(150)
    const relations = await Factory.model('App/Models/Relation').createMany(50)
    const proposals = await Factory.model('App/Models/Proposal').createMany(100)
    /* eslint-enable no-unused-vars */

    const promises = []
    for (const contact of contacts) {
      // attach random relation to contact
      promises.push(contact.relations().withTimestamps().attach([Math.floor(Math.random() * 50) + 1]))
    }
    await Promise.all(promises)

    // custom users for testing
    const newUsers = [
      { profession: 'Software Engineer', first_name: 'Vince', last_name: 'van Noort', username: 'vince', password: 'vince', email: 'vince@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Jort', last_name: 'van Gorkum', username: 'jort', password: 'jort', email: 'jort@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Tijmen', last_name: 'van der Spijk', username: 'tijmen', password: 'tijmen', email: 'tijmen@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Madio', last_name: 'Seck', username: 'madio', password: 'madio', email: 'madio@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Niek', last_name: 'Geijtenbeek', username: 'niek', password: 'niek', email: 'niek@canon.nl' }
    ]
    const createUserPromises = []
    for (const newUser of newUsers) {
      createUserPromises.push(User.create({ profession: newUser.profession, first_name: newUser.first_name, last_name: newUser.last_name, username: newUser.username, password: newUser.password, email: newUser.email }))
    }
    await Promise.all(createUserPromises)

    Database.close()
  }

}

module.exports = DummydataSeeder
