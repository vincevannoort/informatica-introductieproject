const Factory = use('Factory')

Factory.blueprint('App/Models/Relation', async (faker) => {
  return {
    user_id: faker.integer({min: 1, max: 10}),
    name: faker.company(),
    active: true,
    insight_total: faker.integer({min: 60, max: 100}),
    value_total: faker.integer({min: 5000, max: 100000}),
  }
})
