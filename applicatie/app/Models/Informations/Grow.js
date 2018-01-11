const Model = use('Model')

class Grow extends Model {

  proposal() {
    return this.belongsTo('App/Models/Proposal')
  }

}

module.exports = Grow
