class User {

  static async index() {
    return axios.get('/api/users')
    .then((response) => response.data)
  }

  static async show({ user_id }) {
    return axios.get(`/api/users/${user_id}`)
    .then((response) => response.data)
  }

  static async store({ user }) {
    return axios.post(`/api/users`, { user })
  }

  static async destroy({ user_id }) {
    return axios.delete(`/api/users/${user_id}`, { user_id })
  }

}

export default User
