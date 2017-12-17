'use strict'

class Company {

  /*
   * Get all companies from api endpoint
   */
  static async index() {
    return axios.get('/api/companies')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

  /*
   * Get single company from api endpoint
   */
  static async show({ id }) {
    return axios.get(`/api/companies/${id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

  /*
   * Store single company to api endpoint
   */
  static async store({ company }) {
    return axios.post(`/api/companies/`, {
      company: company
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

  /*
   * Update single company to api endpoint
   */
  static async update({ company }) {
    return axios.patch(`/api/companies/${company.id}`, {
      company: company
    })
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return error
    })
  } 

  /*
   * Destory single company to api endpoint
   */
  static async destroy({ id }) {
    return axios.delete(`/api/companies/${id}`)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return error
    })
  }

}

export default Company