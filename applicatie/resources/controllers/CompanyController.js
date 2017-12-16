'use strict'

class Company {

  static async index({ id }) {
    return axios.get(`/api/companies/${id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error.response.status
    })
  }

  static async destroy({ id }) {
    axios.delete(`/api/companies/${id}`)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    })
  }

}

module.exports = Company
// export default Company

  // async store(company) {
  //   console.log('storing company')
  //   var self = this
  //   axios.post(`/api/companies/`, {
  //     company: company
  //   })
  //   .then(function (response) {
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     console.log(error.response)
  //   })
  // }