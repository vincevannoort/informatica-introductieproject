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
Vue.component('icon-logout', require('../../components/icons/logout'))
Vue.component('buttons-edit-remove', require('../../components/ButtonsEditRemove'))

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
const routes = [
  { path: '/login', name: 'login', component: require('../../views/Authentication'), meta: { type: 'login', title: 'login' } },
  { path: '/logout', name: 'logout', component: require('../../views/Authentication'), meta: { type: 'logout', title: 'login' } },
  {
    path: '/', component: require('../../views/Overview'), meta: { requiresAuth: true },
    children: [

      // users
      { path: '/users', name: 'users-overview', component: require('../../views/overview/Users'), meta: { requiresAuth: true, title: 'Users' } },

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
          { path: 'proposals/:proposal_id/edit-from-relation', name: 'proposals-edit-from-relation', component: require('../../views/create/Proposal'), meta: { requiresAuth: true, type: 'edit', title: 'Proposal Edit' } },
          { path: 'customerbusinesswindow/create', name: 'customerbusinesswindow-create', component: require('../../views/create/CustomerBusinessWindow'), meta: { requiresAuth: true, type: 'create', title: 'CustomerBusinessWindow Create' } },
          { path: 'customerbusinesswindow/edit', name: 'customerbusinesswindow-edit', component: require('../../views/create/CustomerBusinessWindow'), meta: { requiresAuth: true, type: 'edit', title: 'CustomerBusinessWindow Edit' } },
          { path: 'strengths-and-weaknesses/create', name: 'strengths-and-weaknesses-relation-create', component: require('../../views/create/StrengthAndWeakness'), meta: { requiresAuth: true, type: 'create', title: 'Strength and Weakness Create' } }
        ]
      },
      {
        path: '/relations/:relation_id/proposals/:proposal_id', name: 'proposals-single', component: require('../../views/single/Proposal'), meta: { requiresAuth: true, title: 'Proposal Single' },
        children: [
          { path: 'edit', name: 'proposals-edit', component: require('../../views/create/Proposal'), meta: { requiresAuth: true, type: 'edit', title: 'Proposal Edit' } },
          { path: 'position-and-competition/create', name: 'position-and-competition-create', component: require('../../views/create/Competition'), meta: { requiresAuth: true, type: 'create', title: 'Position and competition Create' } },
          { path: 'smart-actions/create', name: 'smart-actions-create', component: require('../../views/create/Smart'), meta: { requiresAuth: true, type: 'create', title: 'Smart action Create' } },
          { path: 'strengths-and-weaknesses/create', name: 'strengths-and-weaknesses-proposal-create', component: require('../../views/create/StrengthAndWeakness'), meta: { requiresAuth: true, type: 'create', title: 'Strength and Weakness Create' } },
          { path: 'grow/create', name: 'grow-create', component: require('../../views/create/Grow'), meta: { requiresAuth: true, type: 'create', title: 'Grow Create' } },
          { path: 'grow/edit', name: 'grow-edit', component: require('../../views/create/Grow'), meta: { requiresAuth: true, type: 'edit', title: 'Grow Edit' } },
          { path: 'insight', name: 'proposals-insight', component: require('../../views/information/Insight'), meta: { requiresAuth: true, type: 'information', title: 'Proposal Insight' } },
          { path: 'contacts/create', name: 'proposalcontact-create', component: require('../../views/create/InternalPower'), meta: { requiresAuth: true, type: 'create', title: 'Internal Power' } },
          { path: 'contacts/:contact_id/roles/create', name: 'proposalcontact-role-create', component: require('../../views/create/Role'), meta: { requiresAuth: true, type: 'create', title: 'Role' } }
        ]
      },

      // contacts
      {
        path: '/relations/:relation_id/contacts/:contact_id', name: 'contacts-single', component: require('../../views/single/Contact'), meta: { requiresAuth: true, title: 'Contact Single' },
        children: [
          { path: 'edit', name: 'contacts-edit', component: require('../../views/create/Contact'), meta: { requiresAuth: true, type: 'edit', title: 'Contact Edit' } },
          { path: 'notes/create', name: 'contacts-notes-create', component: require('../../views/create/Note'), meta: { requiresAuth: true, type: 'create', title: 'Contact Note Create' } },
          { path: 'influence/create', name: 'influence-create', component: require('../../views/create/Influence'), meta: { requiresAuth: true, type: 'create', title: 'Contact Influence Create' } },
          { path: 'needforchange/create', name: 'needforchange-create', component: require('../../views/create/NeedForChange'), meta: { requiresAuth: true, type: 'create', title: 'Contact Need for change Create' } }
        ]
      },


      // profile
      { path: '/profile', component: require('../../views/single/Profile'), meta: { requiresAuth: true, title: 'Profile' } },
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

// Add a response interceptor
axios.interceptors.response.use(
(response) => response,
(error) => {
  if (error.response.status === 401) {
    window.app.$router.push({ name: 'login' })
  }
  return Promise.reject(error)
})

/*
|--------------------------------------------------------------------------
| Vue
|--------------------------------------------------------------------------
*/
window.app = new Vue({ router }).$mount('#app')
