<script setup>
import { useProductStore } from "../../../store/index.js";
import { onMounted } from "vue";

const store = useProductStore()

onMounted(() => {
  store.getJson()
})
</script>

<template>
  <template v-for="product of store.products" :key="product.id">
    <div class="product-layout">
      <div class="product-head">
        <router-link :to="'shop/product/' + product.id">
          <h2>{{ product.title }}</h2>
        </router-link>
        <button>Add to Cart</button>
      </div>
      <p>{{ product.description }}</p>
      <span>{{ product.price }}</span>
    </div>
  </template>
</template>

<style scoped lang="scss">
h2 {
  font-size: 18px;
}

p {
  font-size: 14px;
}

.product-layout {
  margin: 3% auto;
  .product-head {
    display: flex;
    justify-content: space-between;
  }
}
</style>
