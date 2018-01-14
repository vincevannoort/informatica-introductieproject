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
Vue.component('field', require('../../components/Field'))
Vue.component('modal', require('../../components/Modal'))
Vue.component('modal-create-edit', require('../../components/ModalCreateEdit'))
Vue.component('icon-dashboard', require('../../components/icons/dashboard'))
Vue.component('icon-actions', require('../../components/icons/actions'))
Vue.component('icon-relation', require('../../components/icons/relation'))
Vue.component('icon-profile', require('../../components/icons/profile'))
Vue.component('icon-users', require('../../components/icons/users'))
Vue.component('buttons-edit-remove', require('../../components/ButtonsEditRemove'))

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
const routes = [
  { path: '/login', component: require('../../views/Authentication'), meta: { title: 'login' } },
  {
    path: '/', component: require('../../views/Overview'), meta: { requiresAuth: true },
    children: [
      { path: '/', component: require('../../views/Dashboard'), meta: { requiresAuth: true, title: 'Dashboard' } },

      // users
      { path: '/users', name: 'users-overview', component: require('../../views/overview/Users'), meta: { requiresAuth: true, title: 'Users' } },
      { path: '/users/:user_id', name: 'users-single', component: require('../../views/single/User'), meta: { requiresAuth: true, title: 'User Single' } },
      // relations
      {
        path: '/relations', name: 'relations-overview', component: require('../../views/overview/Relations'), meta: { requiresAuth: true, title: 'Relations Overview' },
        children: [
          { path: 'create', name: 'relations-create', component: require('../../views/create/Relation'), meta: { requiresAuth: true, type: 'create', title: 'Relation Create/Update' } }
        ]
      },
      {
        path: '/relations/:relation_id', name: 'relations-single', component: require('../../views/single/Relation'), meta: { requiresAuth: true, title: 'Relation Single' },
        children: [
          { path: 'edit', name: 'relations-edit', component: require('../../views/create/Relation'), meta: { requiresAuth: true, type: 'edit', title: 'Relation Edit' } },
          { path: 'contacts/create', name: 'contacts-create', component: require('../../views/create/Contact'), meta: { requiresAuth: true, type: 'create', title: 'Contacts Create/Update' } },
          { path: 'proposals/create', name: 'proposals-create', component: require('../../views/create/Proposal'), meta: { requiresAuth: true, type: 'create', title: 'Proposal Create/Update' } },
          { path: 'contacts/:contact_id/edit-from-relation', name: 'contacts-edit-from-relation', component: require('../../views/create/Contact'), meta: { requiresAuth: true, type: 'edit', title: 'Contact Edit' } },
          { path: 'proposals/:proposal_id/edit-from-relation', name: 'proposals-edit-from-relation', component: require('../../views/create/Proposal'), meta: { requiresAuth: true, type: 'edit', title: 'Proposal Edit' } }
        ]
      },

      // proposals
      {
        path: '/relations/:relation_id/proposals/:proposal_id', name: 'proposals-single', component: require('../../views/single/Proposal'), meta: { requiresAuth: true, title: 'Proposal Single' },
        children: [
          { path: 'edit', name: 'proposals-edit', component: require('../../views/create/Proposal'), meta: { requiresAuth: true, type: 'edit', title: 'Proposal Edit' } }
        ]
      },

      // contacts
      {
        path: '/relations/:relation_id/contacts/:contact_id', name: 'contacts-single', component: require('../../views/single/Contact'), meta: { requiresAuth: true, title: 'Contact Single' },
        children: [
          { path: 'edit', name: 'contacts-edit', component: require('../../views/create/Contact'), meta: { requiresAuth: true, type: 'edit', title: 'Contact Edit' } }
        ]
      },


      // profile
      { path: '/profile', component: require('../../views/Profile'), meta: { requiresAuth: true, title: 'Profile' } },
      { path: '*', name: '404', component: require('../../views/NotFound'), meta: { title: 'Not Found (404)' } }
    ]
  }
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
  document.title = `Easy Link Keeper - ${to.meta.title}`
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
window.app = new Vue({ router }).$mount('#app')
