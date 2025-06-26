import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/authStore'

import Home from './views/Home.vue'
import Canchas from './views/Canchas.vue'
import Cancha from './views/Cancha.vue'
import Login from './views/Login.vue'
import Usuario from './views/User.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiereAuth: true } },
  { path: '/canchas', name: 'Canchas', component: Canchas, meta: { requiereAuth: true } },
  { path: '/canchas/:id', name: 'CanchaDetail', component: Cancha, meta: { requiereAuth: true } },
  { path: '/usuario/:id', name: 'Usuario', component: Usuario, meta: { requiereAuth: true } },
  { path: '/login', name: 'Login', component: Login }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ✅ Middleware de navegación con carga del usuario
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 🔒 Cargar desde localStorage si está vacío
  if (!authStore.usuarioAutenticado && localStorage.getItem('usuario')) {
    authStore.setUsuarioAutenticado(JSON.parse(localStorage.getItem('usuario')))
  }

  if (to.meta.requiereAuth && !authStore.usuarioAutenticado) {
    next('/login')
  } else {
    next()
  }
})

export default router
