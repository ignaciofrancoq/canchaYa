<script setup>
      import { ref, onMounted } from 'vue'
      import axios from 'axios'
      import { useRouter } from 'vue-router'
      
      const canchas = ref([])
      const cargando = ref(true)
      const router = useRouter()
      
      const obtenerCanchas = async () => {
        try {
          const res = await axios.get('https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas')
          canchas.value = res.data
        } catch (error) {
          console.error('Error al obtener canchas:', error)
        } finally {
          cargando.value = false
        }
      }
      
      const irACancha = (id) => {
        router.push(`/canchas/${id}`)
      }
      
      const manejarErrorImagen = (event) => {
        event.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible'
      }
      
      onMounted(() => {
        obtenerCanchas()
      })
      const registrarCancha = () => {
        router.push('/canchas/crear')
      }
</script>
    
<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Canchas Disponibles</h1>

    <div v-if="cargando" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      <span class="ml-3 text-gray-600">Cargando canchas...</span>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="cancha in canchas"
        :key="cancha.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 transition-transform duration-200"
        @click="irACancha(cancha.id)"
      >
        <div class="relative">
          <img 
            :src="cancha.foto" 
            :alt="cancha.nombre"
            class="w-full h-48 object-cover"
            @error="manejarErrorImagen"
          />
          <div class="absolute top-3 right-3">
            <span 
              :class="cancha.disponible ? 'bg-green-500' : 'bg-red-500'"
              class="px-2 py-1 rounded-full text-white text-xs font-semibold"
            >
              {{ cancha.disponible ? 'Disponible' : 'Reservada' }}
            </span>
          </div>
        </div>
        
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ cancha.nombre }}</h3>
          <div class="flex items-center text-sm text-gray-600 mb-2">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="truncate">{{ cancha.direccion }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-600">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span>{{ cancha.capacidad }} personas</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!cargando && canchas.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
      <p class="text-gray-600 text-lg">No hay canchas disponibles en este momento.</p>
    </div>
  </div>
  <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
  <button 
    @click="registrarCancha"
    class="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
  >
    Crear Cancha
  </button>
</div>
</template>
