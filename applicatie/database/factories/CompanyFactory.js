const Factory = use('Factory')

Factory.blueprint('App/Models/Company', async (faker) => {
  return {
    user_id: faker.integer({min: 1, max: 10}),
    type_id: faker.integer({min: 1, max: 3}),
    name: faker.company(),
    active: true,
    insight_total: faker.integer({min: 60, max: 100}),
  }
})