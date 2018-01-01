class UserController {

  async login({ request, response, auth }) {
    const { email, password } = request.all().credentials
    try {
      const token = await auth.withRefreshToken().attempt(email, password)
      return token
    } catch (e) {
      return response.status(401).send('Invalid Login')
    }
  }

  async profile({ response, auth }) {
    try {
      return await auth.getUser()
    } catch (error) {
      return response.send('Missing or invalid jwt token')
    }
  }

}

module.exports = UserController
