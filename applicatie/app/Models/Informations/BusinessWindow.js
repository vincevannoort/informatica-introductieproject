const Model = use('Model')

class BusinessWindow extends Model {

  relation() {
    return this.belongsTo('App/Models/Relation')
  }

}

module.exports = BusinessWindow
