import './bootstrap.js'
import Vue from 'vue'
import VueRouter from 'vue-router'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
*/
import DashboardComponent from '../../views/Dashboard'
import RelationsComponent from '../../views/Relations'
import AuthenticationComponent from '../../views/Authentication'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
const routes = [
  { path: '/', component: DashboardComponent, meta: { requiresAuth: true } },
  { path: '/login', component: AuthenticationComponent },
  { path: '/relations', component: RelationsComponent, meta: { requiresAuth: true } },
]

const router = new VueRouter({
	mode: 'history',
  routes
})

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/*
|--------------------------------------------------------------------------
| Vue
|--------------------------------------------------------------------------
*/
const app = new Vue({
  router
}).$mount('#app')