import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

const AllClients = require('./assets/js/components/all-clients.vue');
const AllMessages = require('./assets/js/components/all-messages.vue');

const routes = [
    {
        name: 'all_clients',
        path: '/',
        component: AllClients
    },
    {
        name: 'all_messages',
        path: '/messages',
        component: AllMessages
    },

];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');