const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/StrengthAndWeakness', async faker => ({
  description: faker.sentence({ words: 5 })
}))