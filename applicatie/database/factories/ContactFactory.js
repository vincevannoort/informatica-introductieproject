const Factory = use('Factory')

Factory.blueprint('App/Models/Contact', async faker => ({
  profession: faker.profession(),
  first_name: faker.first(),
  last_name: faker.last(),
  telephone: faker.phone({ formatted: false }),
  email: faker.email({ domain: 'example.nl' })
}))
