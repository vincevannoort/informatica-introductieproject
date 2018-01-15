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
const Role = use('App/Models/Informations/Role')
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
    const contactsPromises = contacts.map(async(contact) =>  {
      const socialMedias = await Factory.model('App/Models/Informations/SocialMedia').makeMany(2)
      return Promise.all([
        contact.relations().withTimestamps().attach([Math.floor(Math.random() * 50) + 1]),
        contact.socialmedias().createMany(socialMedias.map(socialMedia => socialMedia.$attributes))
      ])
    })
    await Promise.all(contactsPromises)

    /*
    * Attach strengthandweaknesses to relations
    */
    const relationsPromises = relations.map(async relation => {
      const strengthandweaknesses = await Factory.model('App/Models/Informations/StrengthAndWeakness').makeMany(5)
      const businesswindow = await Factory.model('App/Models/Informations/BusinessWindow').make()
      return Promise.all([
        relation.strengthandweaknesses().createMany(strengthandweaknesses.map(strengthandweakness => strengthandweakness.$attributes)),
        relation.businesswindow().create(businesswindow.$attributes)
      ])
    })
    await Promise.all(relationsPromises)

    /*
    * Attach contacts to a proposal
    * Attach grow to a proposal
    * Attach actions to a proposal
    * Attach competitions to a proposal
    * Attach strengthandweaknesses to a proposal
    */
    const proposalsPromises = proposals.map(async proposal => {
      // the relation of a proposal has contacts
      const relation = await proposal.relation().fetch()
      const contacts = await relation.contacts().fetch()
      const grow = await Factory.model('App/Models/Informations/Grow').make()
      const actions = await Factory.model('App/Models/Informations/Action').makeMany(2)
      const competitions = await Factory.model('App/Models/Informations/Competition').makeMany(3)
      const strengthandweaknesses = await Factory.model('App/Models/Informations/StrengthAndWeakness').makeMany(5)

      return Promise.all([
        contacts.rows.map(async contact => contact.proposals().attach(proposal.id)),
        proposal.grow().create(grow.$attributes),
        proposal.actions().createMany(actions.map(action => action.$attributes)),
        proposal.competitions().createMany(competitions.map(competition => competition.$attributes)),
        proposal.strengthandweaknesses().createMany(strengthandweaknesses.map(strengthandweakness => strengthandweakness.$attributes))
      ])
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
    const proposalContactsPromises = proposalContacts.rows.map(async (proposalcontact) => {
      const roles = await Factory.model('App/Models/Informations/Role').makeMany(Math.floor(Math.random() * 3))
      const feeling = await Factory.model('App/Models/Informations/Feeling').make()
      return Promise.all([
        proposalcontact.feeling().create(feeling.$attributes),
        proposalcontact.roles().createMany(roles.map(role => role.$attributes))
      ])
    })
    await Promise.all(proposalContactsPromises)

    /*
    * Influences & Needforchanges for contacts
    */
    const contactInfluences = contacts.map(async contact => {
      const influence = await Factory.model('App/Models/Informations/Influence').make()
      const needforchange = await Factory.model('App/Models/Informations/NeedForChange').make()
      return Promise.all([
        contact.influences().withTimestamps().create(influence.$attributes),
        contact.needforchanges().withTimestamps().create(needforchange.$attributes)
      ])
    })
    Promise.all(contactInfluences)

    /*
    * Influences for contacts of proposals
    */
    const proposalcontactInfluences = proposalContacts.rows.map(async proposalcontact => {
      const influence = await Factory.model('App/Models/Informations/Influence').make()
      const needforchange = await Factory.model('App/Models/Informations/NeedForChange').make()
      return Promise.all([
        proposalcontact.influences().withTimestamps().create(influence.$attributes),
        proposalcontact.needforchanges().withTimestamps().create(needforchange.$attributes)
      ])
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
