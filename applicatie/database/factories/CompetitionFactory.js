const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/Competition', async faker => ({
  proposal_id: faker.integer({ min: 1, max: 150 }),
  company: faker.string(),
  counter_proposal: faker.string(),
  position: faker.string()
}))
