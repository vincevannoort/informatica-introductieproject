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
      await relation.loadMany([
        'strengthandweaknesses',
        'businesswindow'
      ]) // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      await relation.load('contacts', async (builder) => {
        await builder.with('influences').with('needforchanges').with('socialmedias')
      })
      await relation.load('proposals', async (builder) => {
        await builder.with('contacts').with('relation')
      })
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
      name: relationData.name,
      active: true,
      value_total: 0,
      insight_total: 0
    })

    // return relation data
    await relation.load('contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
    await relation.load('proposals.contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
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

      // calculate insight for the relation after the updates have been made
      await Relation.calculateInsightForEveryProposalByRelations(relation)

      await relation.load('contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      await relation.load('proposals.contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
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

  /**
   * Calculate insight for every proposal
   * @param {integer} id - the proposal id from api routes defined in routes.js
   * @returns {integer} - calculated insight
   */
  async calculateInsightForEveryProposal({ params }) {
    const relation = await Relation.find(params.relation_id)
    return relation.calculateInsightForEveryProposal()
  }

  async storeCustomerBusinessWindow({ request, params }) {
    const relation = await Relation.find(params.relation_id)
    const customerBusinessWindowData = request.all().customerbusinesswindow
    return relation.businesswindow().create(customerBusinessWindowData)
  }

  async storeStrengthOrWeakness({ request, params }) {
    const relation = await Relation.find(params.relation_id)
    const strengthOrWeaknessData = request.all().strengthorweakness
    return relation.strengthandweaknesses().withTimestamps().create(strengthOrWeaknessData)
  }

}

module.exports = RelationController
