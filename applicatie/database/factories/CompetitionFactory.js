const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/Competition', async faker => ({
  company: faker.company(),
  counter_proposal: faker.sentence({ words: 5 }),
  position: faker.sentence({ words: 5 }),
  grading: faker.integer({ min: 0, max: 4 })
}))
