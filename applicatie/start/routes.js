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
Route.group(() => {
    // users
    Route.get('users/profile', 'UserController.profile')

    // relations
    Route.get('relations', 'RelationController.index')
    Route.post('relations', 'RelationController.store')
    Route.get('relations/:id', 'RelationController.show')
    Route.delete('relations/:id', 'RelationController.destroy')
    Route.patch('relations/:id', 'RelationController.update')

    // proposals

    // contacts
    Route.get('contacts', 'ContactController.index')
    Route.post('contacts', 'ContactController.store')
    Route.get('contacts/:id', 'ContactController.show')
    Route.delete('contacts/:id', 'ContactController.destroy')
    Route.patch('contacts/:id', 'ContactController.update')

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
