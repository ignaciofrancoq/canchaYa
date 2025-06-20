<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Sobre Cancha Ya!</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        La plataforma líder para reservar canchas deportivas de manera fácil, rápida y segura.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
        <p class="text-gray-600 leading-relaxed mb-6">
          Facilitar el acceso a instalaciones deportivas de calidad, conectando a deportistas 
          con las mejores canchas de la ciudad. Queremos que el deporte sea accesible para todos.
        </p>
        <div class="space-y-3">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-700">Reservas instantáneas 24/7</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-700">Canchas verificadas y de calidad</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-700">Pagos seguros y transparentes</span>
          </div>
        </div>
      </div>
      
      <div class="bg-green-100 rounded-lg p-8">
        <div class="text-center">
          <svg class="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Deportes Disponibles</h3>
          <div class="grid grid-cols-2 gap-4 mt-6">
            <div class="text-center">
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <span class="text-sm font-medium text-gray-700">Fútbol</span>
              </div>
            </div>
            <div class="text-center">
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <span class="text-sm font-medium text-gray-700">Tenis</span>
              </div>
            </div>
            <div class="text-center">
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <span class="text-sm font-medium text-gray-700">Básquet</span>
              </div>
            </div>
            <div class="text-center">
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <span class="text-sm font-medium text-gray-700">Vóley</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 rounded-lg p-8 mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">¿Por qué elegirnos?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Rápido</h3>
          <p class="text-gray-600">Reserva en menos de 2 minutos</p>
        </div>
        
        <div class="text-center">
          <div class="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Seguro</h3>
          <p class="text-gray-600">Transacciones 100% seguras</p>
        </div>
        
        <div class="text-center">
          <div class="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Confiable</h3>
          <p class="text-gray-600">Miles de usuarios satisfechos</p>
        </div>
      </div>
    </div>

    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">¿Listo para empezar?</h2>
      <p class="text-gray-600 mb-6">Únete a miles de deportistas que ya confían en nosotros</p>
      <button class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
        Ver Canchas Disponibles
      </button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
