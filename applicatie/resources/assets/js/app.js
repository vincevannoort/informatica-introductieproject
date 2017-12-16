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
import ProfileView from '../../views/Profile'
import NotFoundView from '../../views/NotFound'

// Details & Overviews
import CompanyView from '../../views/single/Company'
import CompanyCreateView from '../../views/create/Company'
import CompaniesView from '../../views/overview/Companies'
import ProposalView from '../../views/single/Proposal'
import ProposalsView from '../../views/overview/Proposals'
import ContactView from '../../views/single/Contact'
import ContactCreateView from '../../views/create/Contact'
import ContactsView from '../../views/overview/Contacts'
import UserView from '../../views/single/User'
import UsersView from '../../views/overview/Users'

// components
import SidebarComponent from '../../components/Sidebar'
import TitleComponent from '../../components/Title'
import ProfileComponent from '../../components/Profile'
import BoxComponent from '../../components/Box'
import BoxContactsComponent from '../../components/BoxContacts'
import BoxCompaniesComponent from '../../components/BoxCompanies'
Vue.component('main-view-title', TitleComponent)
Vue.component('profile', ProfileComponent)
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

      // users

      // relations aka companies
      { path: '/relations', name: 'relations-overview', component: CompaniesView, meta: { requiresAuth: true } },
      { path: '/relations/create', name: 'relations-create', component: CompanyCreateView, meta: { requiresAuth: true } },
      { path: '/relations/:id', name: 'relations-single', component: CompanyView, meta: { requiresAuth: true } },

      // proposals

      // contacts
      { path: '/relations/:id/contacts/create', name: 'contacts-create', component: ContactCreateView, meta: { requiresAuth: true } },
      { path: '/contacts/:id', name: 'contacts-single', component: ContactView, meta: { requiresAuth: true } },

      // profile
      { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
      { path: '*', name: '404', component: NotFoundView },
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
    if (!Authentication.authenticated()) {
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
}).$mount('#app')