<script setup>
import { onMounted } from "vue";
import { useShoppingStore } from "../../../store/index.js";

const store = useShoppingStore();

async function addToCart(product) {
  const res = await store.addToCart(product);
  if (res.code === 0) {
    await store.getCheckOutProducts();
  }
}

async function removeFormCart(id) {
  const res = await store.removeFormCart(id);
  if (res.code === 0) {
    await store.getCheckOutProducts();
  }
}

async function emptyCart() {
  const res = await store.clearCart();
  if (res.code === 0) {
    await store.getCheckOutProducts();
  }
}

onMounted(() => {
  store.getCheckOutProducts();
});
</script>

<template>
  <div class="cart">
    <template
      v-for="checkOutProduct in store.checkOutProducts"
      :key="checkOutProduct.id"
    >
      <div class="product">
        <div>
          <span>{{ checkOutProduct.title }}</span>
          <span class="icons">
            <i
              class="fa-solid fa-circle-up"
              @click="addToCart(checkOutProduct)"
            ></i>
            <i
              class="fa-solid fa-circle-down"
              @click="removeFormCart(checkOutProduct.id)"
            >
            </i>
          </span>
        </div>
        <div>
          <span class="price">{{ checkOutProduct.price }}</span>
          <span>
            Quantity:
            <span>{{ checkOutProduct.quantity }}</span>
          </span>
        </div>
      </div>
    </template>
    <div class="clear-cart" @click="emptyCart">
      <span>remove all product</span>
      <i class="fa-solid fa-trash-can-list"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  margin: 3% 0;
  div {
    display: flex;
    justify-content: space-between;
  }
}

.price {
  font-weight: bolder;
}

i {
  border: 2px solid transparent;
  cursor: pointer;
}

button {
  border: none;
  outline: none;
  background: transparent;
}

.clear-cart {
  font-size: small;
  cursor: pointer;
  width: 140px;
  i {
    margin-left: 0.5em;
  }
}
</style>
