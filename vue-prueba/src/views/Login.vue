<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const usuario = ref('')
const contraseña = ref('')
const error = ref('')

function iniciarSesion() {
  const success = authStore.login(usuario.value, contraseña.value)
  if (success) {
    router.push('/canchas') // redirigimos a la vista principal
  } else {
    error.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <h2 class="text-xl font-bold mb-4">Iniciar sesión</h2>

    <input v-model="usuario" placeholder="Usuario" class="border p-2 w-full mb-2" />
    <input v-model="contraseña" type="password" placeholder="Contraseña" class="border p-2 w-full mb-2" />
    <button @click="iniciarSesion" class="bg-blue-500 text-white px-4 py-2 rounded">Ingresar</button>

    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>
