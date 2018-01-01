/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our AdonisJS back-end.
 */
import axios from 'axios'
window.axios = axios
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]')
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
    console.error('CSRF token not found.')
}

/**
 * We'll load the Vue.JS framework which allows us to easily create userinterfaces
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
Vue.use(VueRouter)
Vue.use(VeeValidate)
window.Vue = Vue

/**
 * We'll load the Vue.JS Moment Filters framework which allows us to easily create dates which users understand
 */
import VueMoment from 'vue-moment'
Vue.use(VueMoment)

/**
 * We'll load the Vue.JS Notification framework which allows us to easily notify users
 */

import VueNotifications from 'vue-notifications'
import Noty from 'noty'

function noty_notification({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return new Noty({text: message, theme: 'sunset', timeout, type}).show()
}

const options = {
  success: noty_notification,
  error: noty_notification,
  info: noty_notification,
  warn: noty_notification
}

Vue.use(VueNotifications, options)

/**
 * We'll load the Chart.js for graphs
 */
import Chart from 'chart.js'
import './graphs/change-bar-chart.js'
Chart.defaults.global.responsive = true
Chart.defaults.global.maintainAspectRatio = false
Chart.defaults.global.legend.display = false
window.Chart = Chart


/**
 * We'll load babel polyfill for async await for the frontend
 */
import 'babel-polyfill'
