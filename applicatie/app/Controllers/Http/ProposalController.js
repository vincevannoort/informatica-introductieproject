const { validateAll } = use('Validator')
const Proposal = use('App/Models/Proposal')
const Relation = use('App/Models/Relation')

// set rules which must be validated before storing/updating a proposal
const rules = {
  name: 'required',
  value: 'required',
  start: 'required',
  close: 'required'
}

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
      await proposal.loadMany([
        'relation',
        'contacts',
        'competitions',
        'actions',
        'grow',
        'strengthandweaknesses'
      ])
      return proposal
    } catch (error) {
      return response.status(404).send('Proposal not found')
    }
  }

  /**
   * Store a new proposal
   * @param {object} proposal - all proposal data (name)
   * @param {integer} relation_id - relation id which the proposal belongs to
   * @param {[integer]} contact_ids - ids of contacts that should be added to the proposal
   * @returns {response} - 422, if validation fails
   * @returns {object} - single proposal
   */
  async store({ response, request }) {
    const params = await request.all()
    const relation = await Relation.find(params.relation_id)
    const proposalData = params.proposal

    // validate given request parameters
    const validation = await validateAll(proposalData, rules)
    if (validation.fails()) {
      return response.status(422).send(validation.messages())
    }

    const proposal = await Proposal.create({
      relation_id: relation.id,
      name: proposalData.name,
      value: proposalData.value,
      start: proposalData.start,
      close: proposalData.close,
      insight: Math.floor(Math.random() * 100)
    })

    // Todo: fix attaching contacts when storing
    // proposal.contacts().attach(params.contact_ids)

    // calculate insight for the relation attached to the contact
    await Relation.calculateInsightForEveryProposalByRelations(relation)

    await proposal.load('relation') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
    await proposal.load('contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
    return proposal
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

  async calculateInsight({ params }) {
    const proposal = await Proposal.find(params.proposal_id)
    return proposal.calculateInsight()
  }

}

module.exports = ProposalController
