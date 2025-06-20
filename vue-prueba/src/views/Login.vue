<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const usuario = ref('')
const contraseña = ref('')
const error = ref('')

async function iniciarSesion() {
  error.value = ''

  try {
    const response = await fetch('https://684b71a9ed2578be881b5f68.mockapi.io/cancha/usuarios')
    const usuarios = await response.json()

    // DEBUG opcional
    console.log('Usuarios desde la API:', usuarios)
    console.log('Ingresado:', usuario.value, contraseña.value)

    const usuarioEncontrado = usuarios.find(
      u => u.usuario === usuario.value.trim() && u.contrasenia === contraseña.value.trim()
    )

    if (usuarioEncontrado) {
      authStore.setUsuarioAutenticado(usuarioEncontrado)
      router.push('/home')
    } else {
      error.value = 'Usuario o contraseña incorrectos'
    }
  } catch (err) {
    error.value = 'Error al conectar con el servidor'
    console.error(err)
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h2 class="text-xl font-bold mb-4">Iniciar sesión</h2>

    <input v-model="usuario" placeholder="Usuario" class="border p-2 w-full max-w-sm mb-2" />
    <input v-model="contraseña" type="password" placeholder="Contraseña" class="border p-2 w-full max-w-sm mb-2" />

    <button @click="iniciarSesion" class="bg-blue-500 text-white px-4 py-2 rounded">Ingresar</button>

    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>
