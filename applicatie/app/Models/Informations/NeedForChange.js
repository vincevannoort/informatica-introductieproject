const Model = use('Model')

class NeedForChange extends Model {

  contact() {
    return this.belongsTo('App/Models/Contact')
  }

  proposalcontact() {
    return this.belongsTo('App/Models/Connection/ProposalContact')
  }

}

module.exports = NeedForChange
