'use strict'

const Contact = use('App/Models/Contact')

class ContactController {

  /*
   * Get all contacts
   */
  async index({ request }) {
    return await Contact.query().with('companies').fetch()
  }

  /*
   * Get a single company based on the parameters passed from the get request
   * @param id, the company id from api routes defined in routes.js
   */
  async show({ params, response }) {
    // try to return the company with company id from the request
    try {
      return await Contact.query()
      .where(Contact.primaryKey, params.id) // get company with specific id
      .with('companies') // get contacts from previous found specific company
      .firstOrFail()
    }
    // if there was an error while trying to return a company, return an error
    catch (error) {
      return response.status(404).send('Contact not found')
    }
  }

  async store({ auth, params, request, response }) {
    // set rules which must be validated before storing a company
    const rules = {
      profession: 'required',
      first_name: 'required',
      last_name: 'required',
      telephone: 'required',
      email: 'required'
    }

    // get the user responsible for storing, authentication already checked by middleware
    let user = await auth.getUser()

    // validate given request parameters
    let contactData = request.all().contact
    const validation = await validateAll(contactData, rules)

    // if validation fails, return a unprocessable entity proces code with the validation messages
    if (validation.fails()) {
      return response.status(422).send(validation.messages())
    }

    // store a new company
    let contact = await Contact.create({
      profession: contactData.profession,
      first_name: contactData.first_name,
      last_name: contactData.last_name,
      telephone: contactData.telephone,
      email: contactData.email
    })

    // return company data
    return contact
  }

}

module.exports = ContactController
