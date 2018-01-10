const Model = use('Model')

class ProposalContact extends Model {

  static boot() {
    super.boot()
    this.addGlobalScope(builder => {
      builder.with('contact')
      builder.with('roles')
    })
  }

  static get table() {
    return 'contact_proposals'
  }

  proposal() {
    return this.belongsTo('App/Models/Proposal')
  }

  contact() {
    return this.belongsTo('App/Models/Contact')
  }

  roles() {
    return this.hasMany('App/Models/Role')
  }

}

module.exports = ProposalContact
