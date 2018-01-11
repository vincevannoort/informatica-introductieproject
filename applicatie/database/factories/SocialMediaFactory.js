const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/SocialMedia', async faker => ({
  contact_id: faker.integer({ min: 1, max: 150 }),
  url: faker.string()
}))
