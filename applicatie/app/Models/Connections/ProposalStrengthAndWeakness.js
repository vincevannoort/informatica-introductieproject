const Model = use('Model')

class ProposalStrengthAndWeakness extends Model {

  static get table() {
    return 'proposal_strength_and_weaknesses'
  }

  proposal() {
    return this.belongsTo('App/Models/Proposal')
  }

  strengthandweakness() {
    return this.belongsTo('App/Models/Informations/StrengthAndWeakness')
  }

}

module.exports = ProposalStrengthAndWeakness
