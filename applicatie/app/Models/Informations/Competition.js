const Model = use('Model')

class Competition extends Model {

  proposal() {
    return this.belongsTo('App/Models/Proposal')
  }

}

module.exports = Competition
