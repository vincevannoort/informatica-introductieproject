const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async faker => ({
  profession: faker.profession(),
  first_name: faker.first(),
  last_name: faker.last(),
  username: faker.first(),
  email: faker.email({ domain: 'canon.nl' }),
  password: await Hash.make(faker.password())
}))
