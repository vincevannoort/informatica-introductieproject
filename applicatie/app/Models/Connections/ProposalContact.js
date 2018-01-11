const Model = use('Model')

class ProposalContact extends Model {

  static boot() {
    super.boot()
    this.addGlobalScope(builder => {
      builder.with('information')
      builder.with('roles')
    })
  }

  static get table() {
    return 'contact_proposals'
  }

  proposal() {
    return this.belongsTo('App/Models/Proposal')
  }

  // data of a contact
  information() {
    return this.belongsTo('App/Models/Contact')
  }

  roles() {
    return this.hasMany('App/Models/Role')
  }

}

module.exports = ProposalContact
