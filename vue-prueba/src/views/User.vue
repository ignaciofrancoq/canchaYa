<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="cargando" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando información del usuario...</p>
      </div>

      <div v-else-if="usuarios" class="space-y-8">
        <!-- Header del perfil -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center space-x-4">
            <div class="bg-green-600 rounded-full p-4">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-900">{{ usuarios.nombre }}</h1>
              <p class="text-gray-600">Usuario: {{ usuarios.usuario }}</p>
            </div>
            <button 
              @click="editarPerfil = !editarPerfil"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span>{{ editarPerfil ? 'Cancelar' : 'Editar Perfil' }}</span>
            </button>
          </div>
        </div>

        <!-- Formulario de edición de perfil -->
        <div v-if="editarPerfil" class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg class="h-6 w-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Editar Información Personal
          </h2>

          <!-- Formulario para cambiar nombre -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Cambiar Nombre</h3>
            <form @submit.prevent="cambiarNombre" class="space-y-4">
              <div>
                <label for="nuevoNombre" class="block text-sm font-medium text-gray-700 mb-2">
                  Nuevo Nombre
                </label>
                <input 
                  id="nuevoNombre"
                  v-model="nuevoNombre"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingresa tu nuevo nombre"
                />
              </div>
              <div>
                <label for="contraseñaNombre" class="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña Actual (para confirmar)
                </label>
                <input 
                  id="contraseñaNombre"
                  v-model="contraseñaNombre"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>
              <div class="flex space-x-4">
                <button 
                  type="submit"
                  :disabled="guardandoNombre"
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium flex items-center space-x-2"
                >
                  <svg v-if="guardandoNombre" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ guardandoNombre ? 'Guardando...' : 'Cambiar Nombre' }}</span>
                </button>
                <button 
                  type="button"
                  @click="cancelarCambioNombre"
                  class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
              <div v-if="mensajeNombre" :class="mensajeNombre.tipo === 'error' ? 'text-red-600' : 'text-green-600'" class="text-sm font-medium">
                {{ mensajeNombre.texto }}
              </div>
            </form>
          </div>

          <!-- Separador -->
          <div class="border-t border-gray-200 my-8"></div>

          <!-- Formulario para cambiar contraseña -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
            <form @submit.prevent="cambiarContraseña" class="space-y-4">
              <div>
                <label for="contraseñaActual" class="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña Actual
                </label>
                <input 
                  id="contraseñaActual"
                  v-model="contraseñaActual"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>
              <div>
                <label for="nuevaContraseña" class="block text-sm font-medium text-gray-700 mb-2">
                  Nueva Contraseña
                </label>
                <input 
                  id="nuevaContraseña"
                  v-model="nuevaContraseña"
                  type="password"
                  required
                  minlength="6"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingresa tu nueva contraseña (mínimo 6 caracteres)"
                />
              </div>
              <div>
                <label for="confirmarContraseña" class="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nueva Contraseña
                </label>
                <input 
                  id="confirmarContraseña"
                  v-model="confirmarContraseña"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirma tu nueva contraseña"
                />
              </div>
              <div class="flex space-x-4">
                <button 
                  type="submit"
                  :disabled="guardandoContraseña || nuevaContraseña !== confirmarContraseña"
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium flex items-center space-x-2"
                >
                  <svg v-if="guardandoContraseña" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ guardandoContraseña ? 'Guardando...' : 'Cambiar Contraseña' }}</span>
                </button>
                <button 
                  type="button"
                  @click="cancelarCambioContraseña"
                  class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
              <div v-if="nuevaContraseña && confirmarContraseña && nuevaContraseña !== confirmarContraseña" class="text-red-600 text-sm font-medium">
                Las contraseñas no coinciden
              </div>
              <div v-if="mensajeContraseña" :class="mensajeContraseña.tipo === 'error' ? 'text-red-600' : 'text-green-600'" class="text-sm font-medium">
                {{ mensajeContraseña.texto }}
              </div>
            </form>
          </div>
        </div>

        <!-- Información de reservas -->
        <div v-if="authStore.usuarioAutenticado && !authStore.usuarioAutenticado.administrador" class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg class="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Mis Reservas
          </h2>
          
          <div v-if="reservas.length > 0" class="space-y-4">
            <div v-for="reserva in reservas" :key="reserva.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold text-gray-900">{{ reserva.nombre }}</h3>
                  <p class="text-sm text-gray-500"> {{ reserva.direccion }}</p>
                </div>
                <div class="flex space-x-2">
                  <button @click="cancelarCancha(reserva.id)" class="text-red-600 hover:text-red-800 text-sm font-medium">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-8">
            <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p class="text-gray-600">No tienes reservas activas</p>
            <router-link to="/canchas" class="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Reservar una cancha
            </router-link>
          </div>
        </div>

        <!-- Acciones del usuario -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">Acciones</h2>
          <div class="flex space-x-4">
            <router-link to="/canchas" class="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium">
                {{ authStore.usuarioAutenticado && authStore.usuarioAutenticado.administrador ? 'Administrar Canchas' : 'Reservar Cancha' }}
            </router-link>
            <button 
              @click="borrarUsuario"
              class="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors font-medium"
            >
              Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <svg class="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <p class="text-red-600 font-semibold mb-2">Error al cargar el perfil</p>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button 
          @click="obtenerUsuario"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>

      <div v-else class="text-center py-12">
        <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <p class="text-gray-600">No se encontró el usuario.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  import { useAuthStore } from '../stores/authStore'
  
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()
  const id = route.params.id
  const usuarios = ref(null)
  const cargando = ref(true)
  const reservas = ref([])
  const error = ref(null)
  
  const editarPerfil = ref(false)
  
  const nuevoNombre = ref('')
  const contraseñaNombre = ref('')
  const guardandoNombre = ref(false)
  const mensajeNombre = ref(null)
  
  const contraseñaActual = ref('')
  const nuevaContraseña = ref('')
  const confirmarContraseña = ref('')
  const guardandoContraseña = ref(false)
  const mensajeContraseña = ref(null)
  
  const obtenerUsuario = async () => {
    try {
      error.value = null
      const res = await axios.get(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios/${id}`)
      usuarios.value = res.data
      nuevoNombre.value = res.data.nombre 
      reservas.value = res.data.reservas
    } catch (error) {
      
      if (error.response?.status === 404) {
        error.value = 'Usuario no encontrado'
      } else if (error.response?.status >= 500) {
        error.value = 'Error del servidor. Intenta nuevamente más tarde.'
      } else {
        error.value = 'Error de conexión. Verifica tu conexión a internet.'
      }
    } finally {
      cargando.value = false
    }
  }
  
  onMounted(() => {
    obtenerUsuario()
  })

  const cambiarNombre = async () => {
    if (!nuevoNombre.value.trim() || !contraseñaNombre.value.trim()) {
      mensajeNombre.value = { tipo: 'error', texto: 'Por favor completa todos los campos' }
      return
    }

    guardandoNombre.value = true
    mensajeNombre.value = null

    try {
      if (contraseñaNombre.value !== usuarios.value.contrasenia) {
        mensajeNombre.value = { tipo: 'error', texto: 'La contraseña actual es incorrecta' }
        return
      }

      const res = await axios.put(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios/${id}`, {
        ...usuarios.value,
        nombre: nuevoNombre.value.trim()
      })

      usuarios.value = res.data
      
      if (authStore.usuarioAutenticado && authStore.usuarioAutenticado.id === id) {
        authStore.setUsuarioAutenticado(res.data)
      }

      mensajeNombre.value = { tipo: 'exito', texto: 'Nombre actualizado correctamente' }
      
      contraseñaNombre.value = ''
      
      setTimeout(() => {
        editarPerfil.value = false
        mensajeNombre.value = null
      }, 2000)

    } catch (error) {
      mensajeNombre.value = { tipo: 'error', texto: 'Error al actualizar el nombre. Intenta nuevamente.' }
    } finally {
      guardandoNombre.value = false
    }
  }

  const cambiarContraseña = async () => {
    if (!contraseñaActual.value.trim() || !nuevaContraseña.value.trim() || !confirmarContraseña.value.trim()) {
      mensajeContraseña.value = { tipo: 'error', texto: 'Por favor completa todos los campos' }
      return
    }

    if (nuevaContraseña.value !== confirmarContraseña.value) {
      mensajeContraseña.value = { tipo: 'error', texto: 'Las contraseñas no coinciden' }
      return
    }

    if (nuevaContraseña.value.length < 6) {
      mensajeContraseña.value = { tipo: 'error', texto: 'La nueva contraseña debe tener al menos 6 caracteres' }
      return
    }

    guardandoContraseña.value = true
    mensajeContraseña.value = null

    try {
      if (contraseñaActual.value !== usuarios.value.contrasenia) {
        mensajeContraseña.value = { tipo: 'error', texto: 'La contraseña actual es incorrecta' }
        return
      }

      const res = await axios.put(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios/${id}`, {
        ...usuarios.value,
        contrasenia: nuevaContraseña.value
      })

      usuarios.value = res.data
      
      if (authStore.usuarioAutenticado && authStore.usuarioAutenticado.id === id) {
        authStore.setUsuarioAutenticado(res.data)
      }

      mensajeContraseña.value = { tipo: 'exito', texto: 'Contraseña actualizada correctamente' }
      
      contraseñaActual.value = ''
      nuevaContraseña.value = ''
      confirmarContraseña.value = ''
      
      setTimeout(() => {
        editarPerfil.value = false
        mensajeContraseña.value = null
      }, 2000)

    } catch (error) {
      mensajeContraseña.value = { tipo: 'error', texto: 'Error al actualizar la contraseña. Intenta nuevamente.' }
    } finally {
      guardandoContraseña.value = false
    }
  }

  const cancelarCambioNombre = () => {
    nuevoNombre.value = usuarios.value.nombre
    contraseñaNombre.value = ''
    mensajeNombre.value = null
  }

  const cancelarCambioContraseña = () => {
    contraseñaActual.value = ''
    nuevaContraseña.value = ''
    confirmarContraseña.value = ''
    mensajeContraseña.value = null
  }

  const borrarUsuario = async () => {
    if (!confirm('¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      return
    }
    
    try {
      await axios.delete(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios/${id}`)
      
      alert('Cuenta eliminada correctamente')
      
      authStore.logout()
      router.push('/login')
      
    } catch (error) {
      alert('Error al eliminar la cuenta')
    }
  }

const cancelarCancha = async (reservaId) => {
  if (!confirm('¿Estás seguro de que querés cancelar esta reserva?')) {
    return
  }
  
  try {
    // Buscar la reserva que se va a cancelar para obtener el ID de la cancha
    const reservaACancelar = reservas.value.find(reserva => reserva.id === reservaId)
    
    if (!reservaACancelar) {
      alert('Reserva no encontrada')
      return
    }
    
    // Crear una nueva lista de reservas sin la reserva cancelada
    const nuevasReservas = reservas.value.filter(reserva => reserva.id !== reservaId)
    
    // Actualizar el usuario completo con las reservas filtradas
    const usuarioActualizado = {
      ...usuarios.value,
      reservas: nuevasReservas
    }
    
    // Hacer ambas peticiones en paralelo
    const [resUsuario, resCancha] = await Promise.all([
      // Actualizar el usuario removiendo la reserva
      axios.put(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios/${id}`, usuarioActualizado),
      
      // Obtener la cancha para luego actualizarla
      axios.get(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas/${reservaACancelar.id}`)
    ])
    
    // Actualizar la cancha para marcarla como disponible
    const canchaActualizada = {
      ...resCancha.data,
      disponible: true
    }
    
    await axios.put(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas/${reservaACancelar.id}`, canchaActualizada)
    
    // Actualizar el estado local
    usuarios.value = resUsuario.data
    reservas.value = resUsuario.data.reservas
    
    // Actualizar el store si es el usuario actual
    if (authStore.usuarioAutenticado && authStore.usuarioAutenticado.id === id) {
      authStore.setUsuarioAutenticado(resUsuario.data)
    }
    
    alert('Reserva cancelada correctamente')
    
  } catch (error) {
    console.error('Error al cancelar reserva:', error)
    alert('Error al cancelar la reserva. Intenta nuevamente.')
  }
}

</script>