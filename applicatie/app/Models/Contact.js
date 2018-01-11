const Model = use('Model')

class Contact extends Model {

  relations() {
    return this.belongsToMany('App/Models/Relation').pivotTable('contact_relations')
  }

  proposals() {
    return this.belongsToMany('App/Models/Proposal').pivotTable('proposal_contacts')
  }

  notes() {
    return this.belongsToMany('App/Models/Note').pivotTable('note_contact')
  }

}

module.exports = Contact
