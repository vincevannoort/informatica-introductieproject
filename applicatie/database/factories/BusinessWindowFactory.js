const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/BusinessWindow', async faker => ({
  relation_id: faker.integer({ min: 1, max: 50 }),
  objectives: faker.sentence({ words: 5 }),
  products: faker.sentence({ words: 5 }),
  philosophy: faker.sentence({ words: 5 }),
  organisation: faker.sentence({ words: 5 })
}))
