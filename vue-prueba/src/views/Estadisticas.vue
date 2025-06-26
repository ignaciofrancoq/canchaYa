<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Estadísticas de Reservas</h1>
        <p class="text-lg text-gray-600">Análisis de las canchas más populares y tendencias de reservas</p>
      </div>

      <!-- Gráfico principal -->
      <div class="mb-8">
        <CanchasChart />
      </div>

      <!-- Estadísticas adicionales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total de canchas -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="bg-blue-100 rounded-full p-3">
              <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total de Canchas</p>
              <p class="text-2xl font-bold text-gray-900">{{ estadisticas.totalCanchas }}</p>
            </div>
          </div>
        </div>

        <!-- Total de reservas -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="bg-green-100 rounded-full p-3">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total de Reservas</p>
              <p class="text-2xl font-bold text-gray-900">{{ estadisticas.totalReservas }}</p>
            </div>
          </div>
        </div>

        <!-- Canchas disponibles -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="bg-yellow-100 rounded-full p-3">
              <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Canchas Disponibles</p>
              <p class="text-2xl font-bold text-gray-900">{{ estadisticas.canchasDisponibles }}</p>
            </div>
          </div>
        </div>

        <!-- Promedio de reservas -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="bg-purple-100 rounded-full p-3">
              <svg class="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Promedio por Cancha</p>
              <p class="text-2xl font-bold text-gray-900">{{ estadisticas.promedioReservas }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Canchas con más reservas -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg class="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            Top 10 Canchas Más Reservadas
          </h3>
          <div class="space-y-3">
            <div 
              v-for="(cancha, index) in estadisticas.topCanchas" 
              :key="cancha.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-6 h-6 rounded-full text-white font-bold text-xs"
                     :class="getColorByIndex(index)">
                  {{ index + 1 }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ cancha.nombre }}</p>
                  <p class="text-sm text-gray-600">{{ cancha.direccion }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-blue-600">{{ cancha.totalReservas }}</p>
                <p class="text-xs text-gray-500">reservas</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Información del sistema -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg class="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Información del Sistema
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-2 border-b border-gray-200">
              <span class="text-gray-600">Última actualización:</span>
              <span class="font-medium text-gray-900">{{ estadisticas.ultimaActualizacion }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200">
              <span class="text-gray-600">Canchas analizadas:</span>
              <span class="font-medium text-gray-900">{{ estadisticas.canchasAnalizadas }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200">
              <span class="text-gray-600">Usuarios con reservas:</span>
              <span class="font-medium text-gray-900">{{ estadisticas.usuariosConReservas }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600">Tasa de ocupación:</span>
              <span class="font-medium text-gray-900">{{ estadisticas.tasaOcupacion }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import CanchasChart from '../components/CanchasChart.vue'

const canchas = ref([])
const estadisticas = ref({
  totalCanchas: 0,
  totalReservas: 0,
  canchasDisponibles: 0,
  promedioReservas: 0,
  topCanchas: [],
  ultimaActualizacion: '',
  canchasAnalizadas: 0,
  usuariosConReservas: 0,
  tasaOcupacion: 0
})

const getColorByIndex = (index) => {
  const colorClasses = [
    'bg-blue-600',
    'bg-green-600', 
    'bg-yellow-600',
    'bg-red-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-teal-600',
    'bg-orange-600',
    'bg-gray-600'
  ]
  return colorClasses[index] || 'bg-gray-600'
}

const obtenerEstadisticasCompletas = async () => {
  try {
    // Obtener canchas
    const resCanchas = await axios.get('https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas')
    canchas.value = resCanchas.data
    
    // Usar el campo contadorReservas de cada cancha
    const estadisticasCanchas = canchas.value.map(cancha => ({
      id: cancha.id,
      nombre: cancha.nombre,
      direccion: cancha.direccion,
      totalReservas: cancha.contadorReservas || 0
    }))
    
    // Ordenar por número de reservas
    const canchasConEstadisticas = estadisticasCanchas
      .sort((a, b) => b.totalReservas - a.totalReservas)
    
    // Filtrar solo las canchas que tienen al menos 1 reserva para el top
    const canchasConReservas = canchasConEstadisticas.filter(cancha => cancha.totalReservas > 0)
    
    // Calcular total de reservas
    const totalReservasCount = canchasConReservas.reduce((total, cancha) => total + cancha.totalReservas, 0)
    
    const canchasDisponibles = canchas.value.filter(cancha => cancha.disponible).length
    
    // Obtener usuarios para contar usuarios con reservas
    const resUsuarios = await axios.get('https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios')
    const usuarios = resUsuarios.data
    const usuariosConReservasCount = usuarios.filter(usuario => 
      usuario.reservas && Array.isArray(usuario.reservas) && usuario.reservas.length > 0
    ).length
    
    estadisticas.value = {
      totalCanchas: canchas.value.length,
      totalReservas: totalReservasCount,
      canchasDisponibles: canchasDisponibles,
      promedioReservas: canchas.value.length > 0 ? Math.round(totalReservasCount / canchas.value.length) : 0,
      topCanchas: canchasConReservas.slice(0, 10),
      ultimaActualizacion: new Date().toLocaleString('es-ES'),
      canchasAnalizadas: canchasConReservas.length,
      usuariosConReservas: usuariosConReservasCount,
      tasaOcupacion: canchas.value.length > 0 ? Math.round(((canchas.value.length - canchasDisponibles) / canchas.value.length) * 100) : 0
    }
    
    console.log('Estadísticas completas:', {
      totalCanchas: estadisticas.value.totalCanchas,
      totalReservas: estadisticas.value.totalReservas,
      canchasConReservas: estadisticas.value.canchasAnalizadas,
      topCanchas: estadisticas.value.topCanchas,
      detallesCompletos: {
        canchas: canchas.value,
        estadisticasPorCancha: estadisticasCanchas
      }
    })
    
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
  }
}

onMounted(() => {
  obtenerEstadisticasCompletas()
})
</script> 