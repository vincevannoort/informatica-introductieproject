'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')
const Company = use('App/Models/Company')
const Contact = use('App/Models/Contact')
const Type = use('App/Models/Type')

Route.on('/').render('welcome')

Route.get('/companies', async ({ params }) => {
  const companies = await Company.query().with('contacts').fetch()
  return companies
})

Route.get('/contacts', async ({ params }) => {
  const contacts = await Contact.query().with('companies').fetch()
  return contacts
})

Route.get('/types', async ({ params }) => {
  const types = await Type.query().with('companies').fetch()
  return types
})