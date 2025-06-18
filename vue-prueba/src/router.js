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
    component: Home,
    meta: { requiereAuth: true }
    },
    {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiereAuth: true }
    },
    {
    path: '/canchas',
    name: 'Canchas',
    component: Canchas,
    meta: { requiereAuth: true }
    },
    {
    path: '/canchas/:id',
    name: 'CanchaDetail',
    component: Cancha,
    meta: { requiereAuth: true }
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiereAuth && !authStore.estaAutenticado) {
    next('/login')
  } else {
    next()
  }
})

export default router
