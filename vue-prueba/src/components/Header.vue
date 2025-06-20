<script setup>
    import { RouterLink } from 'vue-router'
</script>


<template>
  <header class="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <h1 class="text-2xl font-bold text-white">
          <router-link to="/" class="hover:text-green-200 transition-colors duration-200">
            Cancha Ya!
          </router-link>
        </h1>
        <nav class="hidden md:flex space-x-8">
          <RouterLink 
            to="/" 
            class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
            :class="{ 'text-green-200 border-b-2 border-green-200': $route.path === '/' }"
          >
            Inicio
          </RouterLink>
          <RouterLink 
            to="/canchas" 
            class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
            :class="{ 'text-green-200 border-b-2 border-green-200': $route.path === '/canchas' }"
          >
            Canchas
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="text-white hover:text-green-200 transition-colors duration-200 font-medium"
            :class="{ 'text-green-200 border-b-2 border-green-200': $route.path === '/about' }"
          >
            Sobre Nosotros
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>
