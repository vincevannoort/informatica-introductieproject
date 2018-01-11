const Factory = use('Factory')

Factory.blueprint('App/Models/Information/Grow', async faker => ({
  proposal_id: faker.integer({ min: 1, max: 150 }),
  goal: faker.string(),
  reality: faker.string(),
  opportunity: faker.string(),
  will: faker.string()
}))
