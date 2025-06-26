<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()
const esAdministrador = ref(false) 
const usuario = ref('')
const contraseña = ref('')
const error = ref('')

const irALogin = () => {
  router.push('/login')
}

async function registrarse() {
  error.value = ''

  // Validaciones básicas
  if (!usuario.value.trim() || !contraseña.value.trim()) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  try {
    // Primero verificar si el usuario ya existe
    const responseCheck = await axios.get('https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios')
    const usuariosExistentes = responseCheck.data

    const usuarioExiste = usuariosExistentes.find(
      u => u.usuario === usuario.value.trim()
    )

    if (usuarioExiste) {
      error.value = 'El usuario ya existe. Elige otro nombre de usuario.'
      return
    }

    // Crear el nuevo usuario
    const nuevoUsuario = {
      usuario: usuario.value.trim(),
      contrasenia: contraseña.value.trim(),
      reservas: [],
      administrador: esAdministrador.value
    }

    // Registrar el nuevo usuario
    const responseRegistro = await axios.post(
      'https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios',
      nuevoUsuario
    )

    if (responseRegistro.status === 201) {
      // Registro exitoso - autenticar automáticamente
      authStore.setUsuarioAutenticado(responseRegistro.data)
      router.push('/')
    } else {
      error.value = 'Error al registrar el usuario'
    }

  } catch (err) {
    if (err.response) {
      // Error del servidor
      error.value = `Error del servidor: ${err.response.status}`
    } else if (err.request) {
      // Error de conexión
      error.value = 'Error al conectar con el servidor'
    } else {
      // Otro tipo de error
      error.value = 'Error inesperado al registrar usuario'
    }
    console.error('Error completo:', err)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
          <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registrarse
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Registra tu cuenta para reservar canchas
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="registrarse">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="usuario" class="sr-only">Usuario</label>
            <input 
              id="usuario"
              v-model="usuario" 
              type="text" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Usuario" 
            />
          </div>
          <div>
            <label for="contraseña" class="sr-only">Contraseña</label>
            <input 
              id="contraseña"
              v-model="contraseña" 
              type="password" 
              required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
              placeholder="Contraseña" 
            />
          </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200 max-w-xs">
            <label class="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                v-model="esAdministrador"
                class="w-5 h-5 text-green-600 bg-gray-50 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 focus:ring-offset-1 transition-all duration-200 hover:border-green-400"
              />
              <span class="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-200 select-none">
                Administrador
              </span>
            </label>

      </div>
          <button 
            type="submit" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </span>
            registrarse
          </button>
        </form>
        <button 
            @click= irALogin
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </span>
            Ir a Login
          </button>
        </div>
        </div>

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
</template>
