<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irACanchas = () => {
  router.push('/canchas')
}
const irAUser = () => {
  router.push('/usuario/1')
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


