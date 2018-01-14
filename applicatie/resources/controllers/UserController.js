class User {

  static async index() {
    return axios.get('/api/users')
    .then((response) => response.data)
  }

  static async show({ user_id }) {
    return axios.get(`/api/users/${user_id}`)
    .then((response) => response.data)
  }

}

export default User
