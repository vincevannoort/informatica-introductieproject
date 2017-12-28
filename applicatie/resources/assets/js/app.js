import './bootstrap.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from './authentication'

/*
|--------------------------------------------------------------------------
| Global Components
|--------------------------------------------------------------------------
*/

// components
Vue.component('main-view-title', require('../../components/Title'))
Vue.component('box', require('../../components/Box'))
Vue.component('icon-dashboard', require('../../components/icons/dashboard'))
Vue.component('icon-actions', require('../../components/icons/actions'))
Vue.component('icon-relation', require('../../components/icons/relation'))
Vue.component('icon-profile', require('../../components/icons/profile'))

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
const routes = [
  { path: '/login', component: require('../../views/Authentication') },
  { path: '/', component: require('../../views/Overview'), meta: { requiresAuth: true },
    children: [
      { path: '/', component: require('../../views/Dashboard'), meta: { requiresAuth: true } },

      // users

      // relations
      { path: '/relations', name: 'relations-overview', component: require('../../views/overview/Relations'), meta: { requiresAuth: true } },
      { path: '/relations/create', name: 'relations-create', component: require('../../views/create/Relation'), meta: { requiresAuth: true } },
      { path: '/relations/:relation_id', name: 'relations-single', component: require('../../views/single/Relation'), meta: { requiresAuth: true } },
      { path: '/relations/:relation_id/edit', name: 'relations-edit', component: require('../../views/create/Relation'), meta: { requiresAuth: true } },

      // proposals
      { path: '/relations/:relation_id/proposals/create', name: 'proposals-create', component: require('../../views/create/Proposal'), meta: { requiresAuth: true } },
      { path: '/relations/:relation_id/proposals/:proposal_id', name: 'proposals-single', component: require('../../views/single/Proposal'), meta: { requiresAuth: true } },
      // { path: '/relations/:relation_id/proposals/:proposal_id/edit', name: 'proposals-edit', component: ProposalCreateView, meta: { requiresAuth: true } },

      // contacts
      { path: '/relations/:relation_id/contacts/create', name: 'contacts-create', component: require('../../views/create/Contact'), meta: { requiresAuth: true } },
      { path: '/relations/:relation_id/contacts/:contact_id', name: 'contacts-single', component: require('../../views/single/Contact'), meta: { requiresAuth: true } },
      { path: '/relations/:relation_id/contacts/:contact_id/edit', name: 'contacts-edit', component: require('../../views/create/Contact'), meta: { requiresAuth: true } },


      // profile
      { path: '/profile', component: require('../../views/Profile'), meta: { requiresAuth: true } },
      { path: '*', name: '404', component: require('../../views/NotFound') },
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
