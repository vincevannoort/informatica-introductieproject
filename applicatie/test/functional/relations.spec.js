const { skip, before, test, trait } = use('Test/Suite')('Relations')
const User = use('App/Models/User')
const Relation = use('App/Models/Relation')
let testUser

trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')

before(async () => {
  testUser = await User.find(1)
})

test('Add a new relation', async ({ client }) => {
  // create a relation
  const response = await client
    .post('/api/relations')
    .send({ relation: { name: 'Apple inc.' } })
    .loginVia(testUser)
    .end()

  // check if relation is made
  response.assertStatus(200)
  response.assertJSONSubset({ user_id: testUser.id, name: 'Apple inc.' })
})

test('Get all relations', async ({ client }) => {
  // create another relation, so 2 relations are returned
  await client
    .post('/api/relations')
    .send({ relation: { name: 'Facebook' } })
    .loginVia(testUser)
    .end()

  // get all relations
  const response = await client
    .get('/api/relations')
    .loginVia(testUser)
    .end()

  // check if all relations are returned
  response.assertJSONSubset([
    { user_id: testUser.id, name: 'Apple inc.' },
    { user_id: testUser.id, name: 'Facebook' }
  ])
})

test('Edit a existing relation', async ({ client }) => {
  const relation = await Relation.find(1)

  // get the unchagned relation
  const responseBefore = await client
    .get(`/api/relations/${relation.id}`)
    .loginVia(testUser)
    .end()

  // check if the previous same relation wasn't changed
  responseBefore.assertStatus(200)
  responseBefore.assertJSONSubset({ user_id: testUser.id, name: 'Apple inc.' })

  // change the current relation and persist it to the database
  relation.name = 'test'
  const responseAfter = await client
    .patch(`/api/relations/${relation.id}`)
    .send({ relation })
    .loginVia(testUser)
    .end()

  // check if the previous same relation was changed
  responseAfter.assertStatus(200)
  responseAfter.assertJSONSubset({ user_id: testUser.id, name: 'test' })
})

test('Validate a new relation', async ({ client, assert }) => {
  // post a new relation that should fail the validation
  const responseShouldFail = await client
    .post('/api/relations')
    .send({ relation: { name: '' } })
    .loginVia(testUser)
    .end()

  // check if the change failed due to validation
  responseShouldFail.assertStatus(422)
  assert.deepEqual(responseShouldFail.body, [
    { field: 'name', validation: 'required', message: 'required validation failed on name' }
  ])

  // post a new relation  that should pass the validatoin
  const responseShouldPass = await client
    .post('/api/relations')
    .send({ relation: { name: 'Given name' } })
    .loginVia(testUser)
    .end()

  // check if the change was successful
  responseShouldPass.assertStatus(200)
  responseShouldPass.assertJSONSubset({ user_id: testUser.id, name: 'Given name' })
})

test('Validate a existing relation', async ({ client, assert }) => {
  const relation = await Relation.find(1)

  // change a existing relation that should fail the validation
  relation.name = ''
  const responseShouldFail = await client
    .patch(`/api/relations/${relation.id}`)
    .send({ relation })
    .loginVia(testUser)
    .end()

  // check if the change failed due to validation
  responseShouldFail.assertStatus(422)
  assert.deepEqual(responseShouldFail.body, [
    { field: 'name', validation: 'required', message: 'required validation failed on name' }
  ])

  // change a existing relation that should pass the validation
  relation.name = 'Google'
  const responseShouldPass = await client
    .patch(`/api/relations/${relation.id}`)
    .send({ relation })
    .loginVia(testUser)
    .end()


  // check if the change was successful
  responseShouldPass.assertStatus(200)
  responseShouldPass.assertJSONSubset({ user_id: testUser.id, name: 'Google' })
})

test('Attach a contact to an relation', async ({ client }) => {
  const relation = await Relation.find(1)

  // create a contact, that will be used to attach to an relation
  await client
    .post('/api/contacts')
    .send({ contact: { profession: 'Tester', first_name: 'John', last_name: 'Doe', telephone: '0652144206', email: 'test@canon.nl' }, relation_id: relation.id })
    .loginVia(testUser)
    .end()

  // get the unchagned relation
  const response = await client
    .get(`/api/relations/${relation.id}`)
    .loginVia(testUser)
    .end()

  // check if the change was successful
  response.assertStatus(200)
  response.assertJSONSubset({ user_id: testUser.id, name: 'Google', contacts: [{ profession: 'Tester', first_name: 'John', last_name: 'Doe', telephone: '0652144206', email: 'test@canon.nl' }] })
})

skip('Attach a proposal to an relation', async () => {})

skip('Calculate total insight based on proposals', async () => {})

skip('Seperate relations in 3 groups', async () => {})

skip('Delete a existing relation', async () => {})

test('Check authentication for relations', async ({ client, assert }) => {
  // try create a relation without login
  const response = await client
    .post('/api/relations')
    .send({ relation: { name: 'Another company' } })
    .end()

  // check if unauthenticated
  response.assertStatus(401)
  assert.equal(response.error.text, 'InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided')
})
