<script setup>
import { onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useShoppingStore } from "../../store/index.js";

const store = useShoppingStore();
const route = useRoute();

/**
 * @name onBeforeRouteUpdate
 * @description 带参数路由因为组件复用不会跳转路由，onBeforeRouteUpdate可以解决这种情况
 */

onBeforeRouteUpdate((to) => {
  console.log("beforeRouteUpdate, I am here!");
  if (Number(to.params.id) > 4) {
    return { name: "notFound" };
  }
  store.getProductDetails(route.params.id);
});

onMounted(() => {
  store.getProductDetails(route.params.id);
});
</script>

<template>
  <div class="details">
    <div>
      <h2>{{ store.details.title }}</h2>
      <span class="product-type">{{ store.details.product_type }}</span>
      <p class="description">{{ store.details.description }}</p>
      <div class="founded">
        Founded
        <time>{{ store.details.created_at }}</time>
      </div>
      <button>Add to Cart</button>
    </div>
    <img :src="store.details.image_tag" alt="" />
  </div>
</template>

<style scoped>
.details {
  width: 480px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
}

.product-type {
  background-color: grey;
  padding: 2px 6px;
  font-size: small;
  border-radius: 3px;
}

.description {
  line-height: 1.5;
  margin-top: 1em;
}

.founded {
  font-size: 12px;
  margin-top: 10px;
  time {
    font-weight: bolder;
  }
}

img {
  width: 240px;
  object-fit: contain;
}
</style>
