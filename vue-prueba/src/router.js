import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/authStore'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Canchas from './views/Canchas.vue'
import Cancha from './views/Cancha.vue'
import Login from './views/Login.vue'


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
    component: Canchas,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (authStore.estaAutenticado) {
        next()
      } else {
        next('/login')
      }
     }
    },
    {
    path: '/canchas/:id',
    name: 'CanchaDetail',
    component: Cancha
    },
    {
    path: '/login',
    name: 'Login',
    component: Login,
    }
]
    
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
