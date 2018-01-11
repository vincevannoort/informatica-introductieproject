const Model = use('Model')

class RelationStrengthAndWeakness extends Model {

  static get table() {
    return 'relation_strength_and_weaknesses'
  }

  relation() {
    return this.belongsTo('App/Models/Relation')
  }

  strengthandweakness() {
    return this.belongsTo('App/Models/Informations/StrengthAndWeakness')
  }

}

module.exports = RelationStrengthAndWeakness
