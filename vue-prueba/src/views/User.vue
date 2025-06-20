<template>
  <div>
    <h1>Bienvenido usuario numero {{ id }}</h1>

    <div v-if="cargando">Cargando...</div>

    <div v-else-if="usuarios">
      <h2>{{ usuarios.nombre }}</h2>
      <p><strong>reservas:</strong> {{ usuarios.contrasenia }} </p>
    </div>

    <div v-else>
      No se encontró el usuario.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = route.params.id
const usuarios = ref(null)
const cargando = ref(true)

const obtenerUsuario = async () => {
  try {
    const res = await axios.get(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios/${id}`)
    usuarios.value = res.data
  } catch (error) {
    console.error('Error al cargar usuario:', error)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  obtenerUsuario()
})
</script>