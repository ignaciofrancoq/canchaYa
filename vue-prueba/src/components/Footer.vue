<script setup>
    import { RouterLink } from 'vue-router'
    
</script>


<template>
  <footer class="w-full bg-[#121212] text-gray-400 border-t border-gray-700 py-4">
    <div class="flex flex-col md:flex-row justify-between items-center px-4">
      <p class="text-sm mb-2 md:mb-0">&copy; 2025 Mi Sitio Web. Todos los derechos reservados.</p>
      <nav>
        <ul class="flex gap-4 text-base">
          <li>
            <RouterLink
              to="/"
              class="hover:text-white transition-colors duration-200"
              :class="{ 'text-[#1DB954]': $route.path === '/' }"
            >
              Inicio
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              class="hover:text-white transition-colors duration-200"
              :class="{ 'text-[#1DB954]': $route.path === '/about' }"
            >
              Sobre nosotros
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/contact"
              class="hover:text-white transition-colors duration-200"
              :class="{ 'text-[#1DB954]': $route.path === '/contact' }"
            >
              Contacto
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

