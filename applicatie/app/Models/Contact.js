const Model = use('Model')

class Contact extends Model {

  relations() {
    return this.belongsToMany('App/Models/Relation').pivotTable('contact_relations')
  }

  proposals() {
    return this.belongsToMany('App/Models/Proposal').pivotTable('proposal_contacts')
  }

  notes() {
    return this.belongsToMany('App/Models/Information/Note').pivotTable('contact_notes')
  }

  socialmedias() {
    return this.hasMany('App/Models/Information/SocialMedia')
  }

  influences() {
    return this.belongsToMany('App/Models/Information/Influences').pivotTable('contact_influences')
  }

  needforchanges() {
    return this.belongsToMany('App/Models/Information/NeedForChanges').pivotTable('contact_need_for_changes')
  }

}

module.exports = Contact
