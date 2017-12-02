const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.first(),
    email: faker.email({domain: 'canon.nl'}),
    password: await Hash.make(faker.password())
  }
})