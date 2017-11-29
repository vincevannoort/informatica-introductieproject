const Factory = use('Factory')

Factory.blueprint('App/Models/Type', async (faker) => {
  return {
    name: faker.word(),
  }
})