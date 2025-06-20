<script setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { useAuthStore } from './stores/authStore'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

// ✅ Cargar usuario desde localStorage al iniciar
onMounted(() => {
  authStore.cargarUsuarioDesdeLocalStorage()
})

// Computed para saber si está logueado
const estaAutenticado = computed(() => authStore.usuarioAutenticado !== null)

// Botón para volver al login
const irALogin = () => {
  router.push('/login')
}
const cerrarSesion = () => {
  authStore.logout()
  router.push('/login') // redirige al login después del logout
}
</script>

<template>
  <div class="min-h-screen w-full flex flex-col bg-gray-50" v-if="estaAutenticado || route.path === '/login'">

    <Header/>

    <main class="flex-grow">
      <router-view />
    </main>

    <div v-if="estaAutenticado" class="text-center mt-10">
      <button @click="cerrarSesion" class="bg-red-500 text-white px-4 py-2 rounded">
        Cerrar sesión
    </button>
    </div>

    <Footer/>
  </div>

  <div v-else class="text-center mt-10">
    <Header/>
    <p class="text-red-600 font-semibold">No autorizado</p>
    <p>Por favor, inicia sesión para continuar.</p>
    <div>
      <button type="button" @click="irALogin">Volver</button>
    </div>
    <Footer/>
  </div>
</template>
