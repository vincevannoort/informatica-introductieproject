class User {

  static async index() {
    return axios.get('/api/users')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
  }

  static async show({ user_id }) {
    return axios.get(`/api/users/${user_id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      throw error
    })
  }

}

export default User
