const { validateAll } = use('Validator')
const Relation = use('App/Models/Relation')

// set rules which must be validated before storing/updating a relation
const rules = { name: 'required' }

/** RelationController */
class RelationController {

  /**
   * Get all relations, with their contacts
   * @returns {object} - all relations with contacts
   */
  async index() {
    return Relation.query().with('contacts').fetch()
  }

  /**
   * Get a single relation based on the parameters passed from the get request
   * @param {integer} id - the relation id from api routes defined in routes.js
   * @returns {object} - single relation
   */
  async show({ params, response }) {
    // try to return the relation with relation id from the request
    try {
      const relation = await Relation.find(params.id)
      await relation.load('contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      await relation.load('proposals.contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      return relation
    } catch (error) {
      return response.status(404).send('Relation not found')
    }
  }

  /**
   * Store a new relation
   * @param {object} contact - all relation data (name)
   * @returns {response} - 422, if validation fails
   * @returns {object} - single relation
   */
  async store({ auth, request, response }) {
    // get the user responsible for storing, authentication already checked by middleware
    const user = await auth.getUser()

    // validate given request parameters
    const relationData = request.all().relation
    const validation = await validateAll(relationData, rules)

    // if validation fails, return a unprocessable entity proces code with the validation messages
    if (validation.fails()) {
      return response.status(422).send(validation.messages())
    }

    // store a new relation
    const relation = await Relation.create({
      user_id: user.id,
      name: relationData.name
    })

    // return relation data
    return relation
  }

  /**
   * Update a existing relation
   * @param {object} relation - all contact data (name)
   * @returns {response} - 422, if validation fails
   * @returns {object} - single relation
   */
  async update({ request, response }) {
    try {
      // get relation data from request
      const relationData = request.all().relation

      // validate given request parameters
      const validation = await validateAll(relationData, rules)

      // if validation fails, return a unprocessable entity proces code with the validation messages
      if (validation.fails()) {
        return response.status(422).send(validation.messages())
      }

      // merge passed data to relation object
      const relation = await Relation.find(relationData.id)
      relation.merge({ name: relationData.name })
      // save the merged data to database
      await relation.save()
      return relation
    } catch (error) {
      return response.status(404).send(error)
    }
  }

  /**
   * Destroy an existing relation
   * @param {integer} id - the relation id from api routes defined in routes.js
   * @returns {response} - 404, if relation does not exist
   * @returns {response} - 200, if deleted successful
   */
  async destroy({ params, response }) {
    // try to delete the relation with relation id from the request
    try {
      const relation = await Relation.find(params.id)
      return await relation.delete()
    } catch (error) {
      return response.status(404).send(error)
    }
  }

}

module.exports = RelationController
