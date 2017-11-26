'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.first(),
    email: faker.email({domain: 'canon.nl'}),
    password: await Hash.make(faker.password())
  }
})

Factory.blueprint('App/Models/Company', async (faker) => {
  return {
    user_id: 0,
    name: faker.company(),
    active: true,
  }
})

Factory.blueprint('App/Models/Contact', async (faker) => {
  return {
    profession: faker.profession(),
    first_name: faker.first(),
    last_name: faker.last(),
    telephone: faker.phone({ formatted: false }),
    email: faker.email({domain: 'example.nl'}),
  }
})

Factory.blueprint('App/Models/Proposal', async (faker) => {
  return {
    company_id: 0,
    name: faker.sentence({words: 5})
  }
})

Factory.blueprint('App/Models/Type', async (faker) => {
  return {
    name: faker.word(),
  }
})