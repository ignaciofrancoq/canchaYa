<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irACanchas = () => {
  router.push('/canchas')
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="irACanchas"> Ver Canchas</button>
 </div>
</template>


