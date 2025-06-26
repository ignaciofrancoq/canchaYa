<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irACanchas = () => {
  router.push('/canchas')
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Encuentra tu
          <span class="text-green-600">Cancha Perfecta</span>
        </h1>
        
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Reserva canchas de fútbol, tenis, básquet y más deportes de manera fácil y rápida. 
          Encuentra la cancha ideal cerca de ti y disfruta de tu deporte favorito.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="irACanchas"
            class="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Ver Canchas Disponibles
          </button>

        </div>
      </div>
    </div>
  </div>

</template>


