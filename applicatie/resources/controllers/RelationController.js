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

}

export default Relation
