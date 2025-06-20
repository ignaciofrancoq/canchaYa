<template>
  <div>
    <div v-if="cargando">Cargando...</div>

    <div v-else-if="usuarios">
      <h1>Bienvenido {{ usuarios.usuario }}</h1>
      <h2>{{ usuarios.nombre }}</h2>
      <p><strong>reservas:</strong> {{ usuarios.contrasenia }} </p>
      <button @click="borrarUsuario">
        Eliminar Usuario
      </button>
    </div>

    <div v-else>
      No se encontró el usuario.
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  import { useAuthStore } from '../stores/authStore'
  
  const route = useRoute()
  const router = useRouter() // Para navegación
  const authStore = useAuthStore() // Para el logout
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

  const borrarUsuario = async () => {
    // Confirmación antes de eliminar
    if (!confirm('¿Estás seguro de que querés eliminar tu usuario?')) {
      return
    }
    
    try {
      await axios.delete(`https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios/${id}`)
      
      // Mostrar mensaje antes de la navegación
      alert('Usuario eliminado correctamente')
      
      // Logout y redirección
      authStore.logout()
      router.push('/login')
      
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      alert('Error al eliminar el usuario')
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #555;
  }
  
  p {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c0392b;
  }
</style>