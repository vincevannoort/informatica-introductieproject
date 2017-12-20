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
import RelationView from '../../views/single/Relation'
import RelationCreateView from '../../views/create/Relation'
import RelationsView from '../../views/overview/Relations'
import ProposalView from '../../views/single/Proposal'
import ContactView from '../../views/single/Contact'
import ContactCreateView from '../../views/create/Contact'
import UserView from '../../views/single/User'
import UsersView from '../../views/overview/Users'

// components
import SidebarComponent from '../../components/Sidebar'
import TitleComponent from '../../components/Title'
import ProfileComponent from '../../components/Profile'
import BoxComponent from '../../components/Box'
import BoxContactsComponent from '../../components/BoxContacts'
import BoxRelationsComponent from '../../components/BoxRelations'
import BoxRelationComponent from '../../components/BoxRelation'
import SocialMediaComponent from '../../components/SocialMedia'
Vue.component('main-view-title', TitleComponent)
Vue.component('profile', ProfileComponent)
Vue.component('sidebar', SidebarComponent)
Vue.component('box', BoxComponent)
Vue.component('box-contacts', BoxContactsComponent)
Vue.component('box-relations', BoxRelationsComponent)
Vue.component('box-relation', BoxRelationComponent)
Vue.component('social-media', SocialMediaComponent)

// icons
import dashboardIcon from '../../components/icons/dashboard'
import actionsIcon from '../../components/icons/actions'
import relationIcon from '../../components/icons/relation'
import profileIcon from '../../components/icons/profile'
Vue.component('icon-dashboard', dashboardIcon)
Vue.component('icon-actions', actionsIcon)
Vue.component('icon-relation', relationIcon)
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

      // relations
      { path: '/relations', name: 'relations-overview', component: RelationsView, meta: { requiresAuth: true } },
      { path: '/relations/create', name: 'relations-create', component: RelationCreateView, meta: { requiresAuth: true } },
      { path: '/relations/:relation_id', name: 'relations-single', component: RelationView, meta: { requiresAuth: true } },
      { path: '/relations/:relation_id/edit', name: 'relations-edit', component: RelationCreateView, meta: { requiresAuth: true } },

      // proposals
      // { path: '/relations/:relation_id/proposals/create', name: 'proposals-create', component: ProposalCreateView, meta: { requiresAuth: true } },
      { path: '/relations/:relation_id/proposals/:proposal_id', name: 'proposals-single', component: ProposalView, meta: { requiresAuth: true } },
      // { path: '/relations/:relation_id/proposals/:proposal_id/edit', name: 'proposals-edit', component: ProposalCreateView, meta: { requiresAuth: true } },

      // contacts
      { path: '/relations/:relation_id/contacts/create', name: 'contacts-create', component: ContactCreateView, meta: { requiresAuth: true } },
      { path: '/relations/:relation_id/contacts/:contact_id', name: 'contacts-single', component: ContactView, meta: { requiresAuth: true } },
      { path: '/relations/:relation_id/contacts/:contact_id/edit', name: 'contacts-edit', component: ContactCreateView, meta: { requiresAuth: true } },


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
