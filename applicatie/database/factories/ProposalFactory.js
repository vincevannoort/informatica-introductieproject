const Factory = use('Factory')

Factory.blueprint('App/Models/Proposal', async (faker) => {
  return {
    relation_id: faker.integer({min: 1, max: 50}),
    name: faker.sentence({words: 5}),
    insight: faker.integer({min: 0, max: 100}),
  }
})