'use strict'

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

  // TODO: return 404 when company not found
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
      console.log('Company not found')
      return response.send('Company not found')
    }
  }

}

module.exports = CompanyController
