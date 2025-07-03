<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irACanchas = () => {
  router.push('/canchas')
}

const irAEstadisticas = () => {
  router.push('/estadisticas')
}
</script>

<template>
  <div class="min-h-screen" style="background-image: url('https://img.freepik.com/foto-gratis/medio-ambiente-deportivo-rugby-archivado_23-2151891713.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed;">
    
    <div class="relative min-h-screen flex items-center justify-center">
      <div class="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-6">
          <span class="text-green-400">Cancha</span> Ya!
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          El mejor complejo deportivo con canchas de césped sintético de última generación
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="irACanchas"
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
          >
            Reservar Cancha
          </button>
          <button 
            @click="irAEstadisticas"
            class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 text-lg"
          >
            Ver Estadísticas
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white bg-opacity-95 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Nuestro Complejo</h2>
          <p class="text-xl text-gray-600">Más de 7.000 m² de pura pasión por el deporte</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-green-50 rounded-lg shadow-lg">
            <div class="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Múltiples Canchas</h3>
            <p class="text-gray-600">Canchas de fútbol césped sintético de última generación</p>
          </div>

          <div class="text-center p-6 bg-blue-50 rounded-lg shadow-lg">
            <div class="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Para 5, 6, 7 y 8 Jugadores</h3>
            <p class="text-gray-600">Canchas adaptadas para diferentes modalidades de juego</p>
          </div>

          <div class="text-center p-6 bg-yellow-50 rounded-lg shadow-lg">
            <div class="bg-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Instalaciones Premium</h3>
            <p class="text-gray-600">Vestuarios, bar y estacionamiento propio</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold mb-6">El Complejo</h2>
            <p class="text-lg mb-6">
              Contamos con canchas de césped sintético de última generación con dimensiones para 5, 6, 7 y 8 jugadores. 
              Ambiente climatizado, nuevos y lujosos vestuarios para ambos sexos, bar, parrilla y estacionamiento propio, 
              sobre un predio que lo transforma en uno de los complejos deportivos más grandes de la zona.
            </p>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Canchas techadas e iluminadas</span>
              </div>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Generador propio para iluminación</span>
              </div>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Ubicación estratégica y fácil acceso</span>
              </div>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-green-600 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <span class="text-4xl font-bold text-white">7K+</span>
            </div>
            <h3 class="text-2xl font-bold mb-2">Metros Cuadrados</h3>
            <p class="text-gray-300">Uno de los complejos deportivos más grandes de la zona</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-green-600 py-16">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-4xl font-bold text-white mb-6">¿Listo para jugar?</h2>
        <p class="text-xl text-green-100 mb-8">
          Reserva tu cancha ahora y disfruta del mejor fútbol con amigos
        </p>
        <button 
          @click="irACanchas"
          class="bg-white text-green-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
        >
          Reservar Ahora
        </button>
      </div>
    </div>

  </div>
</template>


