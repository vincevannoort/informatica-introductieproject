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

}

export default User
