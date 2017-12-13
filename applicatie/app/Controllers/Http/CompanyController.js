'use strict'

const { validateAll } = use('Validator')
const Company = use('App/Models/Company')

class CompanyController {

  /*
   * Get all companies, with their contacts
   */
	async index({ request }) {
    return await Company.query().with('contacts').fetch()
  }

  /* 
   * Get a single company based on the parameters passed from the get request
   * @param id, the company id from api routes defined in routes.js 
   */
  async show({ params, response }) {
    // try to return the company with company id from the request
    try {
      return await Company.query()
      .where(Company.primaryKey, params.id) // get company with specific id
      .with('contacts') // get contacts from previous found specific company
      .firstOrFail()
    } 
    // if there was an error while trying to return a company, return an error
    catch (error) {
      return response.status(404).send('Company not found')
    }
  }

  /*
   * Store a new company
   */
  async store({ auth, params, request, response }) {
    // set rules which must be validated before storing a company
    const rules = {
      name: 'required',
    }

    // get the user responsible for storing, authentication already checked by middleware
    let user = await auth.getUser()

    // validate given request parameters
    let companyData = request.all().company
    const validation = await validateAll(companyData, rules)

    // if validation fails, return a unprocessable entity proces code with the validation messages
    if (validation.fails()) {
      return response.status(422).send(validation.messages())
    }

    // store a new company
    let company = await Company.create({
      user_id: user.id,
      name: companyData.name
    })

    // return company data
    return company
  }

}

module.exports = CompanyController
