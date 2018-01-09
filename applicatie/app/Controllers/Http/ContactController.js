const { validateAll } = use('Validator')
const Contact = use('App/Models/Contact')
const Relation = use('App/Models/Relation')

// set rules which must be validated before storing/updating a contact
const rules = {
  profession: 'required',
  first_name: 'required',
  last_name: 'required',
  telephone: 'required',
  email: 'required|email'
}

/** ContactController */
class ContactController {

  /**
   * Get all contacts
   * @returns {object} - all contacts
   */
  async index() {
    return Contact.query().with('relations').fetch()
  }

  /**
   * Get a single contact based on the parameters passed from the get request
   * @param {integer} id - the contact id from api routes defined in routes.js
   * @returns {object} - single contact
   */
  async show({ params, response }) {
    // try to return the contact with contact id from the request
    try {
      const contact = await Contact.find(params.id)
      await contact.load('relations') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      await contact.load('notes.user') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      return contact
    } catch (error) {
      return response.status(404).send('Contact not found')
    }
  }

  /**
   * Store a single contact based on the parameters passed from the get request
   * @param {object} contact - all contact data (profession, first_name, last_name, telephone, email)
   * @param {integer} id - the relation id from api routes defined in routes.js
   * @returns {response} - 422, if validation fails
   * @returns {object} - single contact
   */
  async store({ request, response }) {
    // validate given request parameters
    const contactData = request.all().contact
    const relationId = request.all().relation_id
    const relation = await Relation.find(relationId)

    // validate given request parameters
    const validation = await validateAll(contactData, rules)

    // if validation fails, return a unprocessable entity proces code with the validation messages
    if (validation.fails()) {
      return response.status(422).send(validation.messages())
    }

    // store a new contact
    const contact = await Contact.create({
      profession: contactData.profession,
      first_name: contactData.first_name,
      last_name: contactData.last_name,
      telephone: contactData.telephone,
      email: contactData.email
    })

    // attach relation to created contact
    await contact.relations().attach([relationId])

    // calculate insight for the relation attached to the contact
    await Relation.calculateInsightForEveryProposalByRelations(relation)

    // return contact data
    return contact
  }

  /**
   * Update a existing relation
   * @param {object} contact - all contact data (id, profession, first_name, last_name, telephone, email)
   * @returns {response} - 422, if validation fails
   * @returns {object} - single contact
   */
  async update({ request, response }) {
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

      // calculate insight after contact has been updated for the relations attached to the updated contact
      const relations = await contact.relations().fetch()
      if (relations.rows && relations.rows.length) {
        await Relation.calculateInsightForEveryProposalByRelations(relations.rows)
      }

      await contact.load('relations') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      return contact
    } catch (error) {
      return response.status(404).send(error)
    }
  }

  /**
   * Destroy an existing contact
   * @param {integer} id - the contact id from api routes defined in routes.js
   * @returns {response} - 404, if contact does not exist
   * @returns {response} - 200, if deleted successful
   */
  async destroy({ params, response }) {
    // try to delete the contact with contact id from the request
    try {
      const contact = await Contact.find(params.id)
      const relations = await contact.relations().fetch()

      // delete the contact
      await contact.delete()

      // calculate insight after contact has been deleted for the relations attached to the deleted contact
      if (relations.rows && relations.rows.length) {
        await Relation.calculateInsightForEveryProposalByRelations(relations.rows)
      }

      return response.status(200).send('Contact deleted')
    } catch (error) {
      return response.status(404).send(error)
    }
  }

}

module.exports = ContactController
