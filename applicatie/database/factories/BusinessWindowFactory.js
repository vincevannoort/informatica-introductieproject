const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/BusinessWindow', async faker => ({
  relation_id: faker.integer({ min: 1, max: 50 }),
  objectives: faker.string(),
  products: faker.string(),
  philosophy: faker.string(),
  organisation: faker.string()
}))
