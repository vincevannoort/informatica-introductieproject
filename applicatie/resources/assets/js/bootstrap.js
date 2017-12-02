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
Vue.use(VueRouter)
window.Vue = Vue

/**
 * We'll load the Chart.js for graphs
 */
import Chart from 'chart.js'
import './graphs/change-bar-chart.js'
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.legend.display = false;
window.Chart = Chart