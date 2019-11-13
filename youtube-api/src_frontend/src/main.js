import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import VueYouTubeEmbed from 'vue-youtube-embed'

import App from '@/App';
import routes from '@/routes';


import 'vuetify/dist/vuetify.min.css'
import "./styles/main.scss";

Vue.use(VueRouter);
Vue.use(Vuetify)
Vue.use(Vuex);
Vue.use(VueYouTubeEmbed);

import state from '@/store/state';
import actions from '@/store/actions';
import mutations from '@/store/mutations';
import getters from '@/store/getters';

const store = new Vuex.Store({
    state, actions, mutations, getters
})

const router = new VueRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'history'
});

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
});
