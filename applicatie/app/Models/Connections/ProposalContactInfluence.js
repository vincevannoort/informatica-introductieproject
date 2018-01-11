const Model = use('Model')

class ProposalContactNeedForChange extends Model {

  static get table() {
    return 'proposal_contact_need_for_changes'
  }

  proposalcontact() {
    return this.belongsTo('App/Models/Connections/ProposalContact')
  }

  needforchange() {
    return this.belongsTo('App/Models/Informations/NeedForChange')
  }

}

module.exports = ProposalContactNeedForChange
