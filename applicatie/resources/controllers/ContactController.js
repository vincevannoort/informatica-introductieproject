class Contact {

  /*
   * Get single contact from api endpoint
   */
  static async show({ contact_id }) {
    return axios.get(`/api/contacts/${contact_id}`)
    .then((response) => response.data)
  }

  /*
   * Store single contact to api endpoint
   */
  static async store({ contact, relation_id }) {
    return axios.post(`/api/contacts/`, {
      contact: contact,
      relation_id: relation_id
    })
    .then((response) => response.data)
  }

  /*
   * Update single contact to api endpoint
   */
  static async update({ contact }) {
    return axios.patch(`/api/contacts/${contact.id}`, { contact: contact })
  }

  /*
   * Destroy single contact to api endpoint
   */
  static async destroy({ contact_id }) {
    return axios.delete(`/api/contacts/${contact_id}`)
  }

  static async storeNote({ note, relation_id, contact_id }) {
    return axios.post(`/api/relations/${relation_id}/contacts/${contact_id}/notes`, { note })
    .then((response) => response.data)
  }

}

export default Contact
