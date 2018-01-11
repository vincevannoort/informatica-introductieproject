const moment = require('moment') // eslint-disable-line import/newline-after-import
const Factory = use('Factory')
const DATE_FORMAT = 'YYYY-MM-DD'

Factory.blueprint('App/Models/Informations/Notes', async faker => ({
  user_id: faker.integer({ min: 1, max: 10 }),
  description: faker.sentence(),
  date: moment().format(DATE_FORMAT)
}))
