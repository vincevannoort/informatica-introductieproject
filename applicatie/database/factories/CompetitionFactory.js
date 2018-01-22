const Factory = use('Factory')

const availableGrading = ['much better', 'better', 'equal', 'worse', 'much worse']

Factory.blueprint('App/Models/Informations/Competition', async faker => ({
  company: faker.company(),
  counter_proposal: faker.sentence({ words: 5 }),
  position: faker.sentence({ words: 5 }),
  grading: availableGrading[Math.floor(Math.random() * availableGrading.length)]
}))
