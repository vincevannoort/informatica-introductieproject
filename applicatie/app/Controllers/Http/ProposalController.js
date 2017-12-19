'use strict'

const Proposal = use('App/Models/Proposal')

class ProposalController {

  /*
   * Get all proposals
   */
  async index({ request }) {
    return await Proposal.all()
  }

  /*
   * Get a single proposal based on the parameters passed from the get request
   * @param id, the proposal id from api routes defined in routes.js
   */
  async show({ params, response }) {
    // try to return the proposal with proposal id from the request
    try {
      const proposal = await Proposal.find(params.id)
      await proposal.load('relation') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
      return proposal
    }
    // if there was an error while trying to return a proposal, return an error
    catch (error) {
      return response.status(404).send('Proposal not found')
    }
  }

  /*
   * Destroy an existing proposal
   */
  async destroy({ auth, params, request, response }) {
    // try to delete the proposal with proposal id from the request
    try {
      const proposal = await Proposal.find(params.id)
      return await proposal.delete()
    }
    // if there was an error while trying to delete a proposal, return an error
    catch (error) {
      return response.status(404).send(error)
    }
  }

}

module.exports = ProposalController
