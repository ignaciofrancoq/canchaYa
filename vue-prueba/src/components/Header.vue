<script setup>
    import { RouterLink, useRouter } from 'vue-router'
    import { useAuthStore } from '../stores/authStore'
    import { computed } from 'vue'

    const authStore = useAuthStore()
    const router = useRouter()

    const estaAutenticado = computed(() => authStore.usuarioAutenticado !== null)
    const usuario = computed(() => authStore.usuarioAutenticado)

    const cerrarSesion = () => {
        authStore.logout()
        router.push('/login')
    }

    const irAPerfil = () => {
        if (usuario.value) {
            router.push(`/usuario/${usuario.value.id}`)
        }
    }
</script>


<template>
  <header class="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <h1 class="text-2xl font-bold text-white">
          <router-link to="/" class="hover:text-green-200 transition-colors duration-200">
            Cancha Ya!
          </router-link>
        </h1>
        <nav class="hidden md:flex space-x-8 items-center">
          <RouterLink 
            to="/" 
            class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
            :class="{ 'text-green-200 border-b-2 border-green-200': $route.path === '/' }"
          >
            Inicio
          </RouterLink>
          <RouterLink 
            to="/canchas" 
            class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
            :class="{ 'text-green-200 border-b-2 border-green-200': $route.path === '/canchas' }"
          >
            Canchas
          </RouterLink>
          
          <!-- Botones de usuario cuando está autenticado -->
          <div v-if="estaAutenticado" class="flex items-center space-x-4 ml-8">
            <!-- Icono de perfil -->
            <button 
              @click="irAPerfil"
              class="text-white hover:text-green-200 transition-colors duration-200 p-2 rounded-full hover:bg-green-600"
              title="Ver mi perfil y reservas"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </button>
            
            <!-- Botón de cerrar sesión -->
            <button 
              @click="cerrarSesion"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium flex items-center space-x-2"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
