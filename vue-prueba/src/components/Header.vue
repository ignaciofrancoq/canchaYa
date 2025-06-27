<script setup>
    import { RouterLink, useRouter } from 'vue-router'
    import { useAuthStore } from '../stores/authStore'
    import { computed, ref } from 'vue'

    const authStore = useAuthStore()
    const router = useRouter()
    const menuAbierto = ref(false)

    const estaAutenticado = computed(() => authStore.usuarioAutenticado !== null)
    const usuario = computed(() => authStore.usuarioAutenticado)

    const cerrarSesion = () => {
        authStore.logout()
        router.push('/login')
        menuAbierto.value = false
    }

    const irAPerfil = () => {
        if (usuario.value) {
            router.push(`/usuario/${usuario.value.id}`)
            menuAbierto.value = false
        }
    }

    const toggleMenu = () => {
        menuAbierto.value = !menuAbierto.value
    }

    const cerrarMenu = () => {
        menuAbierto.value = false
    }
</script>


<template>
  <header class="bg-gradient-to-r from-green-600 to-green-700 shadow-lg relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <h1 class="text-2xl font-bold text-white">
          <router-link to="/" class="hover:text-green-200 transition-colors duration-200">
            Cancha Ya!
          </router-link>
        </h1>
        <nav class="hidden md:flex space-x-8 items-center">
          <RouterLink 
            v-if="estaAutenticado"
            to="/" 
            class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
            :class="{ 'text-green-200 border-b-2 border-green-200': $route.path === '/' }"
          >
            Inicio
          </RouterLink>
          <RouterLink 
            v-if="estaAutenticado"
            to="/canchas" 
            class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
            :class="{ 'text-green-200 border-b-2 border-green-200': $route.path === '/canchas' }"
          >
            Canchas
          </RouterLink>
          <RouterLink 
            v-if="estaAutenticado"
            to="/estadisticas" 
            class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
            :class="{ 'text-green-200 border-b-2 border-green-200': $route.path === '/estadisticas' }"
          >
            Estadísticas
          </RouterLink>
          
          <div v-if="estaAutenticado" class="flex items-center space-x-4 ml-8">
            <button 
              @click="irAPerfil"
              class="text-white hover:text-green-200 transition-colors duration-200 p-2 rounded-full hover:bg-green-600"
              title="Ver mi perfil y reservas"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </button>
            
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

        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-white hover:text-green-200 transition-colors duration-200 p-2 rounded-md hover:bg-green-600"
            aria-label="Toggle menu"
          >
            <svg 
              class="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              :class="{ 'hidden': menuAbierto, 'block': !menuAbierto }"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg 
              class="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              :class="{ 'block': menuAbierto, 'hidden': !menuAbierto }"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div 
      v-show="menuAbierto" 
      class="md:hidden bg-green-700 border-t border-green-600"
      @click="cerrarMenu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink 
          v-if="estaAutenticado"
          to="/" 
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-600 transition-colors duration-200"
          :class="{ 'bg-green-600 text-green-200': $route.path === '/' }"
          @click="cerrarMenu"
        >
          Inicio
        </RouterLink>
        
        <RouterLink 
          v-if="estaAutenticado"
          to="/canchas" 
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-600 transition-colors duration-200"
          :class="{ 'bg-green-600 text-green-200': $route.path === '/canchas' }"
          @click="cerrarMenu"
        >
          Canchas
        </RouterLink>
        
        <RouterLink 
          v-if="estaAutenticado"
          to="/estadisticas" 
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-600 transition-colors duration-200"
          :class="{ 'bg-green-600 text-green-200': $route.path === '/estadisticas' }"
          @click="cerrarMenu"
        >
          Estadísticas
        </RouterLink>

        <div v-if="estaAutenticado" class="border-t border-green-600 pt-4 mt-4">
          <div class="px-3 py-2">
            <p class="text-sm text-green-200">Usuario: {{ usuario?.usuario }}</p>
          </div>
          
          <button 
            @click="irAPerfil"
            class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>Mi Perfil</span>
          </button>
          
          <button 
            @click="cerrarSesion"
            class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-red-200 hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2 mt-2"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
