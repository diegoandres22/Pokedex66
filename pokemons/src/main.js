import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import store from './store'
import App from './App.vue'
import Landin from '../src/components/Landing'
import Site from "../src/components/Site";


const routes = [
    { path: '/', component: Landin },
    { path: '/site', component: Site }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
