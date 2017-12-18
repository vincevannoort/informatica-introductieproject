'use strict'

class Relation {

  /*
   * Get all relations from api endpoint
   */
  static async index() {
    return axios.get('/api/relations')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

  /*
   * Get single relation from api endpoint
   */
  static async show({ relation_id }) {
    return axios.get(`/api/relations/${relation_id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

  /*
   * Store single relation to api endpoint
   */
  static async store({ relation }) {
    return axios.post(`/api/relations/`, {
      relation: relation
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
  }

  /*
   * Update single relation to api endpoint
   */
  static async update({ relation }) {
    return axios.patch(`/api/relations/${relation.id}`, {
      relation: relation
    })
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return error
    })
  } 

  /*
   * Destory single relation to api endpoint
   */
  static async destroy({ relation_id }) {
    return axios.delete(`/api/relations/${relation_id}`)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      return error
    })
  }

}

export default Relation