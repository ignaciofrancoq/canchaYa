<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
      <svg class="h-6 w-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      </svg>
      Canchas Más Reservadas
    </h2>
    
    <div v-if="cargando" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600">Cargando estadísticas...</span>
    </div>
    
    <div v-else-if="error" class="text-center py-8">
      <svg class="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
      <p class="text-red-600 font-medium">{{ error }}</p>
    </div>
    
    <div v-else class="space-y-4">
      <div class="flex justify-between items-center mb-4">
        <div class="text-sm text-gray-600">
          <span class="font-medium">Total de reservas:</span> {{ totalReservas }}
        </div>
        <div class="flex space-x-2">
          <button 
            @click="cambiarTipoGrafico('bar')"
            :class="tipoGrafico === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            Barras
          </button>
          <button 
            @click="cambiarTipoGrafico('doughnut')"
            :class="tipoGrafico === 'doughnut' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            Dona
          </button>
        </div>
      </div>
      
      <div class="relative" style="height: 400px; min-height: 400px;">
        <canvas ref="chartCanvas" style="width: 100%; height: 100%;"></canvas>
      </div>
      
      <div v-if="canchasMasReservadas.length > 0" class="mt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-3">Top 5 Canchas Más Reservadas</h3>
        <div class="space-y-2">
          <div 
            v-for="(cancha, index) in canchasMasReservadas.slice(0, 5)" 
            :key="cancha.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'

Chart.register(...registerables)

const chartCanvas = ref(null)
const chart = ref(null)
const cargando = ref(true)
const error = ref(null)
const tipoGrafico = ref('bar')
const canchasMasReservadas = ref([])
const totalReservas = ref(0)

const colores = [
  'rgba(59, 130, 246, 0.8)',   // Azul
  'rgba(16, 185, 129, 0.8)',   // Verde
  'rgba(245, 158, 11, 0.8)',   // Amarillo
  'rgba(239, 68, 68, 0.8)',    // Rojo
  'rgba(139, 92, 246, 0.8)',   // Púrpura
  'rgba(236, 72, 153, 0.8)',   // Rosa
  'rgba(14, 165, 233, 0.8)',   // Cian
  'rgba(34, 197, 94, 0.8)',    // Verde claro
  'rgba(251, 146, 60, 0.8)',   // Naranja
  'rgba(168, 85, 247, 0.8)'    // Violeta
]

const getColorByIndex = (index) => {
  const colorClasses = [
    'bg-blue-600',
    'bg-green-600', 
    'bg-yellow-600',
    'bg-red-600',
    'bg-purple-600'
  ]
  return colorClasses[index] || 'bg-gray-600'
}

const obtenerEstadisticasReservas = async () => {
  try {
    cargando.value = true
    error.value = null
    
    const resCanchas = await axios.get('https://684b71a9ed2578be881b5f68.mockapi.io/cancha/canchas')
    const canchas = resCanchas.data
    
    const estadisticas = canchas.map(cancha => ({
      id: cancha.id,
      nombre: cancha.nombre,
      direccion: cancha.direccion,
      totalReservas: cancha.contadorReservas || 0
    }))
    
    const canchasConEstadisticas = estadisticas
      .sort((a, b) => b.totalReservas - a.totalReservas)
    
    const canchasConReservas = canchasConEstadisticas.filter(cancha => cancha.totalReservas > 0)
    
    const totalReservasCount = canchasConReservas.reduce((total, cancha) => total + cancha.totalReservas, 0)
    
    canchasMasReservadas.value = canchasConReservas
    totalReservas.value = totalReservasCount
    
    await nextTick()
    
    setTimeout(() => {
      crearGrafico()
    }, 100)
    
  } catch (err) {
    error.value = 'Error al cargar las estadísticas de reservas'
  } finally {
    cargando.value = false
  }
}

const crearGrafico = () => {
  
  if (!chartCanvas.value) {
    setTimeout(() => {
      crearGrafico()
    }, 200)
    return
  }
  
  if (chart.value) {
    chart.value.destroy()
  }
  
  const ctx = chartCanvas.value.getContext('2d')
  
  const datosGrafico = canchasMasReservadas.value.slice(0, 10)
    
  const config = {
    type: tipoGrafico.value,
    data: {
      labels: datosGrafico.map(cancha => cancha.nombre),
      datasets: [{
        label: 'Número de Reservas',
        data: datosGrafico.map(cancha => cancha.totalReservas),
        backgroundColor: colores.slice(0, datosGrafico.length),
        borderColor: colores.slice(0, datosGrafico.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: tipoGrafico.value === 'bar' ? 4 : 0,
        hoverBackgroundColor: colores.slice(0, datosGrafico.length).map(color => color.replace('0.8', '1'))
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: tipoGrafico.value === 'doughnut',
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed.y || context.parsed} reservas`
            }
          }
        }
      },
      scales: tipoGrafico.value === 'bar' ? {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: function(value) {
              return value + ' reservas'
            }
          },
          title: {
            display: true,
            text: 'Número de Reservas'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Canchas'
          }
        }
      } : {}
    }
  }
  
  try {
    chart.value = new Chart(ctx, config)
  } catch (error) {
    console.error('Error al crear el gráfico:', error)
  }
}

const cambiarTipoGrafico = (nuevoTipo) => {
  tipoGrafico.value = nuevoTipo
  crearGrafico()
}

onMounted(() => {
  setTimeout(() => {
    obtenerEstadisticasReservas()
  }, 300)
})
</script> 