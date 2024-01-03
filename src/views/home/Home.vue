<script setup>
import { onMounted } from "vue";
import { useHomeStore } from "../../store/home";
import Block from "../../components/home/Block.vue";

const store = useHomeStore();

onMounted(() => {
  store.getDemoList();
});
</script>

<template>
  <div class="home">
    <h1>demo</h1>
    <div class="block-container">
      <Block v-for="item in store.demoList" :block-info="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 0 3em;
  text-align: center;
  margin: 100px auto 0;
  .block-container {
    display: flex;
  }
}
</style>
