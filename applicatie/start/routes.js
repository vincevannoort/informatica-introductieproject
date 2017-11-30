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
    Route.get('users/profile', 'UserController.profile')
    Route.get('companies', 'CompanyController.index')
}).prefix('api')
// }).prefix('api').middleware(['auth'])

/*
|--------------------------------------------------------------------------
| SPA
|--------------------------------------------------------------------------
*/
Route.any('*', ({ view }) => view.render('main'))
