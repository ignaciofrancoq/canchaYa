
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  import { useAuthStore } from '../stores/authStore.js'

  const authStore = useAuthStore()
  
  const route = useRoute()
  const id = route.params.id
  const cancha = ref(null)
  const cargando = ref(true)
  
  const obtenerCancha = async () => {
    try {
      const res = await axios.get(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas/${id}`)
      cancha.value = res.data
    } catch (error) {
      console.error('Error al cargar cancha:', error)
    } finally {
      cargando.value = false
    }
  }
  
const reservarCancha = async () => {
  try {
    const authStore = useAuthStore()
    
    const resCancha = await axios.put(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas/${id}`, {
      "disponible": false,
      "contadorReservas": (cancha.value.contadorReservas || 0) + 1
    });
    
    cancha.value = resCancha.data;
    
    const usuarioActual = authStore.usuarioAutenticado;
    const reservasActuales = usuarioActual.reservas || [];
    
    const nuevaReserva = {
      id: cancha.value.id,
      nombre: cancha.value.nombre,
      direccion: cancha.value.direccion,
      capacidad: cancha.value.capacidad,
      foto: cancha.value.foto,
      fechaReserva: new Date().toISOString()
    };
    
    const reservasActualizadas = [...reservasActuales, nuevaReserva];
    
    await axios.put(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios/${authStore.usuarioAutenticado.id}`, {
      ...usuarioActual,
      "reservas": reservasActualizadas
    });

    const usuarioActualizado = { ...usuarioActual, reservas: reservasActualizadas };
    authStore.setUsuarioAutenticado(usuarioActualizado);
    
    alert('Cancha reservada con éxito!');
    
  } catch (error) {
    console.error('Error al reservar cancha:', error);
    alert('Hubo un error al intentar reservar la cancha.');
  }
};

const eliminarCancha = async () => {
  try {
    const authStore = useAuthStore()
    
    const resCancha = await axios.delete(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas/${id}`, {
    });
    
    const usuarioAdmin = authStore.usuarioAutenticado && authStore.usuarioAutenticado.administrador;

    if (usuarioAdmin) {
      cancha.value = resCancha.data;
      alert('Cancha eliminada con éxito!' );
      window.location.href = '/canchas';
    } else {
      alert('No tienes permisos para eliminar esta cancha.')
    }
    
  } catch (error) {
    console.error('Error al eliminar cancha:', error);
    alert('Hubo un error al intentar eliminar la cancha.');
  }
};
  
  const manejarErrorImagen = (event) => {
    event.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible'
  }
  
  onMounted(() => {
    obtenerCancha()
  })
  </script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Detalle de la Cancha</h1>

    <div v-if="cargando" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      <span class="ml-3 text-gray-600">Cargando...</span>
    </div>

    <div v-else-if="cancha" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="relative">
        <img 
          :src="cancha.foto" 
          :alt="cancha.nombre"
          class="w-full h-64 md:h-80 object-cover"
          @error="manejarErrorImagen"
        />
        <div class="absolute top-4 right-4">
          <span 
            :class="cancha.disponible ? 'bg-green-500' : 'bg-red-500'"
            class="px-3 py-1 rounded-full text-white text-sm font-semibold"
          >
            {{ cancha.disponible ? 'Disponible' : 'Reservada' }}
          </span>
        </div>
      </div>
      
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ cancha.nombre }}</h2>
        
        <div class="space-y-3 mb-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-gray-600">{{ cancha.direccion }}</span>
          </div>
          
          <div class="flex items-center">
            <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="text-gray-600">Capacidad: {{ cancha.capacidad }} personas</span>
          </div>
        </div>

        <div v-if="cancha.disponible" class="flex justify-center">
          <button 
            @click="reservarCancha"
            class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-lg"
          >
            Reservar Cancha
          </button>
        </div>
        <div v-if="cancha.disponible" class="h-4"></div>

        <div v-if="cancha.disponible && authStore.usuarioAutenticado && authStore.usuarioAutenticado.administrador" class="flex justify-center">
          <button 
            @click="eliminarCancha"
            class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-lg"
          >
            Eliminar Cancha
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"></path>
      </svg>
      <p class="text-gray-600 text-lg">No se encontró la cancha.</p>
    </div>
  </div>
</template>