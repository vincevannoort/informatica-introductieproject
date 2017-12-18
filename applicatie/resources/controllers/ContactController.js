'use strict'

class Contact {

  /*
   * Get single contact from api endpoint
   */
  static async show({ contact_id }) {
    return axios.get(`/api/contacts/${contact_id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

  /*
   * Store single contact to api endpoint
   */
  static async store({ contact, relation_id }) {
    return axios.post(`/api/contacts/`, {
      contact: contact,
      relation_id: relation_id
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

  /*
   * Update single contact to api endpoint
   */
  static async update({ contact }) {
    return axios.patch(`/api/contacts/${contact.id}`, {
      contact: contact
    })
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return error
    })
  }

  /*
   * Destroy single contact to api endpoint
   */
  static async destroy({ contact_id }) {
    return axios.delete(`/api/contacts/${contact_id}`)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return error
    })
  }

}

export default Contact
