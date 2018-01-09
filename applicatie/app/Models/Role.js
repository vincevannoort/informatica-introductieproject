const Model = use('Model')

class Role extends Model {

  proposalcontact() {
    return this.belongsTo('App/Models/Connections/ProposalContact')
  }

}

module.exports = Role
