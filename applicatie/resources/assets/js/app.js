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

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
const routes = [
  { path: '/', component: DashboardComponent },
  { path: '/relations', component: RelationsComponent },
]

const router = new VueRouter({
	mode: 'history',
  routes
})

/*
|--------------------------------------------------------------------------
| Vue
|--------------------------------------------------------------------------
*/
const app = new Vue({
  router
}).$mount('#app')