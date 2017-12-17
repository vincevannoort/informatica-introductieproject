'use strict'

class Contact {

  /*
   * Get single contact from api endpoint
   */
  static async show({ id }) {
    return axios.get(`/api/contacts/${id}`)
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
  static async store({ contact, company_id }) {
    console.log('storing contact', contact)
    return axios.post(`/api/contacts/`, {
      contact: contact,
      company_id: company_id
    })
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

}

export default Contact