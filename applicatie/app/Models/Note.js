const Model = use('Model')

class Note extends Model {

  contact() {
    return this.belongsToMany('App/Models/Contact').pivotTable('note_contact')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

}

module.exports = Note
