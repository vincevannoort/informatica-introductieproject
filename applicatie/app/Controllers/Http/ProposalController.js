const { validateAll } = use('Validator')
const Proposal = use('App/Models/Proposal')
const Relation = use('App/Models/Relation')
const Contact = use('App/Models/Contact')
const ProposalContact = use('App/Models/Connections/ProposalContact')
const Grow = use('App/Models/Informations/Grow')

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
    return Proposal.query()
    .with('relation')
    .with('contacts')
    .fetch()
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
        'relation.contacts',
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
      relation_id: params.relation_id,
      name: proposalData.name,
      value: proposalData.value,
      start: proposalData.start,
      close: proposalData.close,
      insight: 0
    })

    // calculate insight for the relation attached to the contact
    await Relation.calculateInsightForEveryProposalByRelations(relation)

    await proposal.load('relation') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
    await proposal.load('contacts') // lazy eager load: http://adonisjs.com/docs/4.0/relationships#_lazy_eager_loading
    return proposal
  }

  async update({ request, response }) {
    try {
      // get proposal data from request
      const proposalData = request.all().proposal

      // validate given request parameters
      const validation = await validateAll(proposalData, rules)

      // if validation fails, return a unprocessable entity proces code with the validation messages
      if (validation.fails()) {
        return response.status(422).send(validation.messages())
      }

      // merge passed data to proposal object
      const proposal = await Proposal.find(proposalData.id)
      proposal.merge({
        name: proposalData.name,
        value: proposalData.value,
        start: proposalData.start,
        close: proposalData.close
      })
      // save the merged data to database
      await proposal.save()
      return proposal
    } catch (error) {
      return response.status(404).send(error)
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

  /**
   * Calculate insight
   * @param {integer} id - the proposal id from api routes defined in routes.js
   * @returns {integer} - calculated insight
   */
  async calculateInsight({ params }) {
    const proposal = await Proposal.find(params.proposal_id)
    return proposal.calculateInsight()
  }

  async storeStrengthOrWeakness({ request, params }) {
    const proposal = await Proposal.find(params.proposal_id)
    const strengthOrWeaknessData = request.all().strengthorweakness
    return proposal.strengthandweaknesses().withTimestamps().create(strengthOrWeaknessData)
  }

  async storeRole({ request, params }) {
    const contact = await ProposalContact.find(params.contact_id)
    const roleData = request.all().role
    return contact.roles().create(roleData)
  }

  async storeCompetition({ request, params }) {
    const proposal = await Proposal.find(params.proposal_id)
    let competitionData = request.all().competition
    competitionData.proposal_id = proposal.id
    return proposal.competitions().create(competitionData)
  }

  async storeAction({ request, params }) {
    const proposal = await Proposal.find(params.proposal_id)
    let actionData = request.all().smart
    actionData.proposal_id = proposal.id
    console.log(actionData)
    return proposal.actions().create(actionData)
  }

  async storeGrow({ request, params }) {
    const proposal = await Proposal.find(params.proposal_id)
    let growData = request.all().grow
    growData.proposal_id = proposal.id
    return proposal.grow().create(growData)
  }

  async updateGrow ({ request, params }) {
    const growData = request.all().grow
    const grow = await Grow.find(growData.id)
    grow.merge({
      goal: growData.goal,
      reality: growData.reality,
      opportunity: growData.opportunity,
      will: growData.will
    })
    await grow.save()
    return grow
  }

  async getGrow({ request, params }) {
    const proposal = await Proposal.find(params.proposal_id)
    return proposal.grow().fetch()
  }

  async storeContact({ request, params }) {
    const proposal = await Proposal.find(params.proposal_id)
    const contact = await Contact.find(request.all().contact_id)
    return contact.proposals().attach(proposal.id)
  }

  async removeContact({ request, params }) {
    const proposal = await Proposal.find(params.proposal_id)
    const contact = await Contact.find(params.contact_id)
    return contact.proposals().detach(proposal.id)
  }

}

module.exports = ProposalController
