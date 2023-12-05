<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function toCart() {
  router.push('/shopping/cart')
}

function toShop() {
  router.push('/shopping')
}

function logout() {
  window.localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <div class="shop-layout">
    <div class="shop-nav">
      <button @click="logout">
        <i class="fa-solid fa-circle-user"></i>logout
      </button>
      <button @click="toShop">
        <i class="fa-solid fa-circle-user"></i>shop
      </button>
      <button @click="toCart">
        <i class="fa-regular fa-cart-shopping"></i>
      </button>
    </div>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.shop-layout {
  max-width: 800px;
  margin: 3% auto;

  .shop-nav {
    display: flex;

    button {
      text-transform: uppercase;
    }

    :first-child + button {
      margin-left: auto;
    }
  }
}

.router {
  color: ghostwhite;
}
</style>
