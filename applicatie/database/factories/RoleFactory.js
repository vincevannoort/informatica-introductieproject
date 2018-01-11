const Factory = use('Factory')

const availableTypes = ['chief', 'user', 'expert', 'ambassador']
Factory.blueprint('App/Models/Informations/Role', async faker => ({
  type: availableTypes[Math.floor(Math.random() * availableTypes.length)]
}))
