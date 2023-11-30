import { defineStore } from "pinia";

export const useProductStore = defineStore('products', {
  state: () => {
    return {
      products: []
    }
  },
  actions: {
    async getJson() {
      const response = await fetch('/api/shop', {
      })
     const data = await response.json()
      if (data.code === 0) {
        this.products = data.data
      }
    }
  }
})
