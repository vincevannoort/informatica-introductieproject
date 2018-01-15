const Model = use('Model')

class Feeling extends Model {

  contact() {
    return this.belongsTo('App/Models/Connections/ProposalContact')
  }

}

module.exports = Feeling
