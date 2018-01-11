const Model = use('Model')

class SocialMedia extends Model {

  contact() {
    return this.belongsTo('App/Models/Contact')
  }

}

module.exports = SocialMedia
