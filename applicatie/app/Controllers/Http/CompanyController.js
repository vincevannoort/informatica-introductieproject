'use strict'

const Company = use('App/Models/Company')

class CompanyController {
  
	async index({ request }) {
    const companies = await Company.all()
    return companies
  }

  async show({ params, response}) {
    try {
      return await Company.findOrFail(params.id)
    } catch (error) {
      return response.send('Company not found')
    }
  }

}

module.exports = CompanyController
