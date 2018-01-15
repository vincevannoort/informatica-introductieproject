/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

// without authentication
Route.group(() => {
  Route.post('users/login', 'UserController.login')
  Route.post('users/register', 'UserController.register')
}).prefix('api')

// with authentication
// route resources, see: https://adonisjs.com/docs/4.0/routing#_route_resources
Route.group(() => {
  // users
  Route.get('users/profile', 'UserController.profile')
  Route.resource('users', 'UserController').apiOnly()

  // relations
  Route.get('relations/:relation_id/calculate', 'RelationController.calculateTotalInsight')
  Route.resource('relations', 'RelationController').apiOnly()

  // proposals
  Route.resource('proposals', 'ProposalController').apiOnly()
  Route.post('proposals/:proposal_id/calculate', 'ProposalController.calculateInsight')

  // contacts
  Route.resource('contacts', 'ContactController').apiOnly()
  Route.post('relations/:relation_id/contacts/:contact_id/notes', 'ContactController.storeNote')

}).prefix('api').middleware((process.env.NODE_ENV !== 'development') ? ['auth'] : [])

/*
|--------------------------------------------------------------------------
| Promotion website
|--------------------------------------------------------------------------
*/
Route.any('promotion', ({ view }) => view.render('promotion'))

/*
|--------------------------------------------------------------------------
| SPA
|--------------------------------------------------------------------------
*/
Route.any('*', ({ view }) => view.render('single-page-application'))
