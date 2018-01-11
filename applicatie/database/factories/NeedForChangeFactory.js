const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/NeedForChange', async faker => ({
  clarification: faker.sentence({ words: 5 })
}))
