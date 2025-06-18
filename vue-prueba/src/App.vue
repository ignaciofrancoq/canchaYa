<script setup>

import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { useAuthStore } from './stores/authStore'
const authStore = useAuthStore()
import { useRoute } from 'vue-router'
const route = useRoute()

</script>

<template>
  <div class="min-h-screen w-full flex flex-col" v-if="authStore.estaAutenticado || route.path === '/login'">

    <Header/>

    <main class="flex-grow">
      <router-view />
    </main>

    <Footer/>

  </div>
   <div v-else class="text-center mt-10">
    <p>No autorizado</p>
  </div>
</template>

