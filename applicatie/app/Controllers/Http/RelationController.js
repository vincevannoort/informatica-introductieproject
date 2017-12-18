'use strict'

const { validateAll } = use('Validator')
const Relation = use('App/Models/Relation')

class RelationController {

  /*
   * Get all relations, with their contacts
   */
	async index({ request }) {
    return await Relation.query().with('contacts').fetch()
  }

  /* 
   * Get a single relation based on the parameters passed from the get request
   * @param id, the relation id from api routes defined in routes.js 
   */
  async show({ params, response }) {
    // try to return the relation with relation id from the request
    try {
      return await Relation.find(params.id);
    } 
    // if there was an error while trying to return a relation, return an error
    catch (error) {
      return response.status(404).send('Relation not found')
    }
  }

  /*
   * Store a new relation
   */
  async store({ auth, params, request, response }) {
    // set rules which must be validated before storing a relation
    const rules = {
      name: 'required',
    }

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

  /*
   * Update a existing relation
   */
  async update({ auth, params, request, response }) {
    try {
      // get relation data from request
      const relationData = request.all().relation
      const relation = await Relation.find(relationData.id)
      // merge passed data to relation object
      relation.merge({ name: relationData.name })
      // save the merged data to database
      await relation.save()
      return relation
    }
    // if there was an error while trying to delete a relation, return an error
    catch (error) {
      return response.status(404).send(error)
    }
  }

  /*
   * Store a existing relation
   */
  async destroy({ auth, params, request, response }) {
    // try to delete the relation with relation id from the request
    try {
      const relation = await Relation.find(params.id)
      return await relation.delete()
    } 
    // if there was an error while trying to delete a relation, return an error
    catch (error) {
      return response.status(404).send(error)
    }
  }

}

module.exports = RelationController
