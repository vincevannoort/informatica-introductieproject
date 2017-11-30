/*
|--------------------------------------------------------------------------
| Authentication
| @credits: https://auth0.com/blog/build-an-app-with-vuejs/
|--------------------------------------------------------------------------
*/

// URL and endpoint constants
const API_URL = '/api/'
const LOGIN_URL = API_URL + 'users/login'
const SIGNUP_URL = API_URL + 'users/create'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, credentials, redirect) {
    let self = this;
    axios.post(LOGIN_URL, { credentials })
    .then(function (response) {
      console.log(response.data)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
      self.user.authenticated = true
      if (redirect) {
        context.$router.push(redirect)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  },

  // Send a request to the singup URL and save the returned JWT
  signup(context, credentials, redirect) {
    let self = this;
    axios.post(SIGNUP_URL, { credentials })
    .then(function (response) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
      self.user.authenticated = true
      if (redirect) {
        context.$router.push(redirect)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    this.user.authenticated = false
  },

  checkAuth() {
    let jwt = localStorage.getItem('token')
    if(jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false      
    }
  },
}