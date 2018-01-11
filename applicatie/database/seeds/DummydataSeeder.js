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

    /*
    * Generate all entities
    */
    /* eslint-disable no-unused-vars */
    const users = await Factory.model('App/Models/User').createMany(10)
    const contacts = await Factory.model('App/Models/Contact').createMany(150)
    const relations = await Factory.model('App/Models/Relation').createMany(50)
    const proposals = await Factory.model('App/Models/Proposal').createMany(150)
    const notes = await Factory.model('App/Models/Informations/Note').createMany(600)
    /* eslint-enable no-unused-vars */

    /*
    * Attach contacts to relations
    */
    const contactsPromises = contacts.map((contact) => contact.relations().withTimestamps().attach([Math.floor(Math.random() * 50) + 1]))
    await Promise.all(contactsPromises)

    /*
    * Attach contacts from a relation to a proposal
    */
    const proposalsPromises = proposals.map(async (proposal) => {
      // the relation of a proposal has contacts
      const relation = await proposal.relation().fetch()
      const contacts = await relation.contacts().fetch()
      // attach each contact to each proposal
      return contacts.rows.map(async contact => contact.proposals().attach(proposal.id))
    })
    await Promise.all(proposalsPromises)

    /*
    * Notes
    */
    const notesPromises = notes.map((note) => note.contact().withTimestamps().attach(Math.floor(Math.random() * 150) + 1))
    await Promise.all(notesPromises)

    /*
    * Roles
    * TODO: ROLE AS FACTORY
    */
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

    /*
    * Influences for contacts
    */
    const contactInfluences = contacts.map(async contact => {
      const influence = await Factory.model('App/Models/Informations/Influence').make()
      return contact.influences().create(influence.$attributes)
    })
    Promise.all(contactInfluences)

    /*
    * Influences for contacts of proposals
    */
    const proposalcontactInfluences = proposalContacts.rows.map(async proposalcontact => {
      const influence = await Factory.model('App/Models/Informations/Influence').make()
      return proposalcontact.influences().create(influence.$attributes)
    })
    Promise.all(proposalcontactInfluences)

    /*
    * Own users for testing
    */
    const newUsers = [
      { profession: 'Software Engineer', first_name: 'Vince', last_name: 'van Noort', username: 'vince', password: 'vince', email: 'vince@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Jort', last_name: 'van Gorkum', username: 'jort', password: 'jort', email: 'jort@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Tijmen', last_name: 'van der Spijk', username: 'tijmen', password: 'tijmen', email: 'tijmen@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Madio', last_name: 'Seck', username: 'madio', password: 'madio', email: 'madio@canon.nl' },
      { profession: 'Software Engineer', first_name: 'Niek', last_name: 'Geijtenbeek', username: 'niek', password: 'niek', email: 'niek@canon.nl' }
    ]
    const createUserPromises = newUsers.map((newUser) => User.create({ profession: newUser.profession, first_name: newUser.first_name, last_name: newUser.last_name, username: newUser.username, password: newUser.password, email: newUser.email }))
    await Promise.all(createUserPromises)


    /*
    * Update all relations after data has been changed
    */
    const updateRelationPromises = relations.map((relation) => relation.calculateInsightForEveryProposal())
    await Promise.all(updateRelationPromises)

    Database.close()
  }

}

module.exports = DummydataSeeder
