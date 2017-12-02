'use strict'

const Company = use('App/Models/Company')

class CompanyController {

	async index({ request }) {
    // const companies = await Company.all()
    const companies = await Company.query().with('contacts').fetch()
    return companies
  }

  async show({ params, response}) {
    try {
      return await Company.query().where(Company.primaryKey, params.id).with('contacts').firstOrFail()
    } catch (error) {
      console.log(error)
      return response.send('Company not found')
    }
  }

}

module.exports = CompanyController
