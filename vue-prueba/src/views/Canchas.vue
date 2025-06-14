<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Canchas disponibles</h1>

    <div v-if="cargando" class="text-gray-500">Cargando...</div>

    <div v-else class="flex flex-col space-y-2">
      <button
        v-for="cancha in canchas"
        :key="cancha.id"
        @click="irACancha(cancha.id)"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {{ cancha.nombre }}
      </button>
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

onMounted(() => {
  obtenerCanchas()
})
</script>
