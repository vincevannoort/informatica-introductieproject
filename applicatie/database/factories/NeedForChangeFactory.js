const Factory = use('Factory')

Factory.blueprint('App/Models/Information/NeedForChange', async faker => ({
  clarification: faker.string()
}))
