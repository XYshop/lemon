import { defineStore } from 'pinia';

const useHomeStore = defineStore('home', {
  state: () => {
    return {
      /** @type {{ title: string, id: number, tags: [], link: string, image_tag: string }[]} */
      demoList: []
    }
  },

  actions: {
    async getDemoList() {
      const response = await fetch('/api/home', {
        headers: { Authorization: localStorage.getItem('token') }
      })
      const data = await response.json()
      if (data.code === 0) {
        this.demoList = data.data
      }
    }
  }
})

export { useHomeStore }