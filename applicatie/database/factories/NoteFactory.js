const moment = require('moment') // eslint-disable-line import/newline-after-import
const Factory = use('Factory')

Factory.blueprint('App/Models/Informations/Note', async faker => ({
  user_id: faker.integer({ min: 1, max: 10 }),
  description: faker.sentence()
}))
