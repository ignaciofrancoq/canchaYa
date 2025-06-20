import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const usuarioAutenticado = ref(null)

  function setUsuarioAutenticado(usuario) {
    usuarioAutenticado.value = usuario
    localStorage.setItem('usuario', JSON.stringify(usuario))
  }

  function logout() {
    usuarioAutenticado.value = null
    localStorage.removeItem('usuario')
  }

  // 👇 Esto ahora es una función que podés llamar desde App.vue
  function cargarUsuarioDesdeLocalStorage() {
    const guardado = localStorage.getItem('usuario')
    if (guardado) {
      usuarioAutenticado.value = JSON.parse(guardado)
    }
  }

  return {
    usuarioAutenticado,
    setUsuarioAutenticado,
    logout,
    cargarUsuarioDesdeLocalStorage
  }
})
