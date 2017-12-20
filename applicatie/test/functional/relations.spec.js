'use strict'

const { before, test, trait } = use('Test/Suite')('Relations')
const Database = use('Database')
const User = use('App/Models/User')
const Relation = use('App/Models/Relation')
const Contact = use('App/Models/Contact')
let testUser

trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')

before(async () => {
  testUser = await User.find(1)
})

test('Add a new relation', async ({ client, assert }) => {
  // create a relation
  const response = await client
    .post('/api/relations')
    .send({ relation: { name: 'Apple inc.' } })
    .loginVia(testUser)
    .end()

  // check if relation is made
  response.assertStatus(200)
  response.assertJSONSubset({ user_id: testUser.id, name: 'Apple inc.'})
})

test('Get all relations', async ({ client, assert }) => {
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
      { user_id: testUser.id, name: 'Apple inc.'},
      { user_id: testUser.id, name: 'Facebook'},
  ])
})

test('Edit a existing relation', async ({ client, assert }) => {
  const relation = await Relation.find(1)

  // get the unchagned relation
  const response_before = await client
    .get(`/api/relations/${relation.id}`)
    .loginVia(testUser)
    .end()

  // check if the previous same relation wasn't changed
  response_before.assertStatus(200)
  response_before.assertJSONSubset({ user_id: testUser.id, name: 'Apple inc.'})

  // change the current relation and persist it to the database
  relation.name = 'test'
  const response_after = await client
    .patch(`/api/relations/${relation.id}`)
    .send({ relation: relation })
    .loginVia(testUser)
    .end()

  // check if the previous same relation was changed
  response_after.assertStatus(200)
  response_after.assertJSONSubset({ user_id: testUser.id, name: 'test'})
})

test('Validate a new relation', async ({ client, assert }) => {
  // post a new relation that should fail the validation
  const response_should_fail = await client
    .post('/api/relations')
    .send({ relation: { name: '' } })
    .loginVia(testUser)
    .end()

  // check if the change failed due to validation
  response_should_fail.assertStatus(422)
  assert.deepEqual(response_should_fail.body, [ 
    { field: 'name', validation: 'required', message: 'required validation failed on name' } 
  ])

  // post a new relation  that should pass the validatoin
  const response_should_pass = await client
    .post('/api/relations')
    .send({ relation: { name: 'Given name' } })
    .loginVia(testUser)
    .end()

  // check if the change was successful
  response_should_pass.assertStatus(200)
  response_should_pass.assertJSONSubset({ user_id: testUser.id, name: 'Given name'})
})

test('Validate a existing relation', async ({ client, assert }) => {
  const relation = await Relation.find(1)

  // change a existing relation that should fail the validation
  relation.name = ''
  const response_should_fail = await client
    .patch(`/api/relations/${relation.id}`)
    .send({ relation: relation })
    .loginVia(testUser)
    .end()

  // check if the change failed due to validation
  response_should_fail.assertStatus(422)
  assert.deepEqual(response_should_fail.body, [ 
    { field: 'name', validation: 'required', message: 'required validation failed on name' } 
  ])

  // change a existing relation that should pass the validation
  relation.name = 'Google'
  const response_should_pass = await client
    .patch(`/api/relations/${relation.id}`)
    .send({ relation: relation })
    .loginVia(testUser)
    .end()


  // check if the change was successful
  response_should_pass.assertStatus(200)
  response_should_pass.assertJSONSubset({ user_id: testUser.id, name: 'Google'})
})

test('Attach a contact to an relation', async ({ client, assert }) => { 
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
  response.assertJSONSubset({ user_id: testUser.id, name: 'Google', contacts: [{ profession: 'Tester', first_name: 'John', last_name: 'Doe', telephone: '0652144206', email: 'test@canon.nl' }]})
})

test('Attach a proposal to an relation', async ({ assert }) => { assert.isTrue(true) })

test('Calculate total insight based on proposals', async ({ assert }) => { assert.isTrue(true) })

test('Seperate relations in 3 groups', async ({ assert }) => { assert.isTrue(true) })