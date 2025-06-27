<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../stores/authStore.js'

const authStore = useAuthStore()

const router = useRouter()

const nombre = ref('')
const direccion = ref('')
const capacidad = ref(null) 
const foto = ref('')
const error = ref('')
const successMessage = ref('')

const volver = () => {
  router.push('/')
}

async function crearCancha() {
  error.value = ''
  successMessage.value = ''

  if (!nombre.value.trim() || !direccion.value.trim() || capacidad.value === null || !foto.value.trim()) {
    error.value = 'Por favor, completa todos los campos.'
    return
  }

  if (capacidad.value <= 0) {
    error.value = 'La capacidad debe ser un número positivo.'
    return;
  }

  try {
    const nuevaCancha = {
      nombre: nombre.value.trim(),
      direccion: direccion.value.trim(),
      capacidad: capacidad.value,
      foto: foto.value.trim(),
      contadorReservas: 0,
      disponible: true
    }

    const response = await axios.post(
      'https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas',
      nuevaCancha
    )

    if (response.status === 201 || response.status === 200) {
      successMessage.value = '¡Cancha creada exitosamente!'
      nombre.value = ''
      direccion.value = ''
      capacidad.value = null
      foto.value = ''

      setTimeout(() => {
      router.push(`/canchas/${response.data.id}`)
      }, 1000)
    } else {
      error.value = 'Error al crear la cancha.'
    }
  } catch (err) {
    if (err.response) {
      error.value = `Error del servidor: ${err.response.status}`
    } else if (err.request) {
      error.value = 'Error al conectar con el servidor.'
    } else {
      error.value = 'Error inesperado al crear la cancha.'
    }
    console.error('Error completo:', err)
  }
}

const irAtras = () => {
  router.go(-1)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8" v-if=authStore.usuarioAutenticado.administrador>
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
          <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear Nueva Cancha
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ingresa los detalles de la nueva cancha
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="crearCancha">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="nombre" class="sr-only">Nombre de la Cancha</label>
            <input 
              id="nombre"
              v-model="nombre" 
              type="text" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Nombre de la Cancha" 
            />
          </div>
          <div>
            <label for="direccion" class="sr-only">Dirección</label>
            <input 
              id="direccion"
              v-model="direccion" 
              type="text" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Dirección" 
            />
          </div>
          <div>
            <label for="capacidad" class="sr-only">Capacidad</label>
            <input 
              id="capacidad"
              v-model.number="capacidad" 
              type="number" 
              required 
              min="1"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Capacidad (ej. 10)" 
            />
          </div>
          <div>
            <label for="foto" class="sr-only">URL de la Foto</label>
            <input 
              id="foto"
              v-model="foto" 
              type="url" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="URL de la Foto" 
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12A9 9 0 1112 3a9 9 0 019 9z"></path>
            </svg>
          </span>
          Crear Cancha
        </button>
      </form>

      <button 
        @click="irAtras" 
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg class="h-5 w-5 text-gray-300 group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </span>
        Volver
      </button>

      <div v-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
        </div>
      </div>

      <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-800">{{ successMessage }}</p>
          </div>
        </div>
      </div>
    </div>
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
    <p class="text-red-600 font-semibold mb-2">No autorizado</p>
    
    <button 
      type="button" 
      @click="volver"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
    >
      Volver
    </button>
  </div>
  
  <Footer/>
</div>
</template>