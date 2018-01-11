const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/Competition', async faker => ({
  proposal_id: faker.integer({ min: 1, max: 150 }),
  company: faker.company(),
  counter_proposal: faker.sentence({ words: 5 }),
  position: faker.sentence({ words: 5 })
}))
