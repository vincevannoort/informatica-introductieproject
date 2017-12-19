'use strict'

const { validateAll } = use('Validator')
const Contact = use('App/Models/Contact')

// set rules which must be validated before storing/updating a contact
const rules = {
  profession: 'required',
  first_name: 'required',
  last_name: 'required',
  telephone: 'required',
  email: 'required|email'
}

class ContactController {

  /*
   * Get all contacts
   */
  async index({ request }) {
    return await Contact.query().with('relations').fetch()
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
      .with('relations') // get relations from previous found specific contact
      .firstOrFail()
    }
    // if there was an error while trying to return a contact, return an error
    catch (error) {
      return response.status(404).send('Contact not found')
    }
  }

  async store({ auth, params, request, response }) {
    // get the user responsible for storing, authentication already checked by middleware
    let user = await auth.getUser()

    // validate given request parameters
    let contactData = request.all().contact
    let relation_id = request.all().relation_id

    // validate given request parameters
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

    // attach relation to created contact
    await contact.relations().attach([relation_id])

    // return contact data
    return contact
  }

  /*
   * Update a existing relation
   */
  async update({ auth, params, request, response }) {
    try {
      // get contact data from request
      const contactData = request.all().contact
      
      // validate given request parameters
      const validation = await validateAll(contactData, rules)

      // if validation fails, return a unprocessable entity proces code with the validation messages
      if (validation.fails()) {
        return response.status(422).send(validation.messages())
      }

      // merge passed data to contact object
      const contact = await Contact.find(contactData.id)
      contact.merge({
        profession: contactData.profession,
        first_name: contactData.first_name,
        last_name: contactData.last_name,
        telephone: contactData.telephone,
        email: contactData.email
      })
      // save the merged data to database
      await contact.save()
      return contact
    }
    // if there was an error while trying to delete a contact, return an error
    catch (error) {
      return response.status(404).send(error)
    }
  }

  /*
   * Destroy an existing contact
   */
  async destroy({ auth, params, request, response }) {
    // try to delete the contact with contact id from the request
    try {
      const contact = await Contact.find(params.id)
      return await contact.delete()
    }
    // if there was an error while trying to delete a contact, return an error
    catch (error) {
      return response.status(404).send(error)
    }
  }

}

module.exports = ContactController
