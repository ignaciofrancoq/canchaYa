import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    estaAutenticado: false,
  }),
  actions: {
    login(usuario, contraseña) {
      if (usuario === 'admin' && contraseña === '1234') {
        this.usuario = {
          nombre: 'Admin',
          email: 'admin@cancha.com'
        }
        this.estaAutenticado = true
        return true
      } else {
        return false
      }
    },
    logout() {
      this.usuario = null
      this.estaAutenticado = false
    }
  }
})
