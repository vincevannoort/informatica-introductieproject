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
Route.group(() => {
    // Route.get('users', 'UserController.index')
    // Route.post('users', 'UserController.store')
}).prefix('api')

/*
|--------------------------------------------------------------------------
| SPA
|--------------------------------------------------------------------------
*/
Route.any('*', ({ view }) => view.render('main'))
