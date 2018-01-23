const Factory = use('Factory')

const availableSocialMedias = ['linkedin', 'facebook', 'twitter']
Factory.blueprint('App/Models/Informations/SocialMedia', async faker => ({
  type: availableSocialMedias[Math.floor(Math.random() * availableSocialMedias.length)],
  url: faker.url()
}))
