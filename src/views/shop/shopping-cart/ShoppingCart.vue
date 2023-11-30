<script setup>

</script>

<template>
  <div class="product-layout">
    <div class="product-head">
      <RouterLink :to="'shop/product/' + product.id">
        <h2>{{ product.title }}</h2>
      </RouterLink>
      <button>Add to Cart</button>
    </div>
    <p>{{ product.description }}</p>
    <span>{{ product.price }}</span>
  </div>
</template>

<style scoped>
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

a {
  color: inherit;
}

</style>
