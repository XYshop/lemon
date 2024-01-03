<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useShoppingStore } from "../../../store/index.js";

const store = useShoppingStore();

const router = useRouter();

async function addToCart(product) {
  const res = await store.addToCart(product);
  if (res.code === 0) {
    store.getCheckOutProducts();
    router.push({ name: "cart" });
  }
}

onMounted(() => {
  store.getProducts();
});
</script>

<template>
  <template v-for="product of store.products" :key="product.id">
    <div class="product-layout">
      <div class="product-head">
        <router-link :to="'shopping/product/' + product.id">
          <h2>{{ product.title }}</h2>
        </router-link>
        <button @click="addToCart(product)">Add to Cart</button>
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
