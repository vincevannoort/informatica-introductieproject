'use strict'

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

    // relations
    Route.resource('relations', 'RelationController').apiOnly()

    // proposals
    Route.resource('proposals', 'ProposalController').apiOnly()

    // contacts
    Route.resource('contacts', 'ContactController').apiOnly()

}).prefix('api').middleware(['auth'])

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
