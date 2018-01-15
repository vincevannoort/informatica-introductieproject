const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/Feeling', async faker => ({
  feeling: faker.integer({ min: 0, max: 10 })
}))
