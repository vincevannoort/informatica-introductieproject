const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/Action', async faker => ({
  smart_action: faker.sentence({ words: 5 })
}))
