const Model = use('Model')

class ProposalContact extends Model {

  static boot() {
    super.boot()
    this.addGlobalScope(builder => {
      builder.with('information')
      builder.with('roles')
      builder.with('influences')
      builder.with('needforchanges')
    })
  }

  static get table() {
    return 'proposal_contacts'
  }

  proposal() {
    return this.belongsTo('App/Models/Proposal')
  }

  // data of a contact
  information() {
    return this.belongsTo('App/Models/Contact')
  }

  roles() {
    return this.hasMany('App/Models/Informations/Role')
  }

  influences() {
    return this.belongsToMany('App/Models/Informations/Influence').pivotTable('proposal_contact_influences')
  }

  needforchanges() {
    return this.belongsToMany('App/Models/Informations/NeedForChange').pivotTable('proposal_contact_need_for_changes')
  }

}

module.exports = ProposalContact
