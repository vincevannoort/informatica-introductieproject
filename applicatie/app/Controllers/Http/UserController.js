const { validateAll } = use('Validator')
const User = use('App/Models/User')

// set rules which must be validated before storing/updating a proposal
const rules = {
  profession: 'required',
  first_name: 'required',
  last_name: 'required',
  email: 'required',
  password: 'required'
}

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

  async store({ response, request }) {
    const userData = await request.all().user
    const validation = await validateAll(userData, rules)
    if (validation.fails()) {
      return response.status(422).send(validation.messages())
    }

    return User.create({
      profession: userData.profession,
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.first_name.toLowerCase(),
      email: userData.email,
      password: userData.password
    })
  }

  async destroy({ params, response }) {
    // try to delete the user with user id from the request
    try {
      const user = await User.find(params.id)

      // delete the user
      await user.delete()

      return response.status(200).send('User deleted')
    } catch (error) {
      return response.status(404).send(error)
    }
  }

}

module.exports = UserController
