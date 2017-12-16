'use strict'

class Company {

  static async show({ id }) {
    return axios.get(`/api/companies/${id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

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

  static async destroy({ id }) {
    axios.delete(`/api/companies/${id}`)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return error
    })
  }

}

module.exports = Company