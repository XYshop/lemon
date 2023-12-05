import { defineStore } from 'pinia'

export const useShoppingStore = defineStore('shopping', {
  state: () => {
    return {
      products: [],
      checkOutProducts: [],
      details: {}
    }
  },

  actions: {
    async getProducts() {
      const response = await fetch('/api/shop', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      const data = await response.json()
      if (data.code === 0) {
        this.products = data.data
      }
    },

    async getCheckOutProducts() {
      const response = await fetch('/api/cart', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      const data = await response.json()
      if (data.code === 0) {
        this.checkOutProducts = data.data
      }
    },

    async getProductDetails(id) {
      const response = await fetch(`/api/product/details/${id}`)
      const data = await response.json()
      if (data.code === 0) {
        this.details = data.data
      }
    },

    async addToCart(product) {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify(product)
      })
      return await response.json()
    },

    async removeFormCart(id) {
      const response = await fetch(`/api/cart/delete/${id}`, {
        method: 'DELETE'
      })
      return await response.json()
    },

    async clearCart() {
      const response = await fetch('/api/cart/empty', {
        method: 'DELETE'
      })
      return await response.json()
    }
  }
})
