import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Canchas from './views/Canchas.vue'
import Cancha from './views/Cancha.vue'

const routes = [
    {
    path: '/',
    name: 'Home',
    component: Home
    },
    {
    path: '/about',
    name: 'About',
    component: About
    },
    {
    path: '/canchas',
    name: 'Canchas',
    component: Canchas
    },
    {
    path: '/canchas/:id',
    name: 'CanchaDetail',
    component: Cancha
    },
]
    
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
