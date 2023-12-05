import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  actions: {
    async getToken() {
      const response = await fetch('/api/login', {
        method: 'POST'
      })
      const data = await response.json()
      if (data.code === 0) {
        window.localStorage.setItem('token', JSON.stringify(data.token))
      } else {
        console.log(data)
      }
    }
  }
})
