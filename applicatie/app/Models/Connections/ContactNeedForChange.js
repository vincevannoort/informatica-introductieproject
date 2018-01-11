const Model = use('Model')

class ContactNeedForChange extends Model {

  static get table() {
    return 'contact_need_for_changes'
  }

  contact() {
    return this.belongsTo('App/Models/Contact')
  }

  needforchange() {
    return this.belongsTo('App/Models/Informations/NeedForChange')
  }

}

module.exports = ContactNeedForChange
