class Proposal {

  /*
   * Get all proposals from api endpoint
   */
  static async index() {
    return axios.get(`/api/proposals/`)
      .then((response) => response.data)
  }

  /*
   * Get single proposal from api endpoint
   */
  static async show({ proposal_id }) {
    return axios.get(`/api/proposals/${proposal_id}`)
    .then((response) => response.data)
  }

  /*
   * Store single proposal to api endpoint
   */
  static async store({ proposal, relation_id }) {
    return axios.post(`/api/proposals/`, {
      proposal: proposal,
      relation_id: relation_id
    })
    .then((response) => response.data)
  }

  /*
   * Update single proposal to api endpoint
   */
  static async update({ proposal }) {
    return axios.patch(`/api/proposals/${proposal.id}`, { proposal: proposal })
  }

  /*
   * Destroy single proposal to api endpoint
   */
  static async destroy({ proposal_id }) {
    return axios.delete(`/api/proposals/${proposal_id}`)
  }

  static async calculate({ proposal_id }) {
    return axios.post(`/api/proposals/${proposal_id}/calculate`)
  }

}

export default Proposal