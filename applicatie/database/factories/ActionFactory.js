const Factory = use('Factory')

Factory.blueprint('App/Models/Information/Action', async faker => ({
  proposal_id: faker.integer({ min: 1, max: 150 }),
  smart_action: faker.string()
}))
