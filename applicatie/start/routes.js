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
const Relation = use('App/Models/Relation')

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
  Route.post('calculate', async () => {
    const relations = await Relation.all()
    return Promise.all(relations.rows.map((relation) => relation.calculateInsightForEveryProposal()))
  })

  // users
  Route.get('users/profile', 'UserController.profile')
  Route.resource('users', 'UserController').apiOnly()

  // relations
  Route.resource('relations', 'RelationController').apiOnly()
  Route.post('relations/:relation_id/calculate', 'RelationController.calculateInsightForEveryProposal')
  Route.get('relations/:relation_id/businesswindow', 'RelationController.getCustomerBusinessWindow')
  Route.post('relations/:relation_id/businesswindow', 'RelationController.storeCustomerBusinessWindow')
  Route.post('relations/:relation_id/strengthorweakness', 'RelationController.storeStrengthOrWeakness')

  // proposals
  Route.resource('proposals', 'ProposalController').apiOnly()
  Route.post('proposals/:proposal_id/calculate', 'ProposalController.calculateInsight')
  Route.post('proposals/:proposal_id/strengthorweakness', 'ProposalController.storeStrengthOrWeakness')
  Route.post('proposals/:proposal_id/contacts/:contact_id/roles', 'ProposalController.storeRole')
  Route.post('proposals/:proposal_id/competition', 'ProposalController.storeCompetition')
  Route.post('proposals/:proposal_id/action', 'ProposalController.storeAction')
  Route.post('proposals/:proposal_id/grow', 'ProposalController.storeGrow')

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
