'use strict'

const User = use('App/Models/User')

class UserController {

  async login ({ request, response, auth }) {
    const { email, password } = request.all().credentials
    const tokens = await auth.listTokens()
    console.log(tokens)
    try {
      const token = await auth.withRefreshToken().attempt(email, password)
      return token
    } catch (e) {
      return response.status(401).send('Invalid Login')
    }
  }

}

module.exports = UserController
