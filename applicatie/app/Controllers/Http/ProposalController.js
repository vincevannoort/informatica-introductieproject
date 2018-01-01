const Proposal = use('App/Models/Proposal')

/** ProposalController */
class ProposalController {

  /**
   * Get all proposals
   * @returns {object} - all proposals
   */
  async index() {
    return Proposal.all()
  }

  /**
   * Get a single proposal based on the parameters passed from the get request
   * @param {integer} id - the proposal id from api routes defined in routes.js
   * @returns {object} - single proposal
   */
  async show({ params, response }) {
    // try to return the proposal with proposal id from the request
    try {
      const proposal = await Proposal.find(params.id)
      await proposal.load('relation') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      await proposal.load('contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      return proposal
    } catch (error) {
      return response.status(404).send('Proposal not found')
    }
  }

  /**
   * Destroy an existing proposal
   * @param {integer} id - the proposal id from api routes defined in routes.js
   * @returns {response} - 404, if proposal does not exist
   * @returns {response} - 200, if deleted successful
   */
  async destroy({ params, response }) {
    // try to delete the proposal with proposal id from the request
    try {
      const proposal = await Proposal.find(params.id)
      return await proposal.delete()
    } catch (error) {
      return response.status(404).send(error)
    }
  }

}

module.exports = ProposalController
