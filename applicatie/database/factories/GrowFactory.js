const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/Grow', async faker => ({
  proposal_id: faker.integer({ min: 1, max: 150 }),
  goal: faker.sentence({ words: 5 }),
  reality: faker.sentence({ words: 5 }),
  opportunity: faker.sentence({ words: 5 }),
  will: faker.sentence({ words: 5 })
}))
