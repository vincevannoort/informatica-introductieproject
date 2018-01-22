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

  static async storeStrengthOrWeakness({ proposal_id, strengthorweakness }) {
    return axios.post(`/api/proposals/${proposal_id}/strengthorweakness`, { proposal_id, strengthorweakness })
  }

  static async storeRole({ proposal_id, contact_id, role }) {
    return axios.post(`/api/proposals/${proposal_id}/contacts/${contact_id}/roles`, { contact_id, role })
  }

  static async storeCompetition({ proposal_id, competition }) {
    return axios.post(`/api/proposals/${proposal_id}/competition`, { proposal_id, competition })
  }

  static async storeAction({ proposal_id, smart }) {
    return axios.post(`/api/proposals/${proposal_id}/action`, { proposal_id, smart })
  }

  static async storeGrow({ proposal_id, grow }) {
    return axios.post(`/api/proposals/${proposal_id}/grow`, { proposal_id, grow })
  }

  static async updateGrow({ proposal_id, grow }) {
    console.log('updating grow!')
    return axios.patch(`/api/proposals/${proposal_id}/grow/${grow.id}`, { grow })
    .then((response) => response.data)
  }

  static async getGrow({ proposal_id }) {
    return axios.get(`/api/proposals/${proposal_id}/grow`, { proposal_id })
    .then((response) => response.data)
  }

}

export default Proposal
