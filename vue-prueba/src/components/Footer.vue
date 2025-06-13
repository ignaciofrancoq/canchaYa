<script setup>
    import { RouterLink } from 'vue-router'
</script>


<template>
  <footer class="bg-gray-800 text-white py-6 mt-8">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <p class="text-sm">&copy; 2025 Mi Sitio Web. Todos los derechos reservados.</p>
      <nav class="mt-4 md:mt-0">
        <ul class="flex space-x-4">
          <li><RouterLink to="/" class="hover:text-gray-400">Inicio</RouterLink></li>
          <li><RouterLink to="/about" class="hover:text-gray-400">Sobre nosotros</RouterLink></li>
          <li><RouterLink to="/contact" class="hover:text-gray-400">Contacto</RouterLink></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>


