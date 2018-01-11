const Model = use('Model')

class Action extends Model {

  proposal() {
    return this.belongsTo('App/Models/Proposal')
  }

}

module.exports = Action
