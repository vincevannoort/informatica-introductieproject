const Model = use('Model')

class ProposalContactInfluence extends Model {

  static get table() {
    return 'proposal_contact_influences'
  }

  proposalcontact() {
    return this.belongsTo('App/Models/Connection/ProposalContact')
  }

  influence() {
    return this.belongsTo('App/Models/Informations/Influence')
  }

}

module.exports = ProposalContactInfluence
