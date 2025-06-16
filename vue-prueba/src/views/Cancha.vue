<template>
  <div>
    <h1>Detalle de la Cancha</h1>

    <div v-if="cargando">Cargando...</div>

    <div v-else-if="cancha">
      <h2>{{ cancha.nombre }}</h2>
      <p><strong>Dirección:</strong> {{ cancha.direccion }}</p>
      <p><strong>Capacidad:</strong> {{ cancha.capacidad }} personas</p>
      <img 
          :src="cancha.foto" 
          :alt="cancha.nombre"
          class="cancha-imagen"
          @error="manejarErrorImagen"
        />
    </div>

    <div v-else>
      No se encontró la cancha.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

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

onMounted(() => {
  obtenerCancha()
})
</script>
