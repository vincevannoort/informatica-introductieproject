'use strict'

const Company = use('App/Models/Company')

class CompanyController {
	async index({request}) {
    const companies = await Company.all()
    return companies
  }
}

module.exports = CompanyController
