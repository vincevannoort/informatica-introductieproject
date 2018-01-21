'use strict'

const Schema = use('Schema')

class SocialMediaSchema extends Schema {
  up () {
    this.create('social_medias', (table) => {
      table.increments()
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.enu('type', ['linkedin', 'facebook', 'twitter'])
      table.string('url').notNullable()
      table.timestamps('')
    })
  }

  down () {
    this.drop('social_medias')
  }
}

module.exports = SocialMediaSchema
