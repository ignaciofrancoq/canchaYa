<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore()

const router = useRouter()

const irACanchas = () => {
  router.push('/canchas')
}
const irAUser = () => {
  if (authStore.usuarioAutenticado && authStore.usuarioAutenticado.id) {
    router.push(`/usuario/${authStore.usuarioAutenticado.id}`)
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>
  
  <div>
    <button type="button" @click="irACanchas"> Ver Canchas</button>
  </div>
  
    <div>
      <button type="button" @click="irAUser"> Perfil</button>
   </div>

</template>


