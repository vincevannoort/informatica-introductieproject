'use strict'

/*
|--------------------------------------------------------------------------
| ContactSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class ContactSeeder {
  async run () {
    const count = 150;
    const companies = 150;
    const proposals = 100;
  	const contacts = await Factory
 		.model('App/Models/Contact')
  		.createMany(count)

    // create a many to many relationship, attach a random company & proposal
    const Contact = use('App/Models/Contact')
    const Proposal = use('App/Models/Proposal')

    for (var i = 1; i <= count; i++) {
      const contact = await Contact.find(i);

      // attach to random company
      await contact.companies()
      .withTimestamps()
      .attach([Math.floor(Math.random() * companies) + 1]);

      // attach to random proposal
      await contact.proposals()
      .withTimestamps()
      .attach([Math.floor(Math.random() * proposals) + 1]);
    }
  }
}

module.exports = ContactSeeder
