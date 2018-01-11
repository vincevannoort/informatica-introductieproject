const Model = use('Model')

class StrengthAndWeakness extends Model {

  relation() {
    return this.belongsTo('App/Models/Relation')
  }

  proposal() {
    return this.belongsTo('App/Models/Proposal')
  }

}

module.exports = StrengthAndWeakness
