const Model = use('Model')

class ProposalContact extends Model {

  static boot() {
    super.boot()
    this.addGlobalScope(builder => {
      builder.with('information', async (builder) => {
        await builder
        .with('influences')
        .with('needforchanges')
        .with('socialmedias')
      })
      builder.with('roles')
      builder.with('influences')
      builder.with('needforchanges')
      builder.with('feeling')
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

  feeling() {
    return this.hasOne('App/Models/Informations/Feeling')
  }

}

module.exports = ProposalContact
