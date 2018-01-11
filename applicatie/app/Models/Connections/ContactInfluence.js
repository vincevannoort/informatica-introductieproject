const Model = use('Model')

class ContactInfluence extends Model {

  static get table() {
    return 'contact_influences'
  }

  contact() {
    return this.belongsTo('App/Models/Contact')
  }

  influence() {
    return this.belongsTo('App/Models/Informations/Influence')
  }

}

module.exports = ContactInfluence
