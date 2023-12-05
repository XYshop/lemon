<script setup>
import { useRouter } from 'vue-router'
import { useLoginStore } from '../../store'

const router = useRouter()
const store = useLoginStore()

async function login() {
  await store.getToken()
  if (window.localStorage.getItem('token')) await router.push('/')
}

</script>

<template>
  <div class="login">
    <div class="panel">
      <h2 class="title">Fullstack Clothing</h2>
      <button @click="login">login</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;

  .panel {
    min-width: 300px;
    margin: 0 auto;
  }
}
</style>
