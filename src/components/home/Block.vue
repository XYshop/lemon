<script setup>
defineProps({
  blockInfo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="block">
    <img src="" alt="" />
    <h2>{{ blockInfo.title }}</h2>
    <div class="bottom-bar">
      <i class="fa-solid fa-circle-up"></i>
      <router-link :to="blockInfo.link">link</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.block {
  width: 16em;
  padding: 1em;
  margin: 1em;
  border-radius: 0.5em;
  border: 1px solid #999;
  box-shadow: 0.3em 0.3em rgb(#000, 0.1);
  h2 {
    font-size: 14px;
    text-align: left;
  }
  .bottom-bar {
    display: flex;
    align-items: center;
    :first-child {
      margin-left: auto;
      padding: 0.5em;
    }
  }
}
</style>
