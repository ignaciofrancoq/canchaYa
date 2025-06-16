<template>
  <div>
    <h1>Canchas disponibles</h1>

    <div v-if="cargando">Cargando...</div>

    <div v-else class="canchas-container">
      <div
        v-for="cancha in canchas"
        :key="cancha.id"
        class="cancha-card"
        @click="irACancha(cancha.id)">
        
        <img 
          :src="cancha.foto" 
          :alt="cancha.nombre"
          class="cancha-imagen"
          @error="manejarErrorImagen"
        />
        
        <div class="cancha-info">
          <h3>{{ cancha.nombre }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

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
  // Imagen por defecto si falla la carga
  event.target.src = '/placeholder-cancha.jpg'
}

onMounted(() => {
  obtenerCanchas()
})
</script>

<style scoped>
.canchas-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.cancha-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
}

.cancha-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cancha-imagen {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.cancha-info {
  padding: 15px;
}

.cancha-info h3 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}
</style>