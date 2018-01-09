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
const Role = use('App/Models/Role')
const ProposalContact = use('App/Models/Connections/ProposalContact')

class DummydataSeeder {

  async run() {
    /* eslint-disable no-unused-vars */
    const users = await Factory.model('App/Models/User').createMany(10)
    const contacts = await Factory.model('App/Models/Contact').createMany(150)
    const relations = await Factory.model('App/Models/Relation').createMany(50)
    const proposals = await Factory.model('App/Models/Proposal').createMany(150)
    const notes = await Factory.model('App/Models/Note').createMany(600)
    /* eslint-enable no-unused-vars */

    const contactsPromises = contacts.map((contact) => contact.relations().withTimestamps().attach([Math.floor(Math.random() * 50) + 1]))
    await Promise.all(contactsPromises)
    const proposalsPromises = proposals.map((proposal) => proposal.contacts().withTimestamps().attach([Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1]))
    await Promise.all(proposalsPromises)
    const notesPromises = notes.map((note) => note.contact().withTimestamps().attach(Math.floor(Math.random() * 150) + 1))
    await Promise.all(notesPromises)

    const availableTypes = ['chief', 'user', 'expert', 'ambassador']
    const proposalContacts = await ProposalContact.all()
    const proposalContactsRolesPromises = proposalContacts.rows.map(async (proposalcontact) => {
      const role1 = new Role()
      role1.type = availableTypes[Math.floor(Math.random() * availableTypes.length)]
      const role2 = new Role()
      role2.type = availableTypes[Math.floor(Math.random() * availableTypes.length)]
     return proposalcontact.roles().saveMany([role1, role2])
    })
    await Promise.all(proposalContactsRolesPromises)

    // custom users for testing
    const newUsers = [
      { profession: 'Software Engineer', first_name: 'Vince', last_name: 'van Noort', username: 'vince', password: 'vince', email: 'vince@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Jort', last_name: 'van Gorkum', username: 'jort', password: 'jort', email: 'jort@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Tijmen', last_name: 'van der Spijk', username: 'tijmen', password: 'tijmen', email: 'tijmen@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Madio', last_name: 'Seck', username: 'madio', password: 'madio', email: 'madio@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Niek', last_name: 'Geijtenbeek', username: 'niek', password: 'niek', email: 'niek@canon.nl' }
    ]
    const createUserPromises = newUsers.map((newUser) => User.create({ profession: newUser.profession, first_name: newUser.first_name, last_name: newUser.last_name, username: newUser.username, password: newUser.password, email: newUser.email }))
    await Promise.all(createUserPromises)
    const updateRelationPromises = relations.map((relation) => relation.calculateInsightForEveryProposal())
    await Promise.all(updateRelationPromises)

    Database.close()
  }

}

module.exports = DummydataSeeder
