const Model = use('Model')

class Contact extends Model {

  relations() {
    return this.belongsToMany('App/Models/Relation').pivotTable('contact_relations')
  }

  proposals() {
    return this.belongsToMany('App/Models/Proposal').pivotTable('proposal_contacts')
  }

  notes() {
    return this.belongsToMany('App/Models/Informations/Note').pivotTable('contact_notes')
  }

  socialmedias() {
    return this.hasMany('App/Models/Informations/SocialMedia')
  }

  influences() {
    return this.belongsToMany('App/Models/Informations/Influence').pivotTable('contact_influences')
  }

  needforchanges() {
    return this.belongsToMany('App/Models/Informations/NeedForChange').pivotTable('contact_need_for_changes')
  }

}

module.exports = Contact
