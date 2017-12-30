const moment = require('moment')
const Factory = use('Factory')
const DATE_FORMAT = 'YYYY-MM-DD'

Factory.blueprint('App/Models/Proposal', async (faker) => {
  return {
    relation_id: faker.integer({min: 1, max: 50}),
    name: faker.sentence({words: 5}),
    value: faker.integer({min: 5000, max: 100000}),
    start: moment().format(DATE_FORMAT),
    close: moment().add(Math.floor(Math.random() * 80) + 30, 'days').format(DATE_FORMAT),
    insight: faker.integer({min: 0, max: 100}),
  }
})
