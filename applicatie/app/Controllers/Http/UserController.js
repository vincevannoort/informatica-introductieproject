const User = use('App/Models/User')

class UserController {

  /**
   * Get all users
   * @returns {object} - all user
   */
  async index() {
    return User.all()
  }

  /**
   * Login a user
   * @param {object} credentials - credentials with email and password
   * @returns {token} jwt token for stateless authentication
   */
  async login({ request, response, auth }) {
    const { email, password } = request.all().credentials
    try {
      const token = await auth.withRefreshToken().attempt(email, password)
      return token
    } catch (e) {
      return response.status(401).send('Invalid Login')
    }
  }

  /**
   * Get profile information of authenticated user
   * @returns {object} profile
   */
  async profile({ response, auth }) {
    try {
      return await auth.getUser()
    } catch (error) {
      return response.send('Missing or invalid jwt token')
    }
  }

  async show({ params, response }) {
    // try to return the user with user id from the request
    try {
      const user = await User.find(params.id)
      return user
    } catch (error) {
      return response.status(404).send('User not found')
    }
  }

}

module.exports = UserController
