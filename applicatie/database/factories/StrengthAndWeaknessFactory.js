const Factory = use('Factory')

const availableTypes = ['strength', 'weakness']

Factory.blueprint('App/Models/Informations/StrengthAndWeakness', async faker => ({
  type: availableTypes[Math.floor(Math.random() * availableTypes.length)],
  description: faker.sentence({ words: 5 })
}))
