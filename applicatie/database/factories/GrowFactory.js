const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/Grow', async faker => ({
  goal: faker.sentence({ words: 5 }),
  reality: faker.sentence({ words: 5 }),
  opportunity: faker.sentence({ words: 5 }),
  will: faker.sentence({ words: 5 })
}))
