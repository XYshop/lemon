<script setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router'
import { useProductStore } from "../../store/index.js";

const store = useProductStore()
const router = useRouter()

function toCart() {
  router.push('/shop/cart')
}

function toShop() {
  router.push('/shop')
}

onMounted(() => {
  store.getJson()
})
</script>

<template>
  <div class="shop-layout">
    <div class="shop-nav">
      <button @click="toShop">
        <i class="fa-solid fa-circle-user"></i>Shop
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
    :first-child {
      margin-left: auto;
    }
  }
}

.router {
  color: ghostwhite;
}
</style>
