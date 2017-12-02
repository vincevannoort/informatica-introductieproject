import './bootstrap.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from './authentication'

/*
|--------------------------------------------------------------------------
| Views & Components
|--------------------------------------------------------------------------
*/

// views
import AuthenticationView from '../../views/Authentication'
import OverviewView from '../../views/Overview'
import DashboardView from '../../views/Dashboard'
import RelationView from '../../views/Relation'
import RelationsView from '../../views/Relations'
import ProfileView from '../../views/Profile'
import NotFoundView from '../../views/NotFound'

// components
import SidebarComponent from '../../components/Sidebar'
import TitleComponent from '../../components/Title'
import BoxComponent from '../../components/Box'
import BoxContactsComponent from '../../components/BoxContacts'
import BoxCompaniesComponent from '../../components/BoxCompanies'
Vue.component('main-view-title', TitleComponent)
Vue.component('sidebar', SidebarComponent)
Vue.component('box', BoxComponent)
Vue.component('box-contacts', BoxContactsComponent)
Vue.component('box-companies', BoxCompaniesComponent)

// icons
import dashboardIcon from '../../components/icons/dashboard'
import actionsIcon from '../../components/icons/actions'
import companyIcon from '../../components/icons/company'
import profileIcon from '../../components/icons/profile'
Vue.component('icon-dashboard', dashboardIcon)
Vue.component('icon-actions', actionsIcon)
Vue.component('icon-company', companyIcon)
Vue.component('icon-profile', profileIcon)

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
const routes = [
  { path: '/login', component: AuthenticationView },
  { path: '/', component: OverviewView, meta: { requiresAuth: true },
    children: [
      { path: '/', component: DashboardView, meta: { requiresAuth: true } },
      { path: '/relations', component: RelationsView, meta: { requiresAuth: true } },
      { path: '/relations/:id', component: RelationView, meta: { requiresAuth: true } },
      { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
      { path: '*', component: NotFoundView },
    ]
  },
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
    // if (!Authentication.checkAuth()) {
    if (false) {
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
  router,
  data: { 
    user: Authentication.user 
  }
}).$mount('#app')