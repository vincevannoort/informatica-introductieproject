'use strict'

const { validateAll } = use('Validator')
const Contact = use('App/Models/Contact')
const Company = use('App/Models/Company')

class ContactController {

  /*
   * Get all contacts
   */
  async index({ request }) {
    return await Contact.query().with('companies').fetch()
  }

  /*
   * Get a single contact based on the parameters passed from the get request
   * @param id, the contact id from api routes defined in routes.js
   */
  async show({ params, response }) {
    // try to return the contact with contact id from the request
    try {
      return await Contact.query()
      .where(Contact.primaryKey, params.id) // get contact with specific id
      .with('companies') // get companies from previous found specific contact
      .firstOrFail()
    }
    // if there was an error while trying to return a contact, return an error
    catch (error) {
      return response.status(404).send('Contact not found')
    }
  }

  async store({ auth, params, request, response }) {
    // set rules which must be validated before storing a contact
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
    let company_id = request.all().company_id
    const validation = await validateAll(contactData, rules)

    // if validation fails, return a unprocessable entity proces code with the validation messages
    if (validation.fails()) {
      return response.status(422).send(validation.messages())
    }

    // store a new contact
    let contact = await Contact.create({
      profession: contactData.profession,
      first_name: contactData.first_name,
      last_name: contactData.last_name,
      telephone: contactData.telephone,
      email: contactData.email
    })

    // attach company to created contact
    await contact.companies().attach([company_id])

    // return contact data
    return contact
  }

}

module.exports = ContactController