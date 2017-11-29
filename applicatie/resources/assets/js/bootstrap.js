/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our AdonisJS back-end.
 */
import axios from 'axios'
window.axios = axios
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken')

/**
 * We'll load the Vue.JS framework which allows us to easily create userinterfaces
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
window.Vue = Vue