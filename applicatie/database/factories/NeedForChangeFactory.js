const Factory = use('Factory')

const availableValues = ['low', 'medium', 'high']
Factory.blueprint('App/Models/Informations/NeedForChange', async faker => ({
  value: availableValues[Math.floor(Math.random() * availableValues.length)],
  clarification: faker.sentence({ words: 5 })
}))
