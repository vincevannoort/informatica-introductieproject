class Relation {

  /*
   * Get all relations from api endpoint
   */
  static async index() {
    return axios.get('/api/relations')
    .then((response) => response.data)
  }

  /*
   * Get single relation from api endpoint
   */
  static async show({ relation_id }) {
    return axios.get(`/api/relations/${relation_id}`)
    .then((response) => response.data)
  }

  /*
   * Store single relation to api endpoint
   */
  static async store({ relation }) {
    return axios.post(`/api/relations/`, { relation: relation })
    .then((response) => response.data)
  }

  /*
   * Update single relation to api endpoint
   */
  static async update({ relation }) {
    return axios.patch(`/api/relations/${relation.id}`, { relation: relation })
  }

  /*
   * Destroy single relation to api endpoint
   */
  static async destroy({ relation_id }) {
    return axios.delete(`/api/relations/${relation_id}`)
  }

  static async calculate({ relation_id }) {
    return axios.post(`/api/relations/${relation_id}/calculate`)
  }

  static async calculateAll() {
    return axios.post(`/api/calculate`)
  }

  static async storeCustomerBusinessWindow({ relation_id, customerbusinesswindow }) {
    return axios.post(`/api/relations/${relation_id}/businesswindow`, { relation_id, customerbusinesswindow })
  }

  static async updateCustomerBusinessWindow({ relation_id, customerbusinesswindow }) {
    return axios.patch(`/api/relations/${relation_id}/businesswindow/${customerbusinesswindow.id}`, { customerbusinesswindow })
  }

  static async getCustomerBusinessWindow({ relation_id }) {
    return axios.get(`/api/relations/${relation_id}/businesswindow`, { relation_id })
    .then((response) => response.data)
  }

  static async storeStrengthOrWeakness({ relation_id, strengthorweakness }) {
    return axios.post(`/api/relations/${relation_id}/strengthorweakness`, { relation_id, strengthorweakness })
  }

}

export default Relation
