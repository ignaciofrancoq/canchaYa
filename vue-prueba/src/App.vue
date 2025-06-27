<script setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { useAuthStore } from './stores/authStore'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  authStore.cargarUsuarioDesdeLocalStorage()
})

const estaAutenticado = computed(() => authStore.usuarioAutenticado !== null)

const irALogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen w-full flex flex-col bg-gray-50" v-if="estaAutenticado || route.path === '/login' || route.path === '/registro'">

    <Header/>

    <main class="flex-grow">
      <router-view />
    </main>

    <Footer/>
  </div>

  <div v-else class="text-center mt-16 max-w-md mx-auto px-4">
  <Header/>
  
  <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
    <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
      <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
    </div>
    
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Acceso Restringido</h3>
    <p class="text-gray-600 mb-4">Por favor, inicia sesión para continuar.</p>
    
    <button 
      type="button" 
      @click="irALogin"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
    >
      Volver
    </button>
  </div>
  
  <Footer/>
</div>
</template>
